import Image from "next/image";
import SiteFrame from "@/components/SiteFrame";
import Reveal from "@/components/Reveal";
import Sticker from "@/components/Sticker";

// Clickable icon links over the side-projects board image. `top` is the vertical
// centre of each project as a % of the image height.
type Link = { kind: "live" | "github"; href: string };
const sideProjects: { name: string; top: string; links: Link[] }[] = [
  {
    name: "Sikkim Heritage",
    top: "13%",
    links: [
      { kind: "live", href: "https://sikkim-tourism-five.vercel.app/" },
      { kind: "github", href: "https://github.com/Tusharkaushik1106/Sikkim-Tourism" },
    ],
  },
  {
    name: "ClipMuxd",
    top: "30.5%",
    links: [{ kind: "github", href: "https://github.com/Tusharkaushik1106/clipmuxd" }],
  },
  {
    name: "AuraReader",
    top: "48%",
    links: [{ kind: "github", href: "https://github.com/Tusharkaushik1106/aurareader" }],
  },
  {
    name: "Intervue",
    top: "65.5%",
    links: [{ kind: "live", href: "https://intervue-sepia.vercel.app/" }],
  },
  {
    name: "Sweep",
    top: "83%",
    links: [{ kind: "github", href: "https://github.com/Tusharkaushik1106/Sweep" }],
  },
];

