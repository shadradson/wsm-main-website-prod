import { useEffect, useRef, useState } from "react";

/**
 * BirdsFlock — Three.js WebGPU compute-based boids flocking simulation.
 *
 * Renders a flock of birds using GPU compute shaders for the boids algorithm
 * (separation, alignment, cohesion). Birds scatter from the cursor.
 *
 * Transparent background — place over any content. SSR-safe.
 * Falls back gracefully if WebGPU is not available (renders nothing).
 */

interface BirdsFlockProps {
	birdCount?: number;
	bounds?: number;
	speedLimit?: number;
	separationDistance?: number;
	alignmentDistance?: number;
	cohesionDistance?: number;
	birdColor?: string;
	birdScale?: number;
	birdWiggleRandomMultiplier?: number;
}

export default function BirdsFlock({
	birdCount = 1048,
	bounds = 800,
	speedLimit = 28,
	separationDistance = 15,
	alignmentDistance = 20,
	cohesionDistance = 20,
	birdColor = "#B1E2F5",
	birdScale = 0.06,
	birdWiggleRandomMultiplier = 10, 
}: BirdsFlockProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		if (!isClient) return;

		const container = containerRef.current;
		if (!container) return;
		const parent = container.parentElement;
		if (!parent) return;

		let disposed = false;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		let renderer: any = null;
		let animFrameId: number | null = null;
		const cleanupFns: (() => void)[] = [];

		(async () => {
			// Dynamic imports to avoid SSR breakage
			const THREE = await import("three/webgpu");
			const TSL = await import("three/tsl");

			if (disposed) return;

			// Check WebGPU/WebGL2 support manually (avoid importing WebGPU.js which has top-level await)
			const hasWebGPU = typeof navigator !== "undefined" && "gpu" in navigator;
			const hasWebGL2 = (() => {
				try {
					const c = document.createElement("canvas");
					return !!c.getContext("webgl2");
				} catch { return false; }
			})();
			if (!hasWebGPU && !hasWebGL2) return;
			if (disposed) return;

			// ── Container sizing ──
			const width = parent.clientWidth;
			const height = parent.clientHeight;

			// ── Renderer ──
			renderer = new THREE.WebGPURenderer({
				antialias: true,
				alpha: true,
			});
			renderer.setSize(width, height);
			renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
			renderer.setClearColor(0x000000, 0);

			try {
				await renderer.init();
			} catch {
				renderer.dispose();
				renderer = null;
				return;
			}

			if (disposed) {
				renderer.dispose();
				renderer = null;
				return;
			}

			container.appendChild(renderer.domElement);

			// ── Scene & Camera ──
			const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera(75, width / height, 1, 3000);
			camera.position.z = 350;

			// ── Pointer / Raycaster ──
			const pointer = new THREE.Vector2(0, 10); // start offscreen
			const raycaster = new THREE.Raycaster();

			const onPointerMove = (e: MouseEvent) => {
				const rect = container.getBoundingClientRect();
				const mx = e.clientX - rect.left;
				const my = e.clientY - rect.top;
				if (mx >= 0 && mx <= width && my >= 0 && my <= height) {
					pointer.x = (mx / width) * 2.0 - 1.0;
					pointer.y = 1.0 - (my / height) * 2.0;
				} else {
					pointer.y = 10; // offscreen = no influence
				}
			};
			window.addEventListener("mousemove", onPointerMove);
			cleanupFns.push(() => window.removeEventListener("mousemove", onPointerMove));

			// ── Constants ──
			const BIRDS = birdCount;
			const BOUNDS_HALF = bounds / 2;

			// ── Initialize storage arrays ──
			const positionArray = new Float32Array(BIRDS * 3);
			const velocityArray = new Float32Array(BIRDS * 3);
			const phaseArray = new Float32Array(BIRDS);

			for (let i = 0; i < BIRDS; i++) {
				positionArray[i * 3 + 0] = Math.random() * bounds - BOUNDS_HALF;
				positionArray[i * 3 + 1] = Math.random() * bounds - BOUNDS_HALF;
				positionArray[i * 3 + 2] = Math.random() * bounds - BOUNDS_HALF;

				velocityArray[i * 3 + 0] = (Math.random() - 0.5) * birdWiggleRandomMultiplier;
				velocityArray[i * 3 + 1] = (Math.random() - 0.5) * birdWiggleRandomMultiplier;
				velocityArray[i * 3 + 2] = (Math.random() - 0.5) * birdWiggleRandomMultiplier;

				phaseArray[i] = 1;
			}

			// ── Storage buffers ──
			const positionStorage = TSL.instancedArray(positionArray, "vec3").setName("positionStorage");
			const velocityStorage = TSL.instancedArray(velocityArray, "vec3").setName("velocityStorage");
			const phaseStorage = TSL.instancedArray(phaseArray, "float").setName("phaseStorage");
			positionStorage.setPBO(true);
			velocityStorage.setPBO(true);
			phaseStorage.setPBO(true);

			// ── Uniforms ──
			const effectController = {
				separation: TSL.uniform(separationDistance).setName("separation"),
				alignment: TSL.uniform(alignmentDistance).setName("alignment"),
				cohesion: TSL.uniform(cohesionDistance).setName("cohesion"),
				freedom: TSL.uniform(0.75).setName("freedom"),
				now: TSL.uniform(0.0),
				deltaTime: TSL.uniform(0.0).setName("deltaTime"),
				rayOrigin: TSL.uniform(new THREE.Vector3()).setName("rayOrigin"),
				rayDirection: TSL.uniform(new THREE.Vector3()).setName("rayDirection"),
			};

			// ── Bird Geometry (3 triangles: body + 2 wings) ──
			const birdGeo = new THREE.BufferGeometry();
			const vertices = new Float32Array(9 * 3); // 9 vertices, 3 floats each
			let v = 0;
			const push = (...args: number[]) => {
				for (const val of args) vertices[v++] = val;
			};
			const wingsSpan = 20;
			const bodyLength = -20;
			// Body
			push(0, 0, -20, 0, -8, 10, 0, 0, 20);
			// Left wing
			push(0, 0, -10, -wingsSpan, 0, 5, 0, 0, 10);
			// Right wing
			push(0, 0, 10, wingsSpan, 0, 5, 0, 0, -10);

			birdGeo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
			birdGeo.scale(birdScale, birdScale, birdScale);

			// ── Bird Material with TSL vertex shader ──
			// Parse bird color
			const hex = birdColor.replace("#", "");
			const cr = parseInt(hex.slice(0, 2), 16) / 255;
			const cg = parseInt(hex.slice(2, 4), 16) / 255;
			const cb = parseInt(hex.slice(4, 6), 16) / 255;

			const birdMaterial = new THREE.NodeMaterial();
			birdMaterial.colorNode = TSL.vec4(cr, cg, cb, 0.8);

			// Vertex shader: rotate bird to face velocity, flap wings, apply position
			const birdVertexTSL = TSL.Fn(() => {
				const position = TSL.positionLocal.toVar();
				const newPhase = phaseStorage.element(TSL.instanceIndex).toVar();
				const newVelocity = TSL.normalize(velocityStorage.element(TSL.instanceIndex)).toVar();

				// Flap wings (vertices 4 and 7 are wing tips)
				TSL.If(TSL.vertexIndex.equal(4).or(TSL.vertexIndex.equal(7)), () => {
					//position.y = TSL.sin(newPhase).mul(4.0);

					const flapAmount = TSL.smoothstep(TSL.float(-0.2), TSL.float(0.0), newVelocity.y);
					position.y = TSL.sin(newPhase).mul(4.0).mul(flapAmount);
				});

				const newPosition = TSL.modelWorldMatrix.mul(position);

				newVelocity.z.mulAssign(-1.0);
				const xz = TSL.length(newVelocity.xz);
				const xyz = TSL.float(1.0);
				const x = TSL.sqrt(newVelocity.y.mul(newVelocity.y).oneMinus());

				const cosry = newVelocity.x.div(xz).toVar();
				const sinry = newVelocity.z.div(xz).toVar();
				const cosrz = x.div(xyz);
				const sinrz = newVelocity.y.div(xyz).toVar();

				const maty = TSL.mat3(
					cosry, 0, TSL.negate(sinry),
					0, 1, 0,
					sinry, 0, cosry
				);
				const matz = TSL.mat3(
					cosrz, sinrz, 0,
					TSL.negate(sinrz), cosrz, 0,
					0, 0, 1
				);

				const finalVert = maty.mul(matz).mul(newPosition);
				finalVert.addAssign(positionStorage.element(TSL.instanceIndex));

				return TSL.cameraProjectionMatrix.mul(TSL.cameraViewMatrix).mul(finalVert);
			});

			birdMaterial.vertexNode = birdVertexTSL();
			birdMaterial.side = THREE.DoubleSide;
			birdMaterial.transparent = true;

			const birdMesh = new THREE.InstancedMesh(birdGeo, birdMaterial, BIRDS);
			birdMesh.rotation.y = Math.PI / 2;
			birdMesh.matrixAutoUpdate = false;
			birdMesh.frustumCulled = false;
			birdMesh.updateMatrix();
			scene.add(birdMesh);

			// ── Compute Velocity (Boids algorithm) ──
			const computeVelocity = TSL.Fn(() => {
				const PI = TSL.float(3.141592653589793);
				const PI_2 = PI.mul(2.0);
				const limit = TSL.float(speedLimit).toVar("limit");

				const { alignment, separation, cohesion, deltaTime, rayOrigin, rayDirection } = effectController;

				const zoneRadius = separation.add(alignment).add(cohesion).toConst();
				const separationThresh = separation.div(zoneRadius).toConst();
				const alignmentThresh = separation.add(alignment).div(zoneRadius).toConst();
				const zoneRadiusSq = zoneRadius.mul(zoneRadius).toConst();

				const birdIndex = TSL.instanceIndex.toConst("birdIndex");
				const position = positionStorage.element(birdIndex).toVar();
				const velocity = velocityStorage.element(birdIndex).toVar();

				// Mouse influence via raycaster
				const directionToRay = rayOrigin.sub(position).toConst();
				const projectionLength = TSL.dot(directionToRay, rayDirection).toConst();
				const closestPoint = rayOrigin.sub(rayDirection.mul(projectionLength)).toConst();
				const directionToClosestPoint = closestPoint.sub(position).toConst();
				const distanceToClosestPoint = TSL.length(directionToClosestPoint).toConst();
				const distanceToClosestPointSq = distanceToClosestPoint.mul(distanceToClosestPoint).toConst();

				const rayRadius = TSL.float(150.0).toConst();
				const rayRadiusSq = rayRadius.mul(rayRadius).toConst();

				TSL.If(distanceToClosestPointSq.lessThan(rayRadiusSq), () => {
					const velocityAdjust = distanceToClosestPointSq.div(rayRadiusSq).sub(1.0).mul(deltaTime).mul(100.0);
					velocity.addAssign(TSL.normalize(directionToClosestPoint).mul(velocityAdjust));
					limit.addAssign(5.0);
				});

				// Attract to center
				const dirToCenter = position.toVar();
				dirToCenter.y.mulAssign(2.5);
				velocity.subAssign(TSL.normalize(dirToCenter).mul(deltaTime).mul(5.0));

				// Boids loop
				TSL.Loop({ start: TSL.uint(0), end: TSL.uint(BIRDS), type: "uint", condition: "<" }, ({ i }: { i: ReturnType<typeof TSL.uint> }) => {
					TSL.If(i.equal(birdIndex), () => { TSL.Continue(); });

					const birdPosition = positionStorage.element(i);
					const dirToBird = birdPosition.sub(position);
					const distToBird = TSL.length(dirToBird);

					TSL.If(distToBird.lessThan(0.0001), () => { TSL.Continue(); });

					const distToBirdSq = distToBird.mul(distToBird);

					TSL.If(distToBirdSq.greaterThan(zoneRadiusSq), () => { TSL.Continue(); });

					const percent = distToBirdSq.div(zoneRadiusSq);

					TSL.If(percent.lessThan(separationThresh), () => {
						const velocityAdjust = separationThresh.div(percent).sub(1.0).mul(deltaTime);
						velocity.subAssign(TSL.normalize(dirToBird).mul(velocityAdjust));
					}).ElseIf(percent.lessThan(alignmentThresh), () => {
						const threshDelta = alignmentThresh.sub(separationThresh);
						const adjustedPercent = percent.sub(separationThresh).div(threshDelta);
						const birdVelocity = velocityStorage.element(i);
						const cosRange = TSL.cos(adjustedPercent.mul(PI_2));
						const cosRangeAdjust = TSL.float(0.5).sub(cosRange.mul(0.5)).add(0.5);
						const velocityAdjust = cosRangeAdjust.mul(deltaTime);
						velocity.addAssign(TSL.normalize(birdVelocity).mul(velocityAdjust));
					}).Else(() => {
						const threshDelta = alignmentThresh.oneMinus();
						const adjustedPercent = threshDelta.equal(0.0).select(1.0, percent.sub(alignmentThresh).div(threshDelta));
						const cosRange = TSL.cos(adjustedPercent.mul(PI_2));
						const adj1 = cosRange.mul(-0.5);
						const adj2 = adj1.add(0.5);
						const adj3 = TSL.float(0.5).sub(adj2);
						const velocityAdjust = adj3.mul(deltaTime);
						velocity.addAssign(TSL.normalize(dirToBird).mul(velocityAdjust));
					});
				});

				TSL.If(TSL.length(velocity).greaterThan(limit), () => {
					velocity.assign(TSL.normalize(velocity).mul(limit));
				});

				velocityStorage.element(birdIndex).assign(velocity);
			})().compute(BIRDS).setName("Birds Velocity");

			// ── Compute Position ──
			const computePosition = TSL.Fn(() => {
				const { deltaTime } = effectController;
				positionStorage.element(TSL.instanceIndex).addAssign(
					velocityStorage.element(TSL.instanceIndex).mul(deltaTime).mul(15.0)
				);

				const velocity = velocityStorage.element(TSL.instanceIndex);
				const phase = phaseStorage.element(TSL.instanceIndex);
				const modValue = phase
					.add(deltaTime)
					.add(TSL.length(velocity.xz).mul(deltaTime).mul(3.0))
					.add(TSL.max(velocity.y, 0.0).mul(deltaTime).mul(3.0));
				phaseStorage.element(TSL.instanceIndex).assign(modValue.mod(62.83));
			})().compute(BIRDS).setName("Birds Position");

			// ── Animation loop ──
			let last = performance.now();

			const animate = async () => {
				if (disposed) return;

				const now = performance.now();
				let dt = (now - last) / 1000;
				if (dt > 1) dt = 1;
				last = now;

				raycaster.setFromCamera(pointer, camera);

				effectController.now.value = now;
				effectController.deltaTime.value = dt;
				effectController.rayOrigin.value.copy(raycaster.ray.origin);
				effectController.rayDirection.value.copy(raycaster.ray.direction);

				await renderer.computeAsync(computeVelocity);
				await renderer.computeAsync(computePosition);
				renderer.render(scene, camera);

				pointer.y = 10; // reset so birds only react when mouse moves
			};

			renderer.setAnimationLoop(animate);

			// ── Resize handler ──
			const onResize = () => {
				const w = parent.clientWidth;
				const h = parent.clientHeight;
				camera.aspect = w / h;
				camera.updateProjectionMatrix();
				renderer.setSize(w, h);
			};
			window.addEventListener("resize", onResize);
			cleanupFns.push(() => window.removeEventListener("resize", onResize));
		})();

		return () => {
			disposed = true;
			for (const fn of cleanupFns) fn();
			if (renderer) {
				renderer.setAnimationLoop(null);
				renderer.dispose();
				if (container && renderer.domElement?.parentNode === container) {
					container.removeChild(renderer.domElement);
				}
				renderer = null;
			}
		};
	}, [isClient, birdCount, bounds, speedLimit, separationDistance, alignmentDistance, cohesionDistance, birdColor, birdScale]);

	if (!isClient) return null;

	return (
		<div ref={containerRef} className="absolute inset-0 z-[5] pointer-events-none" />
	);
}
