import Image from "next/image";
import SiteFrame from "@/components/SiteFrame";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import Sticker from "@/components/Sticker";
import ResumeLinks from "@/components/ResumeLinks";

const alsoList = [
  "AI systems",
  "developer tooling",
  "production deployments",
  "RAG pipelines",
  "interactive visualizations",
];

const coreStack = [
  "TypeScript",
  "Next.js",
  "React",
  "PostgreSQL",
  "Supabase",
  "GCP",
];

const workOn = [
  {
    title: "RAG Systems",
    body: "Building semantic search and repository intelligence systems using embeddings and contextual retrieval",
  },
  {
    title: "AI Tooling",
    body: "Creating cross-model orchestration systems and productivity tooling for modern AI workflows",
  },
  {
    title: "Frontend Engineering",
    body: "Designing production-ready interfaces using React, Tailwind, Framer Motion, and modern UI systems",
  },
];

export default function About() {
  return (
    <SiteFrame>
      {/* ---- Notebook sheet ------------------------------------------ */}
      <section className="pt-12 pb-16">
        <Reveal>
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-lg bg-coral" />

            {/* hand-written greeting tucked above the sheet */}
            <span className="absolute -top-7 left-6 z-30 -rotate-3 font-hand text-2xl text-paper">
              hey, I&apos;m Tushar ✦
            </span>

            <Sticker
              tilt={3}
              lift={4}
              className="graph notebook-margin spiral-top torn-top relative overflow-hidden px-8 py-14 sm:px-16"
            >
              <div className="flex items-center gap-2">
                <Star className="size-3.5 text-coral" />
                <p className="font-mono text-sm uppercase tracking-widest text-ink">
                  Product Developer · AI Systems · Full Stack
                </p>
              </div>

              {/* headline with sparkles + a hand-drawn underline */}
              <div className="relative mt-10 max-w-xl">
                <Sparkle className="absolute -left-5 -top-4 size-5 text-coral/80" />
                <h1 className="font-serif text-2xl leading-snug text-coral sm:text-3xl">
                  I build systems that combine AI, developer tooling, and
                  production-grade{" "}
                  <span className="relative inline-block">
                    user experiences.
                    <HandUnderline className="absolute -bottom-3 left-0 w-full text-coral" />
                  </span>
                </h1>
                <Sparkle className="absolute -right-2 top-1 size-4 text-coral/60" />
              </div>

              <p className="mt-7 font-hand text-[20px] leading-snug text-ink/80">
                prev. @prepairo, @koncepts · previously @ DRDO
              </p>

              <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-[1fr_auto]">
                <div className="space-y-8">
                  <div className="relative">
                    <p className="font-mono text-sm text-ink">
                      I&apos;m a Product Developer
                      <br />
                      but I&apos;m also…
                    </p>
                    <p className="mt-3 inline-block -rotate-1 bg-coral px-2.5 py-0.5 font-hand text-[22px] text-paper-white shadow-[2px_3px_0_rgba(0,0,0,0.18)]">
                      an AI systems engineer
                    </p>
                    <Sparkle className="absolute -right-1 top-8 size-4 text-coral" />
                  </div>
                  <div>
                    <p className="font-mono text-sm text-ink">
                      I&apos;m a Product Developer
                      <br />
                      but I&apos;m also…
                    </p>
                    <RevealGroup
                      stagger={0.06}
                      className="mt-3 space-y-1.5 font-hand text-[26px] leading-tight text-coral"
                    >
                      {alsoList.map((item, i) => (
                        <RevealItem key={i}>
                          <span className="inline-flex items-center gap-2">
                            <Star className="size-3 shrink-0 text-coral/80" />
                            {item}
                          </span>
                        </RevealItem>
                      ))}
                    </RevealGroup>
                  </div>

                  {/* little doodle filling the empty margin */}
                  <MugDoodle className="ml-1 mt-2 size-16 text-coral/70" />
                </div>

                <div className="relative flex items-center justify-center sm:-translate-y-8">
                  <Pin className="absolute left-1/2 top-1 z-30 -translate-x-1/2" />
                  <PhotoSlot
                    rotate={2}
                    src="/about/me.webp"
                    alt="Tushar — portrait"
                    caption="Tushar"
                  />
                  {/* "that's me" callout with an arrow */}
                  <div className="absolute -bottom-6 -left-6 -rotate-6 sm:-left-12">
                    <span className="font-hand text-lg text-ink/70">
                      that&apos;s me!
                    </span>
                    <Arrow className="ml-6 mt-0.5 w-12 text-coral" />
                  </div>
                </div>
              </div>
            </Sticker>

            {/* washi tape holding the sheet down */}
            <WashiTape className="-left-3 -top-3 -rotate-[18deg]" />
            <WashiTape className="-right-4 -top-2 rotate-[14deg]" />
            {/* wax-seal stamp */}
            <Seal className="absolute -right-5 top-16 z-30 size-20 -rotate-12 sm:-right-8" />
          </div>
        </Reveal>

        {/* ---- Résumé CTA -------------------------------------------- */}
        <Reveal>
          <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center">
            <span className="mb-3 -rotate-2 font-hand text-xl text-paper/70">
              want the full story? ✦
            </span>
            <ResumeLinks />
          </div>
        </Reveal>
      </section>

      {/* ---- Two postcards ------------------------------------------- */}
      <section className="pb-24">
        <RevealGroup
          stagger={0.12}
          className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2"
        >
          <RevealItem>
            <Sticker rotate={-1} tilt={8} lift={10} className="paper p-7">
              <div className="mb-6 grid w-28 grid-cols-2 gap-1.5">
                <span className="aspect-square rounded-sm bg-coral" />
                <span className="aspect-square rounded-sm bg-coral/30" />
                <span className="aspect-square rounded-full bg-coral" />
                <span className="aspect-square rounded-sm bg-coral/30" />
              </div>
              <h2 className="font-serif text-lg text-ink">Core Stack</h2>
              <ul className="mt-3 space-y-1.5 font-mono text-xs text-ink/70">
                {coreStack.map((item, i) => (
                  <li key={i}>· {item}</li>
                ))}
              </ul>
            </Sticker>
          </RevealItem>

          <RevealItem>
            <Sticker rotate={1} tilt={8} lift={10} className="bg-coral p-7 text-paper-white">
              <h2 className="font-serif text-lg">What I Work On</h2>
              <p className="mt-1 font-hand text-base text-paper-white/80">
                building intelligent developer and productivity systems
              </p>
              <dl className="mt-5 space-y-3">
                {workOn.map((n, i) => (
                  <div key={i}>
                    <dt className="font-mono text-xs uppercase tracking-wide">{n.title}</dt>
                    <dd className="text-xs text-paper-white/80">{n.body}</dd>
                  </div>
                ))}
              </dl>
            </Sticker>
          </RevealItem>
        </RevealGroup>
      </section>
    </SiteFrame>
  );
}

