import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Constant-time string compare (hash first so differing lengths don't leak and
// timingSafeEqual gets equal-length buffers).
function safeEqual(a: string, b: string) {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

/**
 * Locks the Keystatic admin UI (/keystatic) behind HTTP Basic Auth.
 *
 * Notes:
 *  • Next 16 renamed `middleware` → `proxy` (Node.js runtime, so `Buffer` is fine).
 *  • Only the UI shell at /keystatic is gated. The OAuth callback and the admin's
 *    own data calls live under /api/keystatic and must NOT be gated — GitHub
 *    sign-in already protects who can commit.
 *  • Local dev uses file storage and stays frictionless (no prompt).
 *  • In production it fails CLOSED: if no credentials are configured, the admin
 *    is sealed off entirely rather than left open to the world.
 */
export const config = {
  matcher: "/keystatic/:path*",
};

export function proxy(request: NextRequest) {
  // Frictionless locally (file storage, no auth flow).
  if (process.env.NODE_ENV !== "production") return NextResponse.next();

  const user = process.env.KEYSTATIC_AUTH_USER;
  const pass = process.env.KEYSTATIC_AUTH_PASSWORD;

  // Fail closed — an unconfigured admin in production is a sealed admin.
  if (!user || !pass) {
    return new NextResponse("Keystatic admin is disabled.", { status: 503 });
  }

  const header = request.headers.get("authorization");
  if (header?.startsWith("Basic ")) {
    const decoded = Buffer.from(header.slice(6), "base64").toString("utf8");
    const sep = decoded.indexOf(":");
    const u = decoded.slice(0, sep);
    const p = decoded.slice(sep + 1);
    // Evaluate both sides every time so a wrong username can't short-circuit.
    const ok = safeEqual(u, user) && safeEqual(p, pass);
    if (ok) return NextResponse.next();
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Keystatic", charset="UTF-8"' },
  });
}
