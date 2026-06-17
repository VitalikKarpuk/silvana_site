import type { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/sections/hero";
import { LogoWall } from "@/components/sections/logo-wall";
import { Bento } from "@/components/sections/home/bento";
import { RouterBand } from "@/components/sections/home/router-band";
import { Institutions } from "@/components/sections/home/institutions";
import { Developers } from "@/components/sections/home/developers";
import { Liquidity } from "@/components/sections/home/liquidity";
import { IntegrationPaths } from "@/components/sections/home/integration-paths";
import { BlogCarousel } from "@/components/sections/home/blog-carousel";
import { NewsletterBand } from "@/components/sections/home/newsletter-band";
import { ClosingCta } from "@/components/sections/home/closing-cta";

export const metadata: Metadata = {
  title: "Home (v1) — the original landing page | Silvana",
  description:
    "The first version of the Silvana home page: hero, bento product grid, router band, audience sections, integration paths, blog, and closing CTA.",
};

// First-version home page, composed from the canon section order in
// content/HomePage.md (line: nav → hero → logo wall → bento → router band →
// stats → institutions → developers → liquidity → pull quote → integration
// paths → blog → newsletter → closing CTA). Stats band and pull quote have no
// dedicated components and are omitted here.
export default function HomeV1Page() {
  return (
    <>
      <Hero
        headline="The agent interaction layer for tokenized assets."
        subhead="Silvana enables AI agents, applications, and institutions to securely operate tokenized assets on Canton. Deploy agents that trade, settle, and prove — from your first transaction to your millionth."
        primary={{ label: "Open the app", href: "/app" }}
        secondary={{ label: "Start building", href: "/build" }}
        microcopy="Trading takes minutes. Your first agent takes an afternoon."
        ticker={
          <span className="font-mono text-xs text-muted">
            Settled on Silvana this season:{" "}
            <span className="text-data">$4,218,907</span>
          </span>
        }
        visual={
          <Image
            src="/hero-tree.png"
            alt="Diagram of the Silvana platform: ecosystems feed into Silvana, which branches into autonomous agents."
            width={720}
            height={720}
            priority
            className="h-auto w-full"
          />
        }
      />
      <LogoWall />
      <Bento />
      <RouterBand />
      <Institutions />
      <Developers />
      <Liquidity />
      <IntegrationPaths />
      <BlogCarousel />
      <NewsletterBand />
      <ClosingCta />
    </>
  );
}
