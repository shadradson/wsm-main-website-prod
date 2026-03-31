/** IP-based rate limiting backed by D1 */
export async function checkRateLimit(
	db: D1Database,
	ip: string,
	endpoint: string,
	maxRequests: number,
	windowSeconds: number,
): Promise<{ allowed: boolean; remaining: number }> {
	const now = Date.now();
	const windowStart = now - windowSeconds * 1000;

	const row = await db
		.prepare("SELECT COUNT(*) AS cnt FROM rate_limits WHERE ip = ? AND endpoint = ? AND timestamp > ?")
		.bind(ip, endpoint, windowStart)
		.first<{ cnt: number }>();

	const count = row?.cnt ?? 0;

	if (count >= maxRequests) {
		return { allowed: false, remaining: 0 };
	}

	await db
		.prepare("INSERT INTO rate_limits (ip, endpoint, timestamp) VALUES (?, ?, ?)")
		.bind(ip, endpoint, now)
		.run();

	return { allowed: true, remaining: maxRequests - count - 1 };
}

/** Delete expired rows — call from cron */
export async function cleanupRateLimits(db: D1Database, maxAgeSeconds = 1200): Promise<number> {
	const cutoff = Date.now() - maxAgeSeconds * 1000;
	const result = await db
		.prepare("DELETE FROM rate_limits WHERE timestamp < ?")
		.bind(cutoff)
		.run();
	return result.meta?.changes ?? 0;
}
