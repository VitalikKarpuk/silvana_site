import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Hero } from "@/components/sections/hero";
import { CtaBand } from "@/components/sections/cta-band";
import {
  Reveal,
  SectionHead,
  ArrowLink,
} from "@/components/sections/home-v2/shared";
import { Quickstart, CodeBlock } from "@/components/sections/build/sdk-quickstart";

export const metadata: Metadata = {
  title: "SDK guide — quickstart",
  description:
    "Install the CLI, onboard your agent, tune agent.toml, and go live — market making, grid, and taker flows out of the box.",
};

/* ------------------------------------------------------- hero visual: install */

function HeroInstall() {
  return (
    <CodeBlock
      label="zero to running agent"
      code={`$ cargo install silvana-cli
$ silvana key generate
$ silvana onboard --invite SILVANA-XXXX
  ✓ wrote .env
  ✓ wrote agent.toml
$ silvana run lp
  → agent live · quoting CC/USDC`}
    />
  );
}

/* ----------------------------------------------------------------- quickstart */

function QuickstartSection() {
  return (
    <section id="quickstart" className="border-t border-line scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          eyebrow="Quickstart"
          title="Five steps to live"
          sub="The SDK abstracts the communication layer behind a clean interface for orderbook and settlement flows. Each step pairs with a code block — follow along top to bottom."
        />
        <Quickstart />
      </div>
    </section>
  );
}

/* -------------------------------------------------------- what's in the box */

const CAPABILITIES: { label: string; Icon: () => ReactNode }[] = [
  {
    label: "Orderbook access",
    Icon: () => (
      <path d="M4 7h16M4 12h10M4 17h7" />
    ),
  },
  {
    label: "RFQ trading",
    Icon: () => <path d="M4 6h16M4 12h16M9 18l-3 3v-3" />,
  },
  {
    label: "DvP atomic settlement",
    Icon: () => <path d="M7 8l-3 4 3 4M17 8l3 4-3 4M12 5v14" />,
  },
  {
    label: "Grid market making",
    Icon: () => <path d="M4 9h16M4 15h16M9 4v16M15 4v16" />,
  },
  {
    label: "Settlement stream",
    Icon: () => <path d="M4 7c4 4 12 4 16 0M4 12c4 4 12 4 16 0M4 17c4 4 12 4 16 0" />,
  },
  {
    label: "Local signing",
    Icon: () => (
      <>
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
  },
  {
    label: "Two-phase flow",
    Icon: () => <path d="M5 7a7 7 0 0 1 12-2l2 2m0-4v4h-4M19 17a7 7 0 0 1-12 2l-2-2m0 4v-4h4" />,
  },
  {
    label: "Extensible crates",
    Icon: () => (
      <>
        <path d="M3 8l9-5 9 5-9 5-9-5Z" />
        <path d="M3 8v8l9 5 9-5V8" />
      </>
    ),
  },
];

function WhatsInTheBox() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          center
          eyebrow="What's in the box"
          title="Eight capabilities, ready to use"
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.label} delay={(i % 4) * 0.05}>
              <div className="flex h-full items-center gap-4 bg-surface p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-2 text-accent">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <c.Icon />
                  </svg>
                </span>
                <span className="text-[15px] font-medium text-fg">
                  {c.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.12}>
          <div className="mt-8 flex justify-center">
            <ArrowLink href="/products/sdk">
              See the SDK product page for detail
            </ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- go custom */

function GoCustom() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHead
              eyebrow="Go custom"
              title="Build beyond the built-ins"
            />
            <Reveal delay={0.06}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                The core crates are reusable: load config, populate instruments,
                spin up a settlement backend, and run your own loop. Proto
                interfaces mean any language can talk to the API —{" "}
                <span className="text-gradient-flow">agents in Rust</span>, web in
                TypeScript.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                <ArrowLink href="/build/api-reference">API reference</ArrowLink>
                <ArrowLink href="/build/agent-space">Agent Space</ArrowLink>
                <ArrowLink href="/products/agentic-api">Agentic API</ArrowLink>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <CodeBlock
              label="custom_loop.rs"
              code={`use silvana_core::{Config, Instruments, Settlement};

let cfg = Config::load("agent.toml")?;
let instruments = Instruments::populate(&cfg).await?;
let mut backend = Settlement::connect(&cfg).await?;

loop {
    let quotes = my_strategy(&instruments);
    backend.submit(quotes).await?;
}`}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- page */

export default function SdkGuidePage() {
  return (
    <>
      <Hero
        eyebrow="SDK guide"
        headline="Zero to running agent."
        subhead="The SDK abstracts the communication layer behind a clean interface for orderbook and settlement flows. Follow along — you'll have an agent live before your coffee goes cold."
        primary={{ label: "Read the full docs", href: "https://docs.silvana.one" }}
        secondary={{ label: "Try the Playground first", href: "/agents/playground" }}
        visual={<HeroInstall />}
      />

      <QuickstartSection />
      <WhatsInTheBox />
      <GoCustom />

      <CtaBand
        headline="Ship your first agent today."
        primary={{ label: "Read the full SDK docs", href: "https://docs.silvana.one" }}
        secondary={{ label: "See hosting models", href: "/build/agent-space" }}
      />
    </>
  );
}
