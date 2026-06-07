import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { createReader } from "@keystatic/core/reader";
import { DocumentRenderer } from "@keystatic/core/renderer";
import keystaticConfig from "../../../../keystatic.config";
import SiteFrame from "@/components/SiteFrame";
import Reveal from "@/components/Reveal";

const reader = createReader(process.cwd(), keystaticConfig);

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await reader.collections.posts.all();
  return posts.map((p) => ({ slug: p.slug }));
}

function fmtDate(d: string | null) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await reader.collections.posts.read(slug, {
    resolveLinkedFiles: true,
  });
  if (!post || post.draft) notFound();

  return (
    <SiteFrame>
      <article className="mx-auto max-w-2xl px-2 pt-16 pb-24">
        <Reveal>
          <Link
            href="/blogs"
            className="font-mono text-[11px] uppercase tracking-widest text-coral hover:text-coral-soft"
          >
            ← all posts
          </Link>

          {post.tag ? (
            <span className="mt-6 inline-block rounded-full bg-coral/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-coral">
              {post.tag}
            </span>
          ) : null}

          <h1 className="mt-4 font-editorial leading-[1.08] text-[#F5E1CD] text-[34px] sm:text-[48px]">
            {post.title}
          </h1>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-paper/45">
            {fmtDate(post.publishedDate)}
          </p>
        </Reveal>

        {post.coverImage ? (
          <Reveal>
            <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-xl bg-ink/20 shadow-2xl ring-1 ring-paper/10">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                sizes="(min-width: 768px) 672px, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        ) : null}

        <Reveal>
          <div className="prose-paper mt-10">
            <DocumentRenderer document={post.content} />
          </div>
        </Reveal>
      </article>
    </SiteFrame>
  );
}