function PhotoSlot({
  rotate = 0,
  src,
  alt,
  caption,
}: {
  rotate?: number;
  src?: string;
  alt?: string;
  caption?: string;
}) {
  return (
    <Sticker rotate={rotate} tilt={12} lift={12} className="polaroid w-64">
      <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-ink/10 to-ink/20">
        {src ? (
          <Image
            src={src}
            alt={alt ?? ""}
            fill
            sizes="256px"
            className="object-cover"
          />
        ) : (
          <span className="grid h-full w-full place-items-center font-hand text-sm text-ink/40">
            [photo]
          </span>
        )}
      </div>
      {caption ? (
        <span className="mt-2 block text-center font-hand text-2xl text-coral">
          {caption}
        </span>
      ) : null}
    </Sticker>
  );
}

/* ---------------------------------------------------------- doodles & props */

function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 1l2.9 7.6L23 9.3l-6 5.3 1.9 8L12 18.6 5.1 22.6 7 14.6l-6-5.3 8.1-.7L12 1z" />
    </svg>
  );
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0c.7 6.2 5.1 10.6 12 12-6.9 1.4-11.3 5.8-12 12-.7-6.2-5.1-10.6-12-12C6.9 10.6 11.3 6.2 12 0Z" />
    </svg>
  );
}

function HandUnderline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 14"
      fill="none"
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <path
        d="M4 8 C 60 3, 150 3, 216 7"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" fill="none" className={className} aria-hidden>
      <path
        d="M3 6 C 22 2, 42 14, 52 30"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M52 30 l-10 -2 M52 30 l-2 -10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MugDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M14 26 h28 v16 a10 10 0 0 1 -10 10 h-8 a10 10 0 0 1 -10 -10 Z" />
      <path d="M42 30 h6 a6 6 0 0 1 0 12 h-6" />
      <path d="M22 14 q3 4 0 8 M32 12 q3 4 0 8 M42 14 q3 4 0 8" strokeWidth="1.8" />
    </svg>
  );
}

function Pin({ className = "" }: { className?: string }) {
  return (
    <span className={className} aria-hidden>
      <span className="block size-4 rounded-full bg-coral shadow-[0_2px_3px_rgba(0,0,0,0.4)] ring-2 ring-coral-soft/70" />
    </span>
  );
}

function WashiTape({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`absolute z-20 h-7 w-24 ${className}`}
      style={{
        background:
          "repeating-linear-gradient(45deg, rgba(227,83,66,0.45) 0 6px, rgba(242,227,207,0.5) 6px 12px)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.22)",
      }}
    />
  );
}

function Seal({ className = "" }: { className?: string }) {
  return (
    <div
      className={`grid place-items-center rounded-full border-2 border-dashed border-coral/70 bg-paper-white/85 text-center shadow-md ${className}`}
    >
      <span className="font-mono text-[8px] font-bold uppercase leading-tight tracking-wider text-coral">
        about
        <br />
        me ✦
      </span>
    </div>
  );
}
