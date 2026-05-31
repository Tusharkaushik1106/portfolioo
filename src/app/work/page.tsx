import Image from "next/image";
import SiteFrame from "@/components/SiteFrame";
import Reveal from "@/components/Reveal";
import Sticker from "@/components/Sticker";

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
          <h2 className="mb-10 text-center font-serif text-4xl text-paper">
            Side Quests
          </h2>
        </Reveal>
        <Reveal>
          <Sticker
            tilt={3}
            lift={4}
            style={{ boxShadow: "none" }}
            className="mx-auto block w-full max-w-2xl"
          >
            <Image
              src="/sideprojects/sidequests.png"
              alt="Side projects — Sikkim Heritage, ClipMuxd, AuraReader, Intervue, Sweep"
              width={1023}
              height={1537}
              quality={95}
              sizes="(min-width: 768px) 672px, 92vw"
              className="h-auto w-full drop-shadow-[0_18px_36px_rgba(0,0,0,0.5)]"
            />
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
