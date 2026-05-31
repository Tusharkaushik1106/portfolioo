import { notFound } from "next/navigation";
import Link from "next/link";
import SiteFrame from "@/components/SiteFrame";
import Reveal from "@/components/Reveal";
import { Laptop, Phone, ScreenStub } from "@/components/Devices";

type Stat = { value: string; label: string };

type CaseStudy = {
  title: string;
  subtitle: string;
  role: string;
  year: string;
  accent: string;
  overview: string;
  problem: string;
  process: string;
  solution: string;
  stats: [Stat, Stat, Stat];
};

const studies: Record<string, CaseStudy> = {
  gitlore: {
    title: "GitLore",
    subtitle:
      "Repository intelligence platform with RAG-powered code understanding, shipped as both a web app and a VS Code extension.",
    role: "Solo Builder",
    year: "2025",
    accent: "bg-blue",
    overview:
      "GitLore is a repository analysis platform that processes code structure, dependencies, and architecture to generate contextual insights. Deployed as both a Next.js web app and a VS Code extension, sharing a single retrieval backend.",
    problem:
      "Repository exploration is slow and fragmented. New engineers spend most of their first week reading source, mapping dependencies, and building a mental model of unfamiliar codebases. There's no single surface that combines semantic code search with architecture-aware retrieval.",
    process:
      "Built RAG pipelines using vector embeddings for code-aware retrieval, then wrapped the retrieval layer in an interactive workbench with ReactFlow visualizations. Shipped two surfaces — a Next.js web app and a VS Code extension — sharing the same backend so insights stay consistent across contexts.",
    solution:
      "An integrated developer workbench with semantic search across the repo, real-time summaries of files and modules, and architecture diagrams generated from dependency analysis. Available in-editor or in the browser.",
    stats: [
      { value: "RAG", label: "embeddings + retrieval" },
      { value: "Web + VSC", label: "two surfaces, one backend" },
      { value: "Real-time", label: "summaries & diagrams" },
    ],
  },

  dupermemory: {
    title: "DuperMemory",
    subtitle:
      "Chrome extension for real-time interoperability across five AI platforms.",
    role: "Solo Builder",
    year: "2026",
    accent: "bg-green",
    overview:
      "DuperMemory enables real-time interoperability across ChatGPT, Claude, Gemini, Perplexity, and DeepSeek — routing conversations between models and generating cross-AI critiques in a single click.",
    problem:
      "AI workflows are siloed. Switching models means copying prompts and losing context, and there's no easy way to compare outputs side-by-side or get a multi-model critique on the same input.",
    process:
      "Architected an event-driven system on Chrome's MV3 platform using content scripts and a service worker to orchestrate DOM extraction, input injection, response detection, and synchronized multi-tab communication. Built a persistent memory layer with structured storage and replay capabilities.",
    solution:
      "A single-click cross-AI routing system with a context-aware memory layer. Iterative cross-model evaluation in one workflow, without leaving the page.",
    stats: [
      { value: "5", label: "AI platforms unified" },
      { value: "MV3", label: "service-worker pipeline" },
      { value: "Multi-tab", label: "synchronized state" },
    ],
  },

  grindflow: {
    title: "GrindFlow",
    subtitle:
      "[One-line description of GrindFlow — what it is and who it's for.]",
    role: "[Your role]",
    year: "[Year]",
    accent: "bg-coral",
    overview:
      "[Overview paragraph — 2–3 sentences summarising the product, who you built it for, and the headline outcome.]",
    problem:
      "[Problem paragraph — what was broken, slow, or confusing before GrindFlow existed; what did the data or users say.]",
    process:
      "[Process paragraph — how you built it, what stack, what decisions, how you tested.]",
    solution:
      "[Solution paragraph — what shipped, key features, and how they map back to the problem.]",
    stats: [
      { value: "[stat 1]", label: "[label 1]" },
      { value: "[stat 2]", label: "[label 2]" },
      { value: "[stat 3]", label: "[label 3]" },
    ],
  },

  technohacks: {
    title: "Event Management Platform",
    subtitle:
      "QR-based smart event system with check-ins and automated emails. Winner of Techno Hacks 4.0.",
    role: "Solo Builder",
    year: "2023",
    accent: "bg-coral",
    overview:
      "A web app for end-to-end event management — built from scratch with React, Node.js, and MongoDB. Features QR check-ins, attendee management, and automated post-event emails.",
    problem:
      "Event organisers juggle attendee lists, check-ins, ticketing, and follow-up communications across disconnected tools. Manual check-ins create queues and human error, and post-event follow-ups get dropped.",
    process:
      "Built a unified web app: React on the frontend, Node.js on the backend, MongoDB for attendee and event data. Generated unique QR codes per attendee tied to a scanner flow that updates the database instantly, then chained automated email triggers off check-in events.",
    solution:
      "One platform that replaces three separate tools — registration → ticketing → QR check-in → automated post-event email — built in a weekend and shipped end-to-end.",
    stats: [
      { value: "QR", label: "check-in flow" },
      { value: "Auto", label: "email pipeline" },
      { value: "Winner", label: "Techno Hacks 4.0" },
    ],
  },

  prepairo: {
    title: "PrepAiro Product Engineering",
    subtitle:
      "Production product work across GMAT, IB, UPSC, and GRE — retention and discoverability.",
    role: "Product Developer Intern",
    year: "2026",
    accent: "bg-blue",
    overview:
      "Delivered and deployed production-ready features across four learning verticals at PrepAiro. The work drove a 28% increase in user retention, while SEO and performance improvements reduced user drop-off by 20% and lifted organic discoverability.",
    problem:
      "A multi-exam learning platform serving four separate test prep verticals (GMAT, IB, UPSC, GRE) needed faster feature iteration, tighter retention, and better discoverability across an organic-traffic-driven growth model.",
    process:
      "Owned end-to-end feature delivery in each module — scoping, building, deploying. Ran SEO and Core Web Vitals audits and reshaped onboarding journeys to reduce drop-off. Continuous deployment with environment-aware configuration.",
    solution:
      "Production-quality features shipped across four learning verticals, paired with SEO and performance work that increased organic discoverability and reduced bounce.",
    stats: [
      { value: "+28%", label: "user retention" },
      { value: "−20%", label: "user drop-off" },
      { value: "4", label: "modules: GMAT · IB · UPSC · GRE" },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(studies).map((slug) => ({ slug }));
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = studies[slug];
  if (!study) notFound();

  return (
    <SiteFrame>
      <section className="pt-16 pb-12">
        <Reveal>
          <Link
            href="/work"
            className="font-mono text-xs uppercase tracking-widest text-coral hover:underline"
          >
            ← back to work
          </Link>
          <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-tight text-paper sm:text-5xl">
            {study.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-paper/70">{study.subtitle}</p>
          <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-4 font-mono text-xs">
            <Meta label="Role" value={study.role} />
            <Meta label="Year" value={study.year} />
            <Meta label="Status" value="Shipped" />
          </dl>
        </Reveal>
      </section>

      <Reveal>
        <div className="mb-20">
          <Laptop><ScreenStub accent={study.accent} /></Laptop>
        </div>
      </Reveal>

      <Section label="Overview" title="What this is">
        <p className="max-w-2xl text-paper/80">{study.overview}</p>
      </Section>

      <Section label="Problem" title="The challenge">
        <p className="max-w-2xl text-paper/80">{study.problem}</p>
      </Section>

      <Section label="Process" title="How I built it">
        <p className="max-w-2xl text-paper/80">{study.process}</p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="paper sticker -rotate-1 p-2">
            <ScreenStub accent={study.accent} />
          </div>
          <div className="paper sticker rotate-1 p-2">
            <ScreenStub accent={study.accent} />
          </div>
        </div>
      </Section>

      <Section label="Solution" title="What shipped">
        <p className="max-w-2xl text-paper/80">{study.solution}</p>
        <div className="mt-8 flex flex-wrap items-end justify-center gap-6">
          <Phone className="w-40 -rotate-3"><ScreenStub accent={study.accent} /></Phone>
          <Phone className="w-40 rotate-2"><ScreenStub accent={study.accent} /></Phone>
          <Phone className="w-40 -rotate-1"><ScreenStub accent={study.accent} /></Phone>
        </div>
      </Section>

      <Section label="Outcome" title="The impact">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {study.stats.map((stat, i) => (
            <div key={i} className="paper sticker p-6 text-center">
              <p className="font-display text-3xl text-coral">{stat.value}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-ink/60">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <div className="pb-16 text-center">
        <Link
          href="/work"
          className="inline-block rounded-full bg-coral px-6 py-3 font-mono text-sm text-paper-white transition-transform hover:scale-105"
        >
          ← see more work
        </Link>
      </div>
    </SiteFrame>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="uppercase tracking-widest text-paper/40">{label}</dt>
      <dd className="mt-1 text-paper">{value}</dd>
    </div>
  );
}

function Section({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal>
      <section className="border-t border-white/10 py-14">
        <span className="font-mono text-xs uppercase tracking-widest text-coral">
          {label}
        </span>
        <h2 className="mb-6 mt-2 font-serif text-2xl text-paper">{title}</h2>
        {children}
      </section>
    </Reveal>
  );
}
