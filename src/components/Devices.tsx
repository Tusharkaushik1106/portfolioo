import type { ReactNode } from "react";

type ScreenProps = {
  children?: ReactNode;
  /** tailwind bg utility for the screen fill when no children given */
  tone?: string;
  className?: string;
};

/** Laptop / browser-window mockup. */
export function Laptop({ children, tone = "bg-paper-white", className = "" }: ScreenProps) {
  return (
    <div className={`sticker ${className}`}>
      <div className="rounded-t-xl bg-[#2b2b2b] p-2 pb-0">
        <div className="flex gap-1.5 px-1 pb-2">
          <span className="size-2 rounded-full bg-[#ff5f57]" />
          <span className="size-2 rounded-full bg-[#febc2e]" />
          <span className="size-2 rounded-full bg-[#28c840]" />
        </div>
        <div className={`aspect-[16/10] overflow-hidden rounded-t-md ${tone}`}>
          {children}
        </div>
      </div>
      <div className="h-2 rounded-b-xl bg-[#1c1c1c]" />
      <div className="mx-auto h-1.5 w-2/5 rounded-b-md bg-[#3a3a3a]" />
    </div>
  );
}

/** Phone mockup. */
export function Phone({ children, tone = "bg-paper-white", className = "" }: ScreenProps) {
  return (
    <div className={`sticker rounded-[1.6rem] bg-[#2b2b2b] p-1.5 ${className}`}>
      <div className={`relative aspect-[9/19] overflow-hidden rounded-[1.2rem] ${tone}`}>
        <span className="absolute left-1/2 top-1.5 h-1 w-10 -translate-x-1/2 rounded-full bg-black/30" />
        {children}
      </div>
    </div>
  );
}

/** Tablet mockup. */
export function Tablet({ children, tone = "bg-paper-white", className = "" }: ScreenProps) {
  return (
    <div className={`sticker rounded-2xl bg-[#2b2b2b] p-2 ${className}`}>
      <div className={`aspect-[4/3] overflow-hidden rounded-lg ${tone}`}>{children}</div>
    </div>
  );
}

/** Vintage all-in-one (classic Mac) mockup. */
export function RetroMac({ children, tone = "bg-coral", className = "" }: ScreenProps) {
  return (
    <div className={`sticker rounded-2xl bg-paper-light p-4 pb-8 ${className}`}>
      <div className="rounded-lg bg-[#d8cdbd] p-3 shadow-inner">
        <div className={`aspect-[4/3] overflow-hidden rounded ${tone}`}>{children}</div>
      </div>
      <div className="mt-3 flex items-center justify-between px-1">
        <span className="font-mono text-[10px] text-ink/50">●●●</span>
        <span className="h-3 w-10 rounded-sm bg-[#cdbfad]" />
      </div>
    </div>
  );
}

/** A plain placeholder "screenshot" — soft gradient + a few UI bars. */
export function ScreenStub({ accent = "bg-coral" }: { accent?: string }) {
  return (
    <div className="flex h-full flex-col gap-2 bg-gradient-to-br from-white to-paper-light p-3">
      <div className={`h-2.5 w-1/3 rounded-full ${accent}`} />
      <div className="h-2 w-2/3 rounded-full bg-ink/15" />
      <div className="h-2 w-1/2 rounded-full bg-ink/15" />
      <div className="mt-auto grid grid-cols-3 gap-1.5">
        <div className="h-8 rounded bg-ink/10" />
        <div className="h-8 rounded bg-ink/10" />
        <div className={`h-8 rounded ${accent} opacity-70`} />
      </div>
    </div>
  );
}
