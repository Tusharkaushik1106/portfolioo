import Reveal from "./Reveal";

const socials = [
  { label: "Email",    href: "mailto:k.tushar1106@gmail.com" },
  { label: "LinkedIn", href: "https://linkedin.com/in/tushar1106" },
  { label: "GitHub",   href: "https://github.com/TusharKaushik1106" },
];

/** Postcard-style footer: left "message" half, right "address + stamp" half. */
export default function Footer() {
  return (
    <footer id="connect" className="px-6 pb-16 pt-10">
      <Reveal>
        <div className="mx-auto max-w-4xl">
          <p
            className="mb-4 text-center font-hand text-2xl text-coral-soft"
            data-anchor="left"
            data-chapter="03"
            data-chapter-label="Connect"
          >
            let&apos;s build something ambitious
          </p>
          <div className="paper sticker grid grid-cols-1 overflow-hidden md:grid-cols-2">
            {/* message half */}
            <div className="relative border-b border-dashed border-ink/30 p-7 md:border-b-0 md:border-r">
              <span className="font-mono text-[11px] uppercase tracking-widest text-ink/50">
                From New Delhi
              </span>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-ink">
                Let&apos;s build something ambitious.
              </h2>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink/70">
                Open to product, AI-tooling, and full-stack work. Drop a line —
                shortest path to a reply is email.
              </p>
            </div>
            {/* address + stamp half */}
            <div className="relative flex flex-col justify-between p-7">
              <div className="absolute right-6 top-6 grid size-16 place-items-center rounded-sm border-2 border-dashed border-coral/60 bg-coral/10 text-center font-display text-2xl leading-none text-coral">
                TK
              </div>
              <ul className="mt-2 space-y-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="font-mono text-sm text-ink/80 underline decoration-coral decoration-2 underline-offset-4 transition-colors hover:text-coral"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-hand text-xl text-ink/70">— Tushar</p>
            </div>
          </div>
          <p className="mt-6 text-center font-mono text-[11px] text-paper/40">
            © {new Date().getFullYear()} · Tushar Kaushik · Built with Next.js
          </p>
        </div>
      </Reveal>
    </footer>
  );
}
