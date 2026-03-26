import { useEffect, useRef, useState } from "react";

/**
 * FluidParticles — WebGL GPU fluid simulation with mouse interaction.
 *
 * Based on Jos Stam's "Stable Fluids" / Navier-Stokes solver on the GPU.
 * Uses framebuffer ping-pong for velocity, pressure, and dye advection.
 * Mouse/touch input injects velocity and dye into the simulation.
 *
 * Place inside a positioned container — the canvas fills its parent.
 * SSR-safe: renders nothing on the server.
 */

interface FluidParticlesProps {
	dyeResolution?: number;
	simResolution?: number;
	densityDissipation?: number;
	velocityDissipation?: number;
	pressureIterations?: number;
	splatRadius?: number;
	splatForce?: number;
	curl?: number;
	colorful?: boolean;
	baseColor?: [number, number, number];
	transparent?: boolean;
}

export default function FluidParticles({
	dyeResolution = 1024,
	simResolution = 256,
	densityDissipation = 1.0,
	velocityDissipation = 0.2,
	pressureIterations = 20,
	splatRadius = 0.25,
	splatForce = 6000,
	curl = 30,
	colorful = true,
	baseColor = [0.0, 0.0, 0.0],
	transparent = true,
}: FluidParticlesProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => { setIsClient(true); }, []);

	useEffect(() => {
		if (!isClient) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		const parent = canvas.parentElement;
		if (!parent) return;

		// Resize canvas
		function resize() {
			canvas!.width = parent!.clientWidth;
			canvas!.height = parent!.clientHeight;
		}
		resize();
		console.log("FluidParticles canvas size:", canvas.width, canvas.height);

		const gl = canvas.getContext("webgl2", { alpha: transparent, premultipliedAlpha: false });
		if (!gl) { console.warn("FluidParticles: WebGL2 not available"); return; }

		// Extensions
		const extColorFloat = gl.getExtension("EXT_color_buffer_float");
		if (!extColorFloat) { console.warn("FluidParticles: EXT_color_buffer_float not available"); }
		const halfFloatTexType = gl.FLOAT;

		// Check float render support
		function supportRenderTextureFormat(gl: WebGL2RenderingContext, internalFormat: number, format: number, type: number) {
			const tex = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, tex);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
			const fbo = gl.createFramebuffer();
			gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
			gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
			const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
			gl.deleteTexture(tex);
			gl.deleteFramebuffer(fbo);
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
			return status === gl.FRAMEBUFFER_COMPLETE;
		}

		const useFloat = supportRenderTextureFormat(gl, gl.RGBA32F, gl.RGBA, gl.FLOAT);
		const useHalfFloat = !useFloat && supportRenderTextureFormat(gl, gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT);
		const texType = useFloat ? gl.FLOAT : gl.HALF_FLOAT;
		const internalFormat = useFloat ? gl.RGBA32F : gl.RGBA16F;
		const internalFormatRG = useFloat ? gl.RG32F : gl.RG16F;

		// Compile shader
		function compileShader(type: number, source: string) {
			const shader = gl!.createShader(type)!;
			gl!.shaderSource(shader, source);
			gl!.compileShader(shader);
			if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
				console.error(gl!.getShaderInfoLog(shader));
			}
			return shader;
		}

		function createProgram(vertSrc: string, fragSrc: string) {
			const program = gl!.createProgram()!;
			gl!.attachShader(program, compileShader(gl!.VERTEX_SHADER, vertSrc));
			gl!.attachShader(program, compileShader(gl!.FRAGMENT_SHADER, fragSrc));
			gl!.linkProgram(program);
			if (!gl!.getProgramParameter(program, gl!.LINK_STATUS)) {
				console.error(gl!.getProgramInfoLog(program));
			}
			return program;
		}

		// Full-screen quad
		const quadVerts = new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]);
		const quadBuf = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, quadBuf);
		gl.bufferData(gl.ARRAY_BUFFER, quadVerts, gl.STATIC_DRAW);

		function blit(target: WebGLFramebuffer | null) {
			gl!.bindFramebuffer(gl!.FRAMEBUFFER, target);
			gl!.drawArrays(gl!.TRIANGLE_FAN, 0, 4);
		}

		// Vertex shader (shared)
		const baseVert = `#version 300 es
			in vec2 aPosition;
			out vec2 vUv;
			void main() {
				vUv = aPosition * 0.5 + 0.5;
				gl_Position = vec4(aPosition, 0.0, 1.0);
			}
		`;

		// Fragment shaders
		const splatFrag = `#version 300 es
			precision highp float;
			in vec2 vUv;
			uniform sampler2D uTarget;
			uniform vec3 color;
			uniform vec2 point;
			uniform float radius;
			uniform float aspectRatio;
			out vec4 fragColor;
			void main() {
				vec2 p = vUv - point;
				p.x *= aspectRatio;
				vec3 splat = exp(-dot(p, p) / radius) * color;
				vec3 base = texture(uTarget, vUv).xyz;
				fragColor = vec4(base + splat, 1.0);
			}
		`;

		const advectionFrag = `#version 300 es
			precision highp float;
			in vec2 vUv;
			uniform sampler2D uVelocity;
			uniform sampler2D uSource;
			uniform vec2 texelSize;
			uniform float dt;
			uniform float dissipation;
			out vec4 fragColor;
			void main() {
				vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * texelSize;
				fragColor = dissipation * texture(uSource, coord);
			}
		`;

		const divergenceFrag = `#version 300 es
			precision highp float;
			in vec2 vUv;
			uniform sampler2D uVelocity;
			uniform vec2 texelSize;
			out vec4 fragColor;
			void main() {
				float L = texture(uVelocity, vUv - vec2(texelSize.x, 0.0)).x;
				float R = texture(uVelocity, vUv + vec2(texelSize.x, 0.0)).x;
				float T = texture(uVelocity, vUv + vec2(0.0, texelSize.y)).y;
				float B = texture(uVelocity, vUv - vec2(0.0, texelSize.y)).y;
				float div = 0.5 * (R - L + T - B);
				fragColor = vec4(div, 0.0, 0.0, 1.0);
			}
		`;

		const pressureFrag = `#version 300 es
			precision highp float;
			in vec2 vUv;
			uniform sampler2D uPressure;
			uniform sampler2D uDivergence;
			uniform vec2 texelSize;
			out vec4 fragColor;
			void main() {
				float L = texture(uPressure, vUv - vec2(texelSize.x, 0.0)).x;
				float R = texture(uPressure, vUv + vec2(texelSize.x, 0.0)).x;
				float T = texture(uPressure, vUv + vec2(0.0, texelSize.y)).y;
				float B = texture(uPressure, vUv - vec2(0.0, texelSize.y)).y;
				float div = texture(uDivergence, vUv).x;
				fragColor = vec4((L + R + T + B - div) * 0.25, 0.0, 0.0, 1.0);
			}
		`;

		const gradientSubtractFrag = `#version 300 es
			precision highp float;
			in vec2 vUv;
			uniform sampler2D uPressure;
			uniform sampler2D uVelocity;
			uniform vec2 texelSize;
			out vec4 fragColor;
			void main() {
				float L = texture(uPressure, vUv - vec2(texelSize.x, 0.0)).x;
				float R = texture(uPressure, vUv + vec2(texelSize.x, 0.0)).x;
				float T = texture(uPressure, vUv + vec2(0.0, texelSize.y)).y;
				float B = texture(uPressure, vUv - vec2(0.0, texelSize.y)).y;
				vec2 velocity = texture(uVelocity, vUv).xy;
				velocity -= vec2(R - L, T - B);
				fragColor = vec4(velocity, 0.0, 1.0);
			}
		`;

		const curlFrag = `#version 300 es
			precision highp float;
			in vec2 vUv;
			uniform sampler2D uVelocity;
			uniform vec2 texelSize;
			out vec4 fragColor;
			void main() {
				float L = texture(uVelocity, vUv - vec2(texelSize.x, 0.0)).y;
				float R = texture(uVelocity, vUv + vec2(texelSize.x, 0.0)).y;
				float T = texture(uVelocity, vUv + vec2(0.0, texelSize.y)).x;
				float B = texture(uVelocity, vUv - vec2(0.0, texelSize.y)).x;
				float vorticity = R - L - T + B;
				fragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
			}
		`;

		const vorticityFrag = `#version 300 es
			precision highp float;
			in vec2 vUv;
			uniform sampler2D uVelocity;
			uniform sampler2D uCurl;
			uniform vec2 texelSize;
			uniform float curl;
			uniform float dt;
			out vec4 fragColor;
			void main() {
				float L = texture(uCurl, vUv - vec2(texelSize.x, 0.0)).x;
				float R = texture(uCurl, vUv + vec2(texelSize.x, 0.0)).x;
				float T = texture(uCurl, vUv + vec2(0.0, texelSize.y)).x;
				float B = texture(uCurl, vUv - vec2(0.0, texelSize.y)).x;
				float C = texture(uCurl, vUv).x;
				vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
				force /= length(force) + 0.0001;
				force *= curl * C;
				force.y *= -1.0;
				vec2 velocity = texture(uVelocity, vUv).xy + force * dt;
				fragColor = vec4(velocity, 0.0, 1.0);
			}
		`;

		const displayFrag = transparent
			? `#version 300 es
				precision highp float;
				in vec2 vUv;
				uniform sampler2D uTexture;
				out vec4 fragColor;
				void main() {
					vec3 c = texture(uTexture, vUv).rgb;
					float a = max(c.r, max(c.g, c.b));
					fragColor = vec4(c, a);
				}
			`
			: `#version 300 es
				precision highp float;
				in vec2 vUv;
				uniform sampler2D uTexture;
				uniform vec3 bgColor;
				out vec4 fragColor;
				void main() {
					vec3 c = texture(uTexture, vUv).rgb;
					fragColor = vec4(c + bgColor, 1.0);
				}
			`;

		const clearFrag = `#version 300 es
			precision highp float;
			in vec2 vUv;
			uniform sampler2D uTexture;
			uniform float value;
			out vec4 fragColor;
			void main() {
				fragColor = value * texture(uTexture, vUv);
			}
		`;

		// Create programs
		const splatProg = createProgram(baseVert, splatFrag);
		const advectionProg = createProgram(baseVert, advectionFrag);
		const divergenceProg = createProgram(baseVert, divergenceFrag);
		const pressureProg = createProgram(baseVert, pressureFrag);
		const gradientSubtractProg = createProgram(baseVert, gradientSubtractFrag);
		const curlProg = createProgram(baseVert, curlFrag);
		const vorticityProg = createProgram(baseVert, vorticityFrag);
		const displayProg = createProgram(baseVert, displayFrag);
		const clearProg = createProgram(baseVert, clearFrag);

		// Helper to use a program and set vertex attrib
		function useProgram(prog: WebGLProgram) {
			gl!.useProgram(prog);
			const loc = gl!.getAttribLocation(prog, "aPosition");
			gl!.enableVertexAttribArray(loc);
			gl!.vertexAttribPointer(loc, 2, gl!.FLOAT, false, 0, 0);
		}

		// Create double framebuffer
		function createDoubleFBO(w: number, h: number, intFmt: number, fmt: number, type: number, filter: number) {
			let fbo1 = createFBO(w, h, intFmt, fmt, type, filter);
			let fbo2 = createFBO(w, h, intFmt, fmt, type, filter);
			return {
				width: w, height: h,
				get read() { return fbo1; },
				get write() { return fbo2; },
				swap() { const t = fbo1; fbo1 = fbo2; fbo2 = t; },
			};
		}

		function createFBO(w: number, h: number, intFmt: number, fmt: number, type: number, filter: number) {
			const texture = gl!.createTexture()!;
			gl!.activeTexture(gl!.TEXTURE0);
			gl!.bindTexture(gl!.TEXTURE_2D, texture);
			gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, filter);
			gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, filter);
			gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
			gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);
			gl!.texImage2D(gl!.TEXTURE_2D, 0, intFmt, w, h, 0, fmt, type, null);
			const fbo = gl!.createFramebuffer()!;
			gl!.bindFramebuffer(gl!.FRAMEBUFFER, fbo);
			gl!.framebufferTexture2D(gl!.FRAMEBUFFER, gl!.COLOR_ATTACHMENT0, gl!.TEXTURE_2D, texture, 0);
			gl!.viewport(0, 0, w, h);
			gl!.clear(gl!.COLOR_BUFFER_BIT);
			return { fbo, texture, width: w, height: h };
		}

		// Resolution helpers
		function getResolution(resolution: number) {
			let aspectRatio = gl!.canvas.width / gl!.canvas.height;
			if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
			const min = Math.round(resolution);
			const max = Math.round(resolution * aspectRatio);
			return gl!.canvas.width > gl!.canvas.height ? { width: max, height: min } : { width: min, height: max };
		}

		// Init FBOs
		const simSize = getResolution(simResolution);
		const dyeSize = getResolution(dyeResolution);

		let velocity = createDoubleFBO(simSize.width, simSize.height, internalFormatRG, gl.RG, texType, gl.LINEAR);
		let dye = createDoubleFBO(dyeSize.width, dyeSize.height, internalFormat, gl.RGBA, texType, gl.LINEAR);
		let divergenceField = createFBO(simSize.width, simSize.height, internalFormatRG, gl.RG, texType, gl.NEAREST);
		let curlField = createFBO(simSize.width, simSize.height, internalFormatRG, gl.RG, texType, gl.NEAREST);
		let pressure = createDoubleFBO(simSize.width, simSize.height, internalFormatRG, gl.RG, texType, gl.NEAREST);

		// Mouse state
		let pointer = { x: 0, y: 0, dx: 0, dy: 0, down: false, moved: false, color: [0, 0, 0] as number[] };

		function hsvToRgb(h: number, s: number, v: number) {
			const i = Math.floor(h * 6);
			const f = h * 6 - i;
			const p = v * (1 - s);
			const q = v * (1 - f * s);
			const t = v * (1 - (1 - f) * s);
			switch (i % 6) {
				case 0: return [v, t, p];
				case 1: return [q, v, p];
				case 2: return [p, v, t];
				case 3: return [p, q, v];
				case 4: return [t, p, v];
				case 5: return [v, p, q];
			}
			return [v, t, p];
		}

		function generateColor() {
			if (!colorful) return [baseColor[0] * 0.15, baseColor[1] * 0.15, baseColor[2] * 0.15];
			const c = hsvToRgb(Math.random(), 1.0, 1.0);
			return [c[0] * 0.15, c[1] * 0.15, c[2] * 0.15];
		}

		function splat(x: number, y: number, dx: number, dy: number, color: number[]) {
			const aspectRatio = canvas!.width / canvas!.height;

			useProgram(splatProg);
			gl!.uniform2f(gl!.getUniformLocation(splatProg, "point"), x, y);
			gl!.uniform3f(gl!.getUniformLocation(splatProg, "color"), dx * splatForce, dy * splatForce, 0.0);
			gl!.uniform1f(gl!.getUniformLocation(splatProg, "radius"), correctRadius(splatRadius / 100.0));
			gl!.uniform1f(gl!.getUniformLocation(splatProg, "aspectRatio"), aspectRatio);
			gl!.uniform1i(gl!.getUniformLocation(splatProg, "uTarget"), 0);
			gl!.activeTexture(gl!.TEXTURE0);
			gl!.bindTexture(gl!.TEXTURE_2D, velocity.read.texture);
			gl!.viewport(0, 0, velocity.width, velocity.height);
			blit(velocity.write.fbo);
			velocity.swap();

			gl!.uniform3f(gl!.getUniformLocation(splatProg, "color"), color[0], color[1], color[2]);
			gl!.activeTexture(gl!.TEXTURE0);
			gl!.bindTexture(gl!.TEXTURE_2D, dye.read.texture);
			gl!.viewport(0, 0, dye.width, dye.height);
			blit(dye.write.fbo);
			dye.swap();
		}

		function correctRadius(radius: number) {
			const aspectRatio = canvas!.width / canvas!.height;
			if (aspectRatio > 1) return radius * aspectRatio;
			return radius;
		}

		// Event handlers
		function onMouseMove(e: MouseEvent) {
			const rect = canvas!.getBoundingClientRect();
			const x = (e.clientX - rect.left) / rect.width;
			const y = 1.0 - (e.clientY - rect.top) / rect.height;
			pointer.dx = (x - pointer.x) * 10.0;
			pointer.dy = (y - pointer.y) * 10.0;
			pointer.x = x;
			pointer.y = y;
			pointer.moved = true;
			pointer.color = generateColor();
		}

		function onTouchMove(e: TouchEvent) {
			e.preventDefault();
			const touch = e.touches[0];
			const rect = canvas!.getBoundingClientRect();
			const x = (touch.clientX - rect.left) / rect.width;
			const y = 1.0 - (touch.clientY - rect.top) / rect.height;
			pointer.dx = (x - pointer.x) * 10.0;
			pointer.dy = (y - pointer.y) * 10.0;
			pointer.x = x;
			pointer.y = y;
			pointer.moved = true;
			pointer.color = generateColor();
		}

		canvas.addEventListener("mousemove", onMouseMove);
		canvas.addEventListener("touchmove", onTouchMove, { passive: false });

		// Simulation step
		let lastTime = Date.now();
		let animationId: number;

		function step() {
			animationId = requestAnimationFrame(step);

			const now = Date.now();
			let dt = Math.min((now - lastTime) / 1000, 0.016666);
			lastTime = now;

			gl!.disable(gl!.BLEND);

			// Curl
			useProgram(curlProg);
			gl!.uniform2f(gl!.getUniformLocation(curlProg, "texelSize"), 1.0 / velocity.read.width, 1.0 / velocity.read.height);
			gl!.uniform1i(gl!.getUniformLocation(curlProg, "uVelocity"), 0);
			gl!.activeTexture(gl!.TEXTURE0);
			gl!.bindTexture(gl!.TEXTURE_2D, velocity.read.texture);
			gl!.viewport(0, 0, curlField.width, curlField.height);
			blit(curlField.fbo);

			// Vorticity
			useProgram(vorticityProg);
			gl!.uniform2f(gl!.getUniformLocation(vorticityProg, "texelSize"), 1.0 / velocity.read.width, 1.0 / velocity.read.height);
			gl!.uniform1i(gl!.getUniformLocation(vorticityProg, "uVelocity"), 0);
			gl!.uniform1i(gl!.getUniformLocation(vorticityProg, "uCurl"), 1);
			gl!.uniform1f(gl!.getUniformLocation(vorticityProg, "curl"), curl);
			gl!.uniform1f(gl!.getUniformLocation(vorticityProg, "dt"), dt);
			gl!.activeTexture(gl!.TEXTURE0);
			gl!.bindTexture(gl!.TEXTURE_2D, velocity.read.texture);
			gl!.activeTexture(gl!.TEXTURE1);
			gl!.bindTexture(gl!.TEXTURE_2D, curlField.texture);
			gl!.viewport(0, 0, velocity.width, velocity.height);
			blit(velocity.write.fbo);
			velocity.swap();

			// Divergence
			useProgram(divergenceProg);
			gl!.uniform2f(gl!.getUniformLocation(divergenceProg, "texelSize"), 1.0 / velocity.read.width, 1.0 / velocity.read.height);
			gl!.uniform1i(gl!.getUniformLocation(divergenceProg, "uVelocity"), 0);
			gl!.activeTexture(gl!.TEXTURE0);
			gl!.bindTexture(gl!.TEXTURE_2D, velocity.read.texture);
			gl!.viewport(0, 0, divergenceField.width, divergenceField.height);
			blit(divergenceField.fbo);

			// Clear pressure
			useProgram(clearProg);
			gl!.uniform1i(gl!.getUniformLocation(clearProg, "uTexture"), 0);
			gl!.uniform1f(gl!.getUniformLocation(clearProg, "value"), 0.8);
			gl!.activeTexture(gl!.TEXTURE0);
			gl!.bindTexture(gl!.TEXTURE_2D, pressure.read.texture);
			gl!.viewport(0, 0, pressure.width, pressure.height);
			blit(pressure.write.fbo);
			pressure.swap();

			// Pressure solve (Jacobi iterations)
			useProgram(pressureProg);
			gl!.uniform2f(gl!.getUniformLocation(pressureProg, "texelSize"), 1.0 / velocity.read.width, 1.0 / velocity.read.height);
			gl!.uniform1i(gl!.getUniformLocation(pressureProg, "uDivergence"), 1);
			gl!.activeTexture(gl!.TEXTURE1);
			gl!.bindTexture(gl!.TEXTURE_2D, divergenceField.texture);
			for (let i = 0; i < pressureIterations; i++) {
				gl!.uniform1i(gl!.getUniformLocation(pressureProg, "uPressure"), 0);
				gl!.activeTexture(gl!.TEXTURE0);
				gl!.bindTexture(gl!.TEXTURE_2D, pressure.read.texture);
				gl!.viewport(0, 0, pressure.width, pressure.height);
				blit(pressure.write.fbo);
				pressure.swap();
			}

			// Gradient subtract
			useProgram(gradientSubtractProg);
			gl!.uniform2f(gl!.getUniformLocation(gradientSubtractProg, "texelSize"), 1.0 / velocity.read.width, 1.0 / velocity.read.height);
			gl!.uniform1i(gl!.getUniformLocation(gradientSubtractProg, "uPressure"), 0);
			gl!.uniform1i(gl!.getUniformLocation(gradientSubtractProg, "uVelocity"), 1);
			gl!.activeTexture(gl!.TEXTURE0);
			gl!.bindTexture(gl!.TEXTURE_2D, pressure.read.texture);
			gl!.activeTexture(gl!.TEXTURE1);
			gl!.bindTexture(gl!.TEXTURE_2D, velocity.read.texture);
			gl!.viewport(0, 0, velocity.width, velocity.height);
			blit(velocity.write.fbo);
			velocity.swap();

			// Advect velocity
			useProgram(advectionProg);
			gl!.uniform2f(gl!.getUniformLocation(advectionProg, "texelSize"), 1.0 / velocity.read.width, 1.0 / velocity.read.height);
			gl!.uniform1i(gl!.getUniformLocation(advectionProg, "uVelocity"), 0);
			gl!.uniform1i(gl!.getUniformLocation(advectionProg, "uSource"), 0);
			gl!.uniform1f(gl!.getUniformLocation(advectionProg, "dt"), dt);
			gl!.uniform1f(gl!.getUniformLocation(advectionProg, "dissipation"), 1.0 / (1.0 + velocityDissipation * dt));
			gl!.activeTexture(gl!.TEXTURE0);
			gl!.bindTexture(gl!.TEXTURE_2D, velocity.read.texture);
			gl!.viewport(0, 0, velocity.width, velocity.height);
			blit(velocity.write.fbo);
			velocity.swap();

			// Advect dye
			gl!.uniform2f(gl!.getUniformLocation(advectionProg, "texelSize"), 1.0 / dye.read.width, 1.0 / dye.read.height);
			gl!.uniform1i(gl!.getUniformLocation(advectionProg, "uVelocity"), 0);
			gl!.uniform1i(gl!.getUniformLocation(advectionProg, "uSource"), 1);
			gl!.uniform1f(gl!.getUniformLocation(advectionProg, "dissipation"), 1.0 / (1.0 + densityDissipation * dt));
			gl!.activeTexture(gl!.TEXTURE0);
			gl!.bindTexture(gl!.TEXTURE_2D, velocity.read.texture);
			gl!.activeTexture(gl!.TEXTURE1);
			gl!.bindTexture(gl!.TEXTURE_2D, dye.read.texture);
			gl!.viewport(0, 0, dye.width, dye.height);
			blit(dye.write.fbo);
			dye.swap();

			// Splat on mouse move
			if (pointer.moved) {
				pointer.moved = false;
				splat(pointer.x, pointer.y, pointer.dx, pointer.dy, pointer.color);
			}

			// Display
			gl!.viewport(0, 0, gl!.canvas.width, gl!.canvas.height);
			useProgram(displayProg);
			gl!.uniform1i(gl!.getUniformLocation(displayProg, "uTexture"), 0);
			if (!transparent) {
				gl!.uniform3f(gl!.getUniformLocation(displayProg, "bgColor"), baseColor[0], baseColor[1], baseColor[2]);
			}
			gl!.activeTexture(gl!.TEXTURE0);
			gl!.bindTexture(gl!.TEXTURE_2D, dye.read.texture);
			blit(null);
		}

		// Initial splats so it's not blank on load
		for (let i = 0; i < 5; i++) {
			const x = Math.random();
			const y = Math.random();
			const dx = (Math.random() - 0.5) * 2;
			const dy = (Math.random() - 0.5) * 2;
			splat(x, y, dx, dy, generateColor());
		}

		step();

		function onResize() {
			resize();
		}
		window.addEventListener("resize", onResize);

		return () => {
			cancelAnimationFrame(animationId);
			canvas!.removeEventListener("mousemove", onMouseMove);
			canvas!.removeEventListener("touchmove", onTouchMove);
			window.removeEventListener("resize", onResize);
		};
	}, [isClient, dyeResolution, simResolution, densityDissipation, velocityDissipation, pressureIterations, splatRadius, splatForce, curl, colorful, baseColor, transparent]);

	if (!isClient) return null;

	return (
		<div className="absolute inset-0" style={{ zIndex: 0 }}>
			<canvas ref={canvasRef} className="block w-full h-full" />
		</div>
	);
}
