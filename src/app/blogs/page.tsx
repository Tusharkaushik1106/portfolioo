import Link from "next/link";
import SiteFrame from "@/components/SiteFrame";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import Sticker from "@/components/Sticker";

const drafts = [
  {
    tag: "RAG",
    title: "Contextual retrieval that actually ships",
    body: "Notes on embeddings, chunking, and the retrieval tricks that survived production.",
  },
  {
    tag: "Dev tools",
    title: "Building a VS Code extension people keep open",
    body: "What I learned wiring an editor surface to a RAG backend.",
  },
  {
    tag: "AI · UX",
    title: "Designing for many models at once",
    body: "Orchestrating across five AI models without the UI falling apart.",
  },
];

export default function Blogs() {
  return (
    <SiteFrame>
      {/* ---- Heading -------------------------------------------------- */}
      <section className="pt-16 pb-10 text-center">
        <Reveal>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-coral">
            Notes &amp; writing
          </p>
          <h1 className="font-serif text-4xl leading-tight text-paper sm:text-5xl">
            Blogs
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-paper/55">
            Half-written thoughts on AI systems, developer tooling, and shipping
            things that feel effortless. Proper posts landing soon.
          </p>
        </Reveal>
      </section>

      {/* ---- Draft cards ---------------------------------------------- */}
      <section className="pb-24">
        <RevealGroup
          stagger={0.1}
          className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {drafts.map((d, i) => (
            <RevealItem key={d.title}>
              <Sticker
                rotate={i % 2 === 0 ? -1.5 : 1.5}
                tilt={8}
                lift={10}
                className="paper flex h-full flex-col p-6"
              >
                <span className="mb-4 inline-block w-fit rounded-full bg-coral/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-coral">
                  {d.tag}
                </span>
                <h2 className="font-serif text-lg leading-snug text-ink">
                  {d.title}
                </h2>
                <p className="mt-2 text-xs leading-relaxed text-ink/65">
                  {d.body}
                </p>
                <span className="mt-auto pt-4 font-hand text-base text-coral/70">
                  draft ✦
                </span>
              </Sticker>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal>
          <p className="mt-10 text-center font-hand text-lg text-paper/60">
            in the meantime —{" "}
            <Link href="/work" className="text-coral hover:text-coral-soft">
              see what I&apos;ve shipped →
            </Link>
          </p>
        </Reveal>
      </section>
    </SiteFrame>
  );
}
