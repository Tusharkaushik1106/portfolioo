import Link from "next/link";
import Image from "next/image";
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
          <RevealGroup stagger={0.1} className="mx-auto max-w-2xl space-y-6">
            {posts.map((p) => (
              <RevealItem key={p.slug}>
                <Link href={`/blogs/${p.slug}`} className="group block">
                  <Sticker
                    rotate={0}
                    tilt={0}
                    lift={6}
                    className="paper overflow-hidden rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-1 ring-black/5"
                  >
                    {p.entry.coverImage ? (
                      <div className="relative aspect-[1718/916] w-full overflow-hidden bg-ink/10">
                        <Image
                          src={p.entry.coverImage}
                          alt={p.entry.title}
                          fill
                          sizes="(min-width: 672px) 672px, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-col p-6 sm:p-8">
                      {p.entry.tag ? (
                        <span className="mb-3 inline-block w-fit rounded-full bg-coral/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-coral">
                          {p.entry.tag}
                        </span>
                      ) : null}
                      <h2 className="font-serif text-2xl leading-snug text-ink transition-colors group-hover:text-coral sm:text-3xl">
                        {p.entry.title}
                      </h2>
                      {p.entry.summary ? (
                        <p className="mt-3 text-[15px] leading-relaxed text-ink/70">
                          {p.entry.summary}
                        </p>
                      ) : null}
                      <div className="mt-5 flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase tracking-wide text-ink/45">
                          {fmtDate(p.entry.publishedDate)}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-coral opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          read →
                        </span>
                      </div>
                    </div>
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