export default function Work() {
  return (
    <SiteFrame>
      {/* ---- Hero ----------------------------------------------------- */}
      <section className="pt-16 pb-12 text-center">
        <Reveal>
          <Image
            src="/illustrations/camping.png"
            alt=""
            aria-hidden
            width={645}
            height={425}
            sizes="160px"
            className="relative z-0 mx-auto -mb-3 h-auto w-32 opacity-90 sm:w-36"
          />
          <h1 className="relative z-10 mx-auto max-w-2xl font-editorial text-[26px] leading-tight text-[#F5E1CD] sm:text-[37px]">
            Places I&apos;ve been, things I&apos;ve learnt
          </h1>
        </Reveal>
      </section>

      {/* ---- Travel-journal pieces ----------------------------------- */}
      <section className="space-y-20 pb-20">
        {/* luggage tag 1 — PrepAiro */}
        <Reveal>
          <PieceRow
            note={[
              "Shipped features across GMAT, IB, UPSC & GRE",
              "+28% user retention",
              "20% lower drop-off via SEO & performance",
            ]}
          >
            <Sticker
              rotate={-2}
              tilt={10}
              lift={12}
              style={{ boxShadow: "none" }}
              className="w-64 sm:w-72"
            >
              <Image
                src="/worksection/prepairo.png"
                alt="PrepAiro — Product Developer Intern, Bangalore 2026"
                width={1024}
                height={1536}
                quality={95}
                sizes="(min-width: 640px) 288px, 65vw"
                className="h-auto w-full drop-shadow-[0_14px_28px_rgba(0,0,0,0.55)]"
              />
            </Sticker>
          </PieceRow>
        </Reveal>

        {/* luggage tag 2 — DRDO */}
        <Reveal>
          <PieceRow
            note={[
              "Drag-and-drop form builder — 90% faster",
              "Real-time analytics dashboard + CSV export",
            ]}
          >
            <Sticker
              rotate={0}
              tilt={8}
              lift={10}
              style={{ boxShadow: "none" }}
              className="w-80 sm:w-[26rem]"
            >
              <Image
                src="/worksection/drdo1.png"
                alt="DRDO — Software Engineer Intern, New Delhi 2025"
                width={1272}
                height={1236}
                quality={95}
                sizes="(min-width: 640px) 416px, 80vw"
                className="h-auto w-full drop-shadow-[0_14px_28px_rgba(0,0,0,0.55)]"
              />
            </Sticker>
          </PieceRow>
        </Reveal>

      </section>

      {/* ---- Side Quests --------------------------------------------- */}
      <section className="pb-24">
        <Reveal>
          <div className="relative mx-auto mb-10 w-fit">
            {/* quest-themed doodles around the title */}
            <Image
              src="/graphics/g-dagger.png"
              alt=""
              aria-hidden
              width={203}
              height={211}
              className="pointer-events-none absolute -left-16 top-1/2 hidden w-16 -translate-y-1/2 -rotate-[18deg] opacity-90 sm:block lg:-left-24 lg:w-24"
            />
            <Image
              src="/graphics/g-potion.png"
              alt=""
              aria-hidden
              width={201}
              height={192}
              className="pointer-events-none absolute -right-16 top-1/2 hidden w-16 -translate-y-1/2 rotate-[14deg] opacity-90 sm:block lg:-right-24 lg:w-24"
            />
            <Image
              src="/graphics/g-book.png"
              alt=""
              aria-hidden
              width={196}
              height={192}
              className="pointer-events-none absolute -top-10 left-2 hidden w-12 -rotate-[10deg] opacity-80 lg:block"
            />
            <Image
              src="/graphics/g-key.png"
              alt=""
              aria-hidden
              width={190}
              height={184}
              className="pointer-events-none absolute -bottom-8 right-4 hidden w-12 rotate-[12deg] opacity-80 lg:block"
            />

            <h2 className="relative text-center font-editorial leading-none text-[#F5E1CD] text-[52px] sm:text-[80px] lg:text-[104px]">
              Side Quests
            </h2>
          </div>
        </Reveal>
        <Reveal>
          <Sticker
            tilt={0}
            lift={4}
            style={{ boxShadow: "none" }}
            className="relative mx-auto block w-full max-w-4xl"
          >
            <Image
              src="/sideprojects/enchanced.png"
              alt="Side projects — Sikkim Heritage, ClipMuxd, AuraReader, Intervue, Sweep"
              width={1363}
              height={2048}
              quality={100}
              unoptimized
              sizes="(min-width: 768px) 672px, 92vw"
              className="h-auto w-full drop-shadow-[0_18px_36px_rgba(0,0,0,0.5)]"
            />

            {/* clickable icon links over each project */}
            {sideProjects.map((s) => (
              <div
                key={s.name}
                style={{ top: s.top }}
                className="absolute right-[2.5%] z-10 flex -translate-y-1/2 items-center gap-2"
              >
                {s.links.map((l) => (
                  <a
                    key={l.kind}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.name} — ${l.kind === "github" ? "GitHub repo" : "live site"}`}
                    title={l.kind === "github" ? "View code" : "Visit live site"}
                    className="grid size-9 place-items-center rounded-full bg-coral text-paper-white shadow-[0_4px_14px_rgba(0,0,0,0.5)] ring-1 ring-paper-white/25 transition-all hover:scale-110 hover:bg-coral-soft"
                  >
                    {l.kind === "github" ? <GithubIcon /> : <GlobeIcon />}
                  </a>
                ))}
              </div>
            ))}
          </Sticker>
        </Reveal>
      </section>
    </SiteFrame>
  );
}

function PieceRow({ children, note }: { children: React.ReactNode; note: string[] }) {
  return (
    <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center">
      {children}
      <ul className="space-y-1 text-center font-hand text-[18px] leading-snug text-coral-soft sm:text-left">
        {note.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </div>
  );
}

function GithubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.2 11.16.6.11.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.71-4.04-1.58-4.04-1.58-.55-1.37-1.34-1.74-1.34-1.74-1.09-.73.08-.72.08-.72 1.2.08 1.84 1.21 1.84 1.21 1.07 1.8 2.81 1.28 3.5.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.31-5.47-5.83 0-1.29.47-2.34 1.24-3.17-.13-.3-.54-1.52.12-3.16 0 0 1.01-.32 3.3 1.21a11.5 11.5 0 0 1 6 0c2.29-1.53 3.3-1.21 3.3-1.21.66 1.64.25 2.86.12 3.16.77.83 1.24 1.88 1.24 3.17 0 4.53-2.81 5.53-5.49 5.82.43.36.81 1.08.81 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.21.68.83.56C20.57 21.88 24 17.49 24 12.29 24 5.78 18.63.5 12 .5z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.6 2.7 2.6 15.3 0 18M12 3c-2.6 2.7-2.6 15.3 0 18" />
    </svg>
  );
}
