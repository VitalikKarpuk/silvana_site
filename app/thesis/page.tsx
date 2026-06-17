import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { CtaBand } from "@/components/sections/cta-band";
import {
  Reveal,
  SectionHead,
  ArrowLink,
  Counter,
} from "@/components/sections/home-v2/shared";
import { AgenticTree, ChainRail } from "@/components/sections/thesis/thesis-visuals";

export const metadata: Metadata = {
  title: "Our thesis — Silvana",
  description:
    "All financial assets will be tokenized. Agents will operate them more than humans. Silvana is the interaction layer that makes both true on Canton.",
};

/* --------------------------------------------------------- the two thesis claims */

// The boldest type moment on the site (spec: "render as oversized statement
// typography"). One claim per viewport, prose-led.
function Claims() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-4xl px-6 py-24 md:py-36">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            Two claims drive everything
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="display mt-10 text-4xl leading-[1.05] text-fg sm:text-5xl md:text-6xl">
            All financial assets will be{" "}
            <span className="text-gradient-flow">tokenized.</span>
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="display mt-8 text-4xl leading-[1.05] text-fg sm:text-5xl md:text-6xl">
            Agents will operate them{" "}
            <span className="text-gradient-flow">more than humans.</span>
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-12 max-w-2xl text-xl leading-relaxed text-muted">
            The future isn&apos;t AI telling you what to do. It&apos;s AI doing
            it for you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- positioning */

function Positioning() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <SectionHead
          eyebrow="The positioning"
          title="What Silvana is — and what it isn't"
        />
        <Reveal delay={0.06}>
          <p className="mt-8 text-lg leading-relaxed text-muted">
            Silvana is the agent interaction layer for tokenized assets. Not
            another DEX. Not a trading bot. Not an AI copilot. Not a wallet. An
            execution platform for agents running any custom logic a business
            needs — enabling AI agents, applications, and institutions to{" "}
            <span className="text-fg">operate tokenized assets on Canton</span>{" "}
            securely.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <ol className="mt-12 space-y-px overflow-hidden rounded-2xl border border-line bg-line">
            {[
              {
                n: "01",
                lead: "Tokenization",
                body: "creates digital assets.",
              },
              {
                n: "02",
                lead: "Canton",
                body: "makes them private and settlement-ready.",
              },
              {
                n: "03",
                lead: "Silvana",
                body: "makes them executable by agents.",
              },
            ].map((row) => (
              <li
                key={row.n}
                className="flex items-baseline gap-5 bg-surface px-6 py-5"
              >
                <span className="font-mono text-xs text-muted">{row.n}</span>
                <p className="text-lg text-fg">
                  <span className="display">{row.lead}</span>{" "}
                  <span className="text-muted">{row.body}</span>
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- why now */

type Stat = {
  value?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  body: string;
  source: string;
};

const STATS: Stat[] = [
  {
    prefix: "$",
    value: 2,
    suffix: "T",
    label: "Tokenized assets are becoming real.",
    body: "Tokenized financial assets by 2030, in the base case.",
    source: "McKinsey, base-case estimate",
  },
  {
    value: 35,
    suffix: "%",
    label: "Agents are moving from assistants to operators.",
    body: "Of organizations have already adopted AI agents.",
    source: "MIT Sloan & BCG research",
  },
  {
    value: 44,
    suffix: "%",
    label: "Adoption is accelerating.",
    body: "Plan to deploy AI agents in the near term.",
    source: "MIT Sloan & BCG research",
  },
  {
    value: 30,
    suffix: "+",
    label: "Canton has institutional momentum.",
    body: "Major institutions at launch — Goldman Sachs, BNP Paribas, Deutsche Börse, Microsoft, Deloitte, KPMG, Moody's, Paxos, and more.",
    source: "Canton Network launch partners",
  },
];

function WhyNow() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          center
          eyebrow="Why now"
          title="Four reasons the timing is right"
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={(i % 2) * 0.06}>
              <div className="flex h-full flex-col bg-surface p-8">
                <p className="display text-5xl text-fg sm:text-6xl">
                  {s.prefix}
                  {typeof s.value === "number" ? <Counter value={s.value} /> : null}
                  {s.suffix}
                </p>
                <h3 className="display mt-5 text-lg text-fg">{s.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {s.body}
                </p>
                <p className="mt-auto pt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  {s.source}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-10 max-w-3xl text-center text-lg leading-relaxed text-muted">
            And today&apos;s infrastructure isn&apos;t agent-native. Developing
            and running agents on Canton is a challenging task. Silvana covers
            it: a platform for agents, plus APIs, SDKs, orchestration, and
            secure, confidential execution.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- wedge & platform */

function Wedge() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <SectionHead
          eyebrow="The wedge and the platform"
          title="Trading first. Far beyond it next."
        />
        <Reveal delay={0.06}>
          <p className="display mt-10 text-3xl leading-tight text-fg sm:text-4xl">
            The orderbook on Canton is our wedge —{" "}
            <span className="text-muted">a starting point.</span>
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-8 text-lg leading-relaxed text-muted">
            The platform goes much further: corporations, RWAs, real businesses.
            More use cases ship as we go, each on the same execution,
            coordination, and proving rails.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-8">
            <ArrowLink href="/solutions">Explore the solutions</ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ the agentic tree */

function AgenticTreeSection() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          center
          eyebrow="One structure, growing"
          title="Roots, trunk, and an expanding canopy"
          sub="Ecosystems and corporate systems feed the roots. Silvana is the trunk. Agents and use cases branch out — and keep branching."
        />
        <Reveal delay={0.06}>
          <div className="mt-16">
            <AgenticTree />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- beyond one chain */

function BeyondOneChain() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          center
          eyebrow="Beyond one chain"
          title="Chain-agnostic by design"
          sub="Silvana isn't confined to Canton. The coordination layer already runs on Sui, and we plan to expand to other networks — and beyond Web3, onboarding corporate systems and their assets to fuel tokenization at large."
        />
        <Reveal delay={0.06}>
          <div className="mt-16">
            <ChainRail />
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-14 max-w-2xl text-center text-lg leading-relaxed text-muted">
            In a way, the trajectory resembles EigenLayer&apos;s path:
            infrastructure first, then an expanding surface of what runs on it.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- page */

export default function ThesisPage() {
  return (
    <>
      <Hero
        eyebrow="Our thesis"
        headline="Assets will tokenize. Agents will run them."
        subhead="Two claims drive everything we build: all financial assets will be tokenized, and agents will handle asset operations more than humans will. The future isn't AI telling you what to do. It's AI doing it for you."
        primary={{ label: "Open the app", href: "/app" }}
        secondary={{ label: "Start building", href: "/build" }}
      />

      <Claims />
      <Positioning />
      <WhyNow />
      <Wedge />
      <AgenticTreeSection />
      <BeyondOneChain />

      <CtaBand
        headline="The agent economy needs rails. We're building them."
        primary={{ label: "Open the app", href: "/app" }}
        secondary={{ label: "Start building", href: "/build" }}
      />
    </>
  );
}
