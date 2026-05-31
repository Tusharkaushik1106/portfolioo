import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import SiteFrame from "@/components/SiteFrame";
import Reveal from "@/components/Reveal";
import Sticker from "@/components/Sticker";
import BookHero from "@/components/BookHero";
import MementoBoard from "@/components/MementoBoard";
import FloatIn from "@/components/FloatIn";
import SceneBreak from "@/components/SceneBreak";

type Project = {
  /** banner image in /public/banner/ — already includes title, label, frame */
  src: string;
  alt: string;
  tag: string;
  href: string;
  baseRotate: number;
  drift: number;
  driftDir: -1 | 1;
  from: "left" | "right" | "bottom";
};

const projects: Project[] = [
  {
    src: "/banner/gitlore.png",
    alt: "GitLore — repository intelligence platform with a VS Code extension surface",
    tag: "Dev tool · RAG · Web + VS Code",
    href: "https://www.gitlore.app/",
    baseRotate: -1,
    drift: 60,
    driftDir: -1,
    from: "left",
  },
  {
    src: "/banner/dupermemory.png",
    alt: "DuperMemory — Chrome extension routing across five AI models",
    tag: "Chrome ext · Multi-AI orchestration",
    href: "https://dupermemory.vercel.app/",
    baseRotate: 1,
    drift: 90,
    driftDir: -1,
    from: "right",
  },
  {
    src: "/banner/grindflow.png",
    alt: "GrindFlow — focus and productivity platform",
    tag: "Web · Productivity · Flow state",
    href: "https://grindflow.vercel.app/",
    baseRotate: -1,
    drift: 70,
    driftDir: -1,
    from: "left",
  },
];

export default function Home() {
  return (
    <SiteFrame>
      {/* ---- Hero: wide book spread, full-bleed so it can scale past the
               main column like the reference ----------------------------- */}
      <section
        className="relative left-1/2 w-screen -translate-x-1/2 pb-24 pt-16 lg:pt-24"
        data-anchor="right"
        data-chapter="00"
        data-chapter-label="Hello"
      >
        <div className="mx-auto w-[88vw] max-w-[1240px] lg:w-[64vw]">
          <BookHero />
        </div>
      </section>

      {/* ---- Selected work: sticky heading + scrolling card stack ----- */}
      <section className="pb-24">
        <div className="grid items-start gap-10 md:grid-cols-[300px_1fr] lg:gap-16">
          {/* LEFT — pinned heading */}
          <div
            className="md:sticky md:top-24"
            data-anchor="left"
            data-chapter="01"
            data-chapter-label="Work"
          >
            <Reveal>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-coral">
                Portfolio
              </p>
              <h2 className="font-serif text-3xl leading-tight text-paper sm:text-4xl">
                Selected work
              </h2>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/55">
                Dev tools, AI systems, and production web apps I&apos;ve
                designed and shipped end to end.
              </p>
              <Link
                href="/work"
                className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-coral transition-colors hover:text-coral-soft"
              >
                see all work →
              </Link>
            </Reveal>
          </div>

          {/* RIGHT — tall card stack that scrolls past the pinned heading */}
          <div className="space-y-14 md:space-y-20">
            {projects.map((p, i) => (
              <Fragment key={p.src}>
                <FloatIn from={p.from} rotate={i % 2 === 0 ? 4 : -4}>
                  <ProjectCard project={p} />
                </FloatIn>
                {/* a quiet beat between projects */}
                {i === 1 && (
                  <SceneBreak
                    src="/illustrations/fishing.png"
                    alt="A bear fishing by a quiet pond"
                    width={796}
                    height={402}
                    caption="patience pays off"
                    className="py-2"
                  />
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Scene break into the scrapbook ---------------------------- */}
      <SceneBreak
        src="/illustrations/camping.png"
        alt="A tent and campfire under a crescent moon"
        width={645}
        height={425}
        caption="off the clock"
        className="pb-16"
      />

      {/* ---- Memento board: scattered polaroids/postcards/stickies ---- */}
      <section className="pb-24">
        <Reveal>
          <h2
            className="mb-6 text-center font-serif text-2xl text-paper"
            data-anchor="right"
            data-chapter="02"
            data-chapter-label="Scrapbook"
          >
            Scrapbook
          </h2>
        </Reveal>
        <MementoBoard />
      </section>
    </SiteFrame>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <Sticker
        rotate={project.baseRotate}
        tilt={5}
        lift={10}
        className="overflow-hidden rounded-lg"
      >
        <Image
          src={project.src}
          alt={project.alt}
          width={2400}
          height={1500}
          sizes="(min-width: 1024px) 880px, 100vw"
          className="block h-auto w-full"
          priority={false}
        />
      </Sticker>
      <p className="mt-5 text-center font-mono text-[11px] uppercase tracking-widest text-coral transition-colors group-hover:text-coral-soft">
        {project.tag}
      </p>
    </a>
  );
}
