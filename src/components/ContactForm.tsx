"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      message: String(fd.get("message") || ""),
      company: String(fd.get("company") || ""), // honeypot — stays empty for humans
    };
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        setError(j.error || "Couldn't send. Try again.");
        setStatus("error");
      }
    } catch {
      setError("Network error — check your connection.");
      setStatus("error");
    }
  }

  return (
    <div className="relative mx-auto max-w-lg">
      {/* coral backing */}
      <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-lg bg-coral" />

      <div className="paper relative rounded-lg px-7 py-8 sm:px-10">
        {/* faux postage stamp */}
        <span className="absolute -right-3 -top-3 grid size-16 -rotate-6 place-items-center rounded-[4px] border-2 border-dashed border-coral/60 bg-paper-white text-center font-hand text-xs leading-tight text-coral shadow-md">
          say
          <br />
          hi ✦
        </span>

        <p className="font-mono text-[11px] uppercase tracking-widest text-coral">
          Drop me a line
        </p>
        <h2 className="mt-2 font-serif text-2xl text-ink">Let&apos;s talk</h2>

        <AnimatePresence mode="wait">
          {status === "sent" ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <p className="font-hand text-3xl text-coral">thanks! ✦</p>
              <p className="mt-2 text-sm text-ink/70">
                Your message landed — I&apos;ll get back to you soon.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-5 font-mono text-xs uppercase tracking-widest text-coral underline-offset-4 hover:underline"
              >
                send another →
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={onSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 space-y-5"
            >
              {/* honeypot — hidden from people, irresistible to bots */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
              />
              <Field label="your name">
                <input
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Jane Doe"
                  className="contact-input"
                />
              </Field>
              <Field label="your email">
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="jane@example.com"
                  className="contact-input"
                />
              </Field>
              <Field label="message">
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Hey Tushar, I'd love to…"
                  className="contact-input resize-none"
                />
              </Field>

              {status === "error" ? (
                <p className="font-mono text-xs text-coral">{error}</p>
              ) : null}

              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-full bg-coral px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-paper-white shadow-md transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60"
              >
                {status === "sending" ? "sending…" : "send it →"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-hand text-lg text-ink/70">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
