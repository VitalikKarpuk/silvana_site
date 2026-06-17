import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal, SectionHead, ArrowLink } from "@/components/sections/home-v2/shared";
import { LiveHeroVisual, FlowTimeline } from "@/components/sections/solutions/trade";

export const metadata: Metadata = {
  title: "Trade — autonomous trading on Silvana",
  description:
    "Define objectives and risk limits; agents discover liquidity, negotiate RFQs, place orders, rebalance portfolios, and coordinate atomic settlement — continuously.",
};

/* ----------------------------------------------------------------- who uses it */

const AUDIENCES = [
  "Trading firms",
  "Market makers",
  "Asset managers",
  "Hedge funds",
  "Treasury teams",
  "Tokenized funds",
  "Family offices",
];

function WhoUsesIt() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          eyebrow="Who uses it"
          title="Built for the desks that move tokenized assets."
        />
        <Reveal delay={0.06}>
          <ul className="mt-10 flex flex-wrap gap-3">
            {AUDIENCES.map((a) => (
              <li
                key={a}
                className="rounded-full border border-line bg-bg px-4 py-2 text-sm font-medium text-fg"
              >
                {a}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- the flow */

function Flow() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          eyebrow="The flow"
          title="How it runs"
          sub="You set the strategy once. From there the work passes between you, the agent, Silvana, and Canton — the handoff is the story."
        />
        <FlowTimeline />
      </div>
    </section>
  );
}

/* -------------------------------------------------------- manual vs agentic */

const COMPARISON: { manual: string; agentic: string }[] = [
  {
    manual: "Markets watched manually",
    agentic: "Trading runs continuously",
  },
  {
    manual: "Opportunities missed",
    agentic: "Opportunities captured faster",
  },
  {
    manual: "Rebalancing eats hours",
    agentic: "Portfolios stay on target allocation",
  },
  {
    manual: "Execution slow and inconsistent",
    agentic: "RFQs and orders managed automatically",
  },
  {
    manual: "Settlement chased by hand",
    agentic: "Settlement coordinated automatically",
  },
];

function Comparison() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          eyebrow="The agent difference"
          title="Manual vs agentic"
        />
        <Reveal delay={0.06}>
          <div className="mt-12 overflow-hidden rounded-3xl border border-line">
            {/* header — hidden on mobile where rows stack into labeled pairs */}
            <div className="hidden grid-cols-2 border-b border-line bg-bg sm:grid">
              <div className="border-r border-line px-7 py-4">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  Without agents
                </span>
              </div>
              <div className="px-7 py-4">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-data">
                  With agents
                </span>
              </div>
            </div>

            {COMPARISON.map((row, i) => (
              <div
                key={row.agentic}
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  i < COMPARISON.length - 1 ? "border-b border-line" : ""
                }`}
              >
                {/* manual */}
                <div className="border-b border-line px-7 py-5 sm:border-b-0 sm:border-r">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:hidden">
                    Without agents
                  </span>
                  <p className="mt-1 text-base text-muted sm:mt-0">{row.manual}</p>
                </div>
                {/* agentic */}
                <div className="bg-surface-2/40 px-7 py-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-data sm:hidden">
                    With agents
                  </span>
                  <p className="mt-1 text-base text-fg sm:mt-0">{row.agentic}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-8">
            <ArrowLink href="/agents/use-cases">See use cases in action</ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- page */

export default function TradeSolutionPage() {
  return (
    <>
      <Hero
        eyebrow="Use case · Live"
        headline="You set the strategy. Agents run it."
        subhead="Traders, funds, and treasury teams trade tokenized assets without watching screens or managing execution by hand. Agents discover liquidity, negotiate RFQs, place orders, rebalance portfolios, and coordinate settlement — continuously evaluating markets against your objectives and risk limits."
        primary={{ label: "Open the app", href: "/app" }}
        secondary={{ label: "Deploy a trading agent", href: "/agents/playground" }}
        visual={<LiveHeroVisual />}
      />

      <WhoUsesIt />
      <Flow />
      <Comparison />

      <CtaBand
        headline="Put an agent on the book."
        primary={{ label: "Open the app", href: "/app" }}
        secondary={{ label: "Read the SDK guide", href: "/build/sdk-guide" }}
      />
    </>
  );
}
