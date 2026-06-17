import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal, SectionHead, ArrowLink } from "@/components/sections/home-v2/shared";
import {
  HeroOrderbook,
  ProductTabs,
  StickyAppPill,
} from "@/components/sections/products/silvana-book";

export const metadata: Metadata = {
  title: "Silvana Book — the private orderbook on Canton",
  description:
    "Trade tokenized assets with sub-second matching and atomic on-chain settlement. No pools, no slippage, no information leakage — and your assets never leave your wallet.",
};

/* --------------------------------------------------------- lifecycle stepper */

type Step = {
  n: string;
  title: string;
  body: string;
  tone?: "default" | "settle" | "rollback";
  badge?: string;
};

const STEPS: Step[] = [
  {
    n: "1",
    title: "Place",
    body: "You — or your agent — submit an order to the private orderbook. Nothing hits a public mempool.",
  },
  {
    n: "2",
    title: "Match",
    body: "Bids and asks match off-chain in an optimistic state. Execution feels instant: under one second.",
  },
  {
    n: "3",
    title: "Settle",
    body: "The coordination layer drives DvP on Canton — assets and payment swap simultaneously, only when both sides deliver.",
    tone: "settle",
    badge: "On delivery",
  },
  {
    n: "4",
    title: "Or roll back",
    body: "If either party falls short, the trade simply doesn't finalize. Balances stay exactly where they were.",
    tone: "rollback",
    badge: "On shortfall",
  },
];

function StepCard({ step }: { step: Step }) {
  const ring =
    step.tone === "settle"
      ? "border-data/40 bg-data/5"
      : step.tone === "rollback"
        ? "border-dashed border-line bg-surface"
        : "border-line bg-surface";
  const num =
    step.tone === "settle"
      ? "bg-data/15 text-data"
      : step.tone === "rollback"
        ? "bg-surface-2 text-muted"
        : "bg-accent/10 text-accent";
  return (
    <div className={`flex h-full flex-col rounded-2xl border p-6 ${ring}`}>
      <div className="flex items-center justify-between">
        <span className={`flex h-8 w-8 items-center justify-center rounded-full font-mono text-sm ${num}`}>
          {step.n}
        </span>
        {step.badge && (
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            {step.badge}
          </span>
        )}
      </div>
      <h3 className="display mt-4 text-xl text-fg">{step.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
    </div>
  );
}

function Lifecycle() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          center
          eyebrow="How a trade works"
          title="Match in milliseconds. Settle with certainty."
        />
        <Reveal delay={0.06}>
          {/* Place → Match → { Settle | Roll back }. The fork after Match is the
              safety story — settle on delivery, roll back on shortfall. */}
          <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-[1fr_1fr_1.25fr] lg:gap-6">
            <StepCard step={STEPS[0]} />
            <StepCard step={STEPS[1]} />
            <div className="relative grid gap-4">
              <span className="pointer-events-none absolute -left-3 top-1/2 hidden h-px w-3 -translate-y-1/2 bg-line lg:block" />
              <StepCard step={STEPS[2]} />
              <StepCard step={STEPS[3]} />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 text-center text-sm text-muted">
            After matching, a trade either settles in full or rolls back — there is no in-between.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- guarantees grid */

const GUARANTEES: { lead: string; body: string }[] = [
  {
    lead: "Privacy by default.",
    body: "Activity, balances, and strategies are invisible to the market — no front-running, no MEV, no third-party arbitrage, no unwanted attention on your flow.",
  },
  {
    lead: "Ultimate security.",
    body: "Canton's DvP flow means both parties execute their side or nobody does. Failed obligations trigger an automatic rollback.",
  },
  {
    lead: "Full asset control.",
    body: "Nothing is escrowed during matching. Your assets never leave your wallet until the moment settlement finalizes.",
  },
  {
    lead: "Ultra-fast agentic execution.",
    body: "Autonomous agents automate the entire orderflow. Lay back, focus on strategy — the agents do the rest.",
  },
  {
    lead: "No slippage.",
    body: "Orders settle at the intended price. Private matching means zero market impact and zero external price pressure.",
  },
  {
    lead: "No pools.",
    body: "DvP handles swaps without liquidity pools — and without pool risks: custody loss, price manipulation, MEV exploitation, IL.",
  },
];

function Guarantees() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          center
          eyebrow="Why traders choose Silvana Book"
          title="Six guarantees, built into the architecture"
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {GUARANTEES.map((g, i) => (
            <Reveal key={g.lead} delay={(i % 3) * 0.06}>
              <div className="flex h-full flex-col bg-surface p-7">
                <h3 className="display text-lg text-fg">{g.lead}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{g.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ workspace */

function Workspace() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          center
          eyebrow="Inside the product"
          title="Your trading workspace"
        />
        <ProductTabs />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- security */

function Security() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
        <SectionHead
          center
          eyebrow="Security deep dive"
          title="Security isn't a feature here. It's the settlement model."
        />
        <Reveal delay={0.06}>
          <p className="display mx-auto mt-10 max-w-3xl text-3xl leading-tight text-fg sm:text-4xl md:text-5xl">
            Both legs, simultaneously — <span className="text-gradient-flow">or not at all.</span>
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            A trade on Silvana Book either settles atomically — both legs,
            simultaneously — or it doesn't happen at all. No partial states, no
            custodial middlemen, no public mempool broadcasting your intent. And
            when you need to prove what happened, proving agents generate ZK
            proofs of orderbook activity without revealing a single trade.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-8 flex justify-center">
            <ArrowLink href="https://docs.silvana.one">
              How Silvana Book ensures security
            </ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- page */

export default function SilvanaBookPage() {
  return (
    <>
      <Hero
        eyebrow="Silvana Book"
        headline="The orderbook that keeps your strategy yours."
        subhead="Ultra-fast off-chain matching meets atomic on-chain settlement. Trade with full asset control, strong privacy, and deterministic execution — without ever exposing orders or strategies to the public network."
        primary={{ label: "Start trading", href: "/app" }}
        secondary={{ label: "See live markets", href: "/markets" }}
        visual={<HeroOrderbook />}
      />

      <Lifecycle />
      <Guarantees />
      <Workspace />
      <Security />

      <CtaBand
        headline="Execution without exposure."
        primary={{ label: "Start trading", href: "/app" }}
        secondary={{ label: "Read the docs", href: "https://docs.silvana.one" }}
      />

      <StickyAppPill />
    </>
  );
}
