// In-memory per-IP rate limit for /i/[code]. Codes are 8 characters from a
// 31-symbol alphabet — brute-forceable without a limiter. State lives in
// process memory (a plain Map), so it resets on every redeploy/cold start;
// acceptable at ~120-guest scale, not a substitute for a real store if this
// ever needs to survive across instances.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS_PER_WINDOW = 20;

const attempts = new Map<string, { count: number; windowStart: number }>();

// Returns true if this IP is still within its allowance for the current
// window, false if it should be blocked.
export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    attempts.set(ip, { count: 1, windowStart: now });
    return true;
  }

  entry.count += 1;
  return entry.count <= MAX_ATTEMPTS_PER_WINDOW;
}
