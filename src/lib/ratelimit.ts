import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiter (replace with Redis in production)
interface RateLimitEntry {
  count: number;
  resetAt: number;
  dailyCount: number;
  dailyResetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Plan limits
const PLAN_LIMITS: Record<string, { perMinute: number; perDay: number; concurrent: number }> = {
  FREE: { perMinute: 6, perDay: 100, concurrent: 1 },
  PRO: { perMinute: 30, perDay: 500, concurrent: 2 },
  PREMIUM: { perMinute: 60, perDay: 2000, concurrent: 4 },
  SULTAN: { perMinute: 90, perDay: 999999, concurrent: 10 },
  DAILY: { perMinute: 60, perDay: 999999, concurrent: 4 },
  DAILY_KENYANG: { perMinute: 90, perDay: 999999, concurrent: 6 },
  DAILY_SULTAN: { perMinute: 90, perDay: 999999, concurrent: 10 },
};

export function getRateLimit(userId: string, plan: string = "FREE") {
  const limits = PLAN_LIMITS[plan] || PLAN_LIMITS.FREE;
  const now = Date.now();
  const minuteWindow = 60 * 1000;

  let entry = rateLimitStore.get(userId);

  if (!entry) {
    entry = {
      count: 0,
      resetAt: now + minuteWindow,
      dailyCount: 0,
      dailyResetAt: getNextMidnightMYT(),
    };
    rateLimitStore.set(userId, entry);
  }

  // Reset minute window
  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + minuteWindow;
  }

  // Reset daily window
  if (now > entry.dailyResetAt) {
    entry.dailyCount = 0;
    entry.dailyResetAt = getNextMidnightMYT();
  }

  // Check limits
  if (entry.count >= limits.perMinute) {
    return {
      allowed: false,
      error: "Had request seminit dicapai. Cuba lagi sebentar.",
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
      remaining: 0,
    };
  }

  if (entry.dailyCount >= limits.perDay) {
    return {
      allowed: false,
      error: "Had request harian dicapai. Naik taraf plan atau tunggu esok.",
      retryAfter: Math.ceil((entry.dailyResetAt - now) / 1000),
      remaining: 0,
    };
  }

  // Increment
  entry.count++;
  entry.dailyCount++;

  return {
    allowed: true,
    remaining: limits.perDay - entry.dailyCount,
    dailyLimit: limits.perDay,
    minuteLimit: limits.perMinute,
  };
}

function getNextMidnightMYT(): number {
  const now = new Date();
  const myt = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kuala_Lumpur" }));
  myt.setHours(24, 0, 0, 0);
  return myt.getTime();
}

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.dailyResetAt + 86400000) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);
