import type { Metadata } from "next";
import {
  DM_Sans,
  JetBrains_Mono,
  Averia_Serif_Libre,
  Gochi_Hand,
  Lilita_One,
  Dancing_Script,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import ScrollProgress from "@/components/ScrollProgress";
import ClickBurst from "@/components/ClickBurst";

// Body / UI typeface
const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

// Typewriter / label mono (tags, "Senior level", "ADMIT 1", code)
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// Serif display ("Side Quests", "Places I've been")
const averia = Averia_Serif_Libre({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

// Handwritten accents (signatures, doodled notes)
const gochi = Gochi_Hand({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// Chunky poster display
const lilita = Lilita_One({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

// Elegant signature script (hero name)
const dancing = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

// Tall high-contrast editorial serif (section headlines) — close to "Awesome Serif Tall"
const playfair = Playfair_Display({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tushar Kaushik",
  description:
    "Portfolio of Tushar Kaushik showcasing AI systems, developer tooling, full stack engineering, and production-grade web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${jetBrainsMono.variable} ${averia.variable} ${gochi.variable} ${lilita.variable} ${dancing.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper">
        <SmoothScrollProvider>
          <ScrollProgress />
          {children}
        </SmoothScrollProvider>
        <ClickBurst />
      </body>
    </html>
  );
}
