import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal, SectionHead, ArrowLink } from "@/components/sections/home-v2/shared";
import { CodeWindow } from "@/components/sections/products/sdk";

export const metadata: Metadata = {
  title: "SDK — turn a strategy into an agent",
  description:
    "The Silvana SDK: orderbook access, RFQ trading, atomic DvP settlement, grid market making, settlement streams, and local signing — in a developer-first package.",
};

/* ----------------------------------------------------------- capabilities grid */

const CAPABILITIES: { lead: string; body: string }[] = [
  {
    lead: "Orderbook access.",
    body: "Submit orders, read market data, subscribe to orderbook, order, and settlement updates.",
  },
  {
    lead: "RFQ trading.",
    body: "Agree on orders, compute quotes, validate balances, respond in real time.",
  },
  {
    lead: "DvP atomic settlement.",
    body: "One multicall settles both legs simultaneously. Done means done.",
  },
  {
    lead: "Grid market making.",
    body: "Limit orders laddered around mid price, adjusted automatically as markets move.",
  },
  {
    lead: "Settlement stream.",
    body: "A bidirectional stream carries RFQs, preconfirmations, and the full settlement lifecycle.",
  },
  {
    lead: "Local signing.",
    body: "Transactions are signed inside the agent. Your private key never travels.",
  },
  {
    lead: "Two-phase transaction flow.",
    body: "Verify before you sign. Unintended execution, eliminated.",
  },
  {
    lead: "Extensible libraries.",
    body: "Reuse the core crates to build custom agents, tools, and integrations.",
  },
];

function Capabilities() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          center
          eyebrow="Capabilities"
          title="Powerful out of the box"
        />
        {/* 4×2 grid (2 cols on small screens). Hairline dividers via bg-line gap. */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.lead} delay={(i % 4) * 0.05}>
              <div className="flex h-full flex-col bg-surface p-7">
                <h3 className="display text-lg text-fg">{c.lead}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------- from zero to running agent */

const STEPS: { n: string; body: string }[] = [
  {
    n: "1",
    body: "Install the CLI and onboard with your invite code.",
  },
  {
    n: "2",
    body: "Tune your strategy in agent.toml — markets, spreads, levels, size.",
  },
  {
    n: "3",
    body: "Run it. Market making, grid, and taker flows ship ready to go.",
  },
];

function Quickstart() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          eyebrow="From zero to running agent"
          title="Three steps. One afternoon."
        />
        {/* Code window is the visual anchor; steps sit beside it. */}
        <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <ol className="space-y-7">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.06}>
                  <li className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 font-mono text-sm text-accent">
                      {s.n}
                    </span>
                    <p className="pt-1 text-lg leading-relaxed text-fg">{s.body}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={0.2}>
              <div className="mt-8">
                <ArrowLink href="/build/sdk-guide">Full quickstart in Build</ArrowLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <CodeWindow />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- page */

export default function SdkPage() {
  return (
    <>
      <Hero
        eyebrow="SDK"
        headline="Turn a strategy into an agent."
        subhead="The SDK is your entry point for building agents and applications on Silvana Book. The communication layer is fully abstracted — you get a clean, developer-friendly interface for orderbook and settlement flows."
        primary={{ label: "Start building", href: "/build" }}
        secondary={{ label: "Read the SDK docs", href: "https://docs.silvana.one" }}
        visual={<CodeWindow />}
      />

      <Capabilities />
      <Quickstart />

      <CtaBand
        headline="Your strategy, running 24/7."
        primary={{ label: "Go to the SDK guide", href: "/build/sdk-guide" }}
        secondary={{ label: "Try the Playground first", href: "/agents/playground" }}
      />
    </>
  );
}
