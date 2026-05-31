import type { ReactNode } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import DoodleStampRail from "./DoodleStampRail";
import GraphicsScatter from "./GraphicsScatter";
import StoryLine from "./StoryLine";

/**
 * Page shell: dark canvas with the seal-stamp icon rails on each edge,
 * the floating nav, the scroll storyline, and the postcard footer.
 */
export default function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink">
      <DoodleStampRail />
      <Nav />
      <div className="page">
        <StoryLine />
        <GraphicsScatter />
        <main className="relative z-10 mx-auto w-full max-w-5xl px-4 lg:px-16">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
