import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = process.env.CONTACT_TO_EMAIL;

// Best-effort in-memory rate limit: 5 sends per IP per 10 min. Serverless
// instances aren't shared, so this caps a single warm instance rather than
// being globally authoritative — enough to blunt casual spam / quota burn.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // crude memory ceiling
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  if (!process.env.RESEND_API_KEY || !TO) {
    return NextResponse.json(
      { error: "Contact form is not configured." },
      { status: 500 },
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages — please try again later." },
      { status: 429 },
    );
  }

  let body: {
    name?: string;
    email?: string;
    message?: string;
    company?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a hidden field humans never see. If it's filled, it's a bot —
  // pretend success and silently drop so the bot doesn't learn it was caught.
  if ((body.company ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  // validation
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email, and message." },
      { status: 400 },
    );
  }
  if (name.length > 100 || email.length > 200) {
    return NextResponse.json(
      { error: "Name or email is too long." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "That email doesn't look right." },
      { status: 400 },
    );
  }
  if (message.length > 5000) {
    return NextResponse.json(
      { error: "Message is too long." },
      { status: 400 },
    );
  }

  // Strip CR/LF from the name before it goes in the subject line (defence in
  // depth against header-style injection, even though Resend takes JSON).
  const safeName = name.replace(/[\r\n]+/g, " ");

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [TO],
      replyTo: email,
      subject: `Portfolio message from ${safeName}`,
      text: `From: ${safeName} <${email}>\n\n${message}`,
    });
    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Couldn't send right now. Try again in a bit." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Contact route error:", e);
    return NextResponse.json(
      { error: "Something went wrong sending your message." },
      { status: 500 },
    );
  }
}
