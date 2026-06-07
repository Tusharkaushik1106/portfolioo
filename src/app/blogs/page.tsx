import Link from "next/link";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../../keystatic.config";
import SiteFrame from "@/components/SiteFrame";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import Sticker from "@/components/Sticker";

const reader = createReader(process.cwd(), keystaticConfig);

// rebuild this page when content changes (and at most hourly otherwise)
export const revalidate = 3600;

function fmtDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function Blogs() {
  const all = await reader.collections.posts.all();
  const posts = all
    .filter((p) => !p.entry.draft)
    .sort((a, b) =>
      (b.entry.publishedDate ?? "").localeCompare(a.entry.publishedDate ?? ""),
    );

  return (
    <SiteFrame>
      {/* ---- Heading -------------------------------------------------- */}
      <section className="pt-16 pb-10 text-center">
        <Reveal>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-coral">
            Notes &amp; writing
          </p>
          <h1 className="font-editorial leading-none text-[#F5E1CD] text-[44px] sm:text-[64px]">
            Blogs
          </h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-paper/55">
            Thoughts on AI systems, developer tooling, and shipping things that
            feel effortless.
          </p>
        </Reveal>
      </section>

      {/* ---- Post cards ----------------------------------------------- */}
      <section className="pb-24">
        {posts.length === 0 ? (
          <Reveal>
            <p className="text-center font-hand text-xl text-paper/60">
              Nothing published yet — first post landing soon ✦
            </p>
          </Reveal>
        ) : (
          <RevealGroup
            stagger={0.1}
            className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3"
          >
            {posts.map((p, i) => (
              <RevealItem key={p.slug}>
                <Link href={`/blogs/${p.slug}`} className="group block h-full">
                  <Sticker
                    rotate={i % 2 === 0 ? -1.5 : 1.5}
                    tilt={8}
                    lift={10}
                    className="paper flex h-full flex-col p-6"
                  >
                    {p.entry.tag ? (
                      <span className="mb-4 inline-block w-fit rounded-full bg-coral/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-coral">
                        {p.entry.tag}
                      </span>
                    ) : null}
                    <h2 className="font-serif text-lg leading-snug text-ink transition-colors group-hover:text-coral">
                      {p.entry.title}
                    </h2>
                    {p.entry.summary ? (
                      <p className="mt-2 text-xs leading-relaxed text-ink/65">
                        {p.entry.summary}
                      </p>
                    ) : null}
                    <span className="mt-auto pt-4 font-mono text-[10px] uppercase tracking-wide text-ink/45">
                      {fmtDate(p.entry.publishedDate)}
                    </span>
                  </Sticker>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        )}

        <Reveal>
          <p className="mt-12 text-center font-hand text-lg text-paper/60">
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
