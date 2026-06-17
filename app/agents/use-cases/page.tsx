import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal, SectionHead, ArrowLink } from "@/components/sections/home-v2/shared";
import { TradeSequence } from "@/components/sections/agents/trade-sequence";

export const metadata: Metadata = {
  title: "Use cases in action — Silvana",
  description:
    "Step through live, interactive demos of agent workflows on Silvana — from autonomous trading to the next wave of agentic finance.",
};

/* ------------------------------------------------------------- trade demo */

function TradeDemo() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          eyebrow="Trade · live demo"
          title="Trade"
          sub="An agent monitors markets, requests quotes, places orders, and coordinates atomic DvP settlement — event by event, actor by actor."
        />
        <Reveal delay={0.06}>
          <div className="mt-12">
            <TradeSequence />
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-8">
            <ArrowLink href="/solutions/trade">
              Full writeup: Solutions → Trade
            </ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- coming soon */

const SCENARIOS: { title: string; body: string; href: string }[] = [
  {
    title: "Commerce",
    body: "Agents settle goods-for-payment atomically — checkout that clears the moment both sides deliver.",
    href: "/solutions/commerce",
  },
  {
    title: "Margin",
    body: "Collateral posted, marked, and called by agents — with settlement that can't half-execute.",
    href: "/solutions/margin",
  },
  {
    title: "Payroll",
    body: "Scheduled, conditional disbursements run by agents — paid on delivery, provable after the fact.",
    href: "/solutions/payroll",
  },
  {
    title: "Loans",
    body: "Origination, drawdown, and repayment as atomic flows — no trust gaps between the legs.",
    href: "/solutions/loans",
  },
  {
    title: "Risk compliance check",
    body: "Agents validate counterparties and limits inline — before an order ever reaches the book.",
    href: "/solutions/risk-compliance",
  },
  {
    title: "Audit & due diligence",
    body: "Proving agents generate ZK proofs of activity — verifiable history without exposing trades.",
    href: "/solutions/audit",
  },
  {
    title: "Account reconciliation",
    body: "Continuous, agent-driven reconciliation against a settlement ledger that never disagrees with itself.",
    href: "/solutions/reconciliation",
  },
  {
    title: "Treasury management",
    body: "Agents sweep, rebalance, and deploy idle assets — atomic moves across positions and venues.",
    href: "/solutions/treasury",
  },
];

function ScenarioCard({
  s,
  i,
}: {
  s: (typeof SCENARIOS)[number];
  i: number;
}) {
  return (
    <Reveal delay={(i % 4) * 0.05}>
      <Link
        href={s.href}
        className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent/30"
      >
        <div className="flex items-center justify-between">
          <h3 className="display text-lg text-fg">{s.title}</h3>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            Coming soon
          </span>
        </div>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.body}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          Solutions writeup
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </Link>
    </Reveal>
  );
}

function ComingSoon() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          center
          eyebrow="What's next"
          title="Where the same rails go next"
          sub="The monitor → match → settle mechanism isn't only for trading. The same agents and atomic settlement extend across finance — each with a Solutions writeup on the way."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SCENARIOS.map((s, i) => (
            <ScenarioCard key={s.title} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- page */

export default function AgentsUseCasesPage() {
  return (
    <>
      <Hero
        eyebrow="Use cases in action"
        headline="Don't take our word for it. Step through it."
        subhead="Interactive walkthroughs of agent workflows — watch the mechanism do the talking."
        primary={{ label: "Step through the trade demo", href: "#trade" }}
        secondary={{ label: "Browse the agent catalog", href: "/agents/catalog" }}
      />

      <div id="trade" className="scroll-mt-24">
        <TradeDemo />
      </div>
      <ComingSoon />

      <CtaBand
        headline="See the mechanism. Then run it yourself."
        body="Spin up an agent in the playground, or wire one in with the SDK."
        primary={{ label: "Open the playground", href: "/agents/playground" }}
        secondary={{ label: "Read the SDK guide", href: "/build/sdk-guide" }}
      />
    </>
  );
}
