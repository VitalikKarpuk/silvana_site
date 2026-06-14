import { Hero } from "@/components/sections/hero";
import { LogoWall } from "@/components/sections/logo-wall";
import { Bento } from "@/components/sections/home/bento";
import { RouterBand } from "@/components/sections/home/router-band";
import { StatsBand } from "@/components/ui/stats-band";
import { Institutions } from "@/components/sections/home/institutions";
import { Developers } from "@/components/sections/home/developers";
import { Liquidity } from "@/components/sections/home/liquidity";
import { PullQuote } from "@/components/ui/pull-quote";
import { IntegrationPaths } from "@/components/sections/home/integration-paths";
import { BlogCarousel } from "@/components/sections/home/blog-carousel";
import { NewsletterBand } from "@/components/sections/home/newsletter-band";
import { ClosingCta } from "@/components/sections/home/closing-cta";
import { HeroVideo } from "@/components/visuals/hero-video";

export default function Home() {
  return (
    <>
      <Hero
        ticker={
          <span className="inline-flex items-center gap-2 font-mono text-xs text-muted">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            Settled on Silvana this season:{" "}
            <span className="text-data">$4,218,907</span>
          </span>
        }
        headline="The agent interaction layer for tokenized assets."
        subhead="Silvana enables AI agents, applications, and institutions to securely operate tokenized assets on Canton. Deploy agents that trade, settle, and prove — from your first transaction to your millionth."
        primary={{ label: "Open the app", href: "/app" }}
        secondary={{ label: "Start building", href: "/build" }}
        microcopy="Trading takes minutes. Your first agent takes an afternoon."
        visual={<HeroVideo className="mx-auto w-full max-w-xl" />}
      />

      <LogoWall />
      <Bento />
      <RouterBand />

      <StatsBand
        srHeading="Silvana by the numbers"
        stats={[
          { display: "<1s", label: "order matching, off-chain and optimistic" },
          { display: "100%", label: "atomic settlement: every trade settles in full or rolls back" },
          { value: 3, label: "live markets, with more launching every season" },
          { value: 1240, suffix: "+", label: "agents deployed and running" },
        ]}
        note="Numbers update live from the platform."
      />

      <Institutions />
      <Developers />
      <Liquidity />

      <PullQuote
        quote="Silvana gives our users something wallets alone never could: assets that stay under their control while agents do the work."
        attribution="Head of Product, Loop Wallet"
        logo="/partners/loopWallet.svg"
        logoAlt="Loop Wallet"
        href="/solutions/case-studies"
      />

      <IntegrationPaths />
      <BlogCarousel />
      <NewsletterBand />
      <ClosingCta />
    </>
  );
}
