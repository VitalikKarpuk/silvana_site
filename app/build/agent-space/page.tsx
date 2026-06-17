import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Hero } from "@/components/sections/hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal, SectionHead, ArrowLink } from "@/components/sections/home-v2/shared";
import { AgentFlow } from "@/components/sections/build/agent-space";

export const metadata: Metadata = {
  title: "Agent Space — agent types and hosting models",
  description:
    "Self-hosted, Google Cloud, Silvana Cloud, or TEE — run your agent wherever your security model says it should live.",
};

/* ------------------------------------------------------------- hero visual */

// A compact "deployment targets" frame standing in for the page's core idea:
// one agent, four places to run it.
function HeroDeploy() {
  const targets = [
    ["Self-hosted", "your perimeter"],
    ["Google Cloud", "managed scale"],
    ["Silvana Cloud", "zero ops"],
    ["TEE", "confidential enclave"],
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_60px_-30px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between border-b border-line px-4 py-3 font-mono text-xs">
        <span className="text-fg">silvana.agent</span>
        <span className="text-data">deploy --target</span>
      </div>
      <div className="grid grid-cols-2 gap-px bg-line">
        {targets.map(([name, sub]) => (
          <div key={name} className="bg-surface px-4 py-5">
            <div className="display text-sm text-fg">{name}</div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              {sub}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-line px-4 py-3 font-mono text-[11px] text-muted">
        <span>same agent logic</span>
        <span className="text-data">your call</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------- the Silvana Book agent */

const CORE_FUNCTIONS = [
  "Buy Canton Coin",
  "Sell Canton Coin",
  "Place order",
  "Accept quote",
  "DvP settlement",
];

function AgentSection() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          eyebrow="The Silvana Book agent"
          title="What a deployed agent does"
          sub="The Silvana Book agent automates orderbook workflows end to end — orders, execution, and settlement — across grid trading, RFQ, and taker flows."
        />
        <Reveal delay={0.06} className="mt-12">
          <AgentFlow />
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-8 flex flex-wrap gap-2">
            {CORE_FUNCTIONS.map((fn) => (
              <span
                key={fn}
                className="rounded-full border border-line bg-surface px-4 py-1.5 font-mono text-xs uppercase tracking-[0.12em] text-muted"
              >
                {fn}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- hosting models */

type Hosting = {
  key: string;
  name: string;
  runs: string;
  key_holder: string;
  best_for: string;
  body: string;
  tone: "accent" | "data" | "fg";
  badge?: string;
};

const HOSTING: Hosting[] = [
  {
    key: "self",
    name: "Self-hosted",
    runs: "Your infrastructure",
    key_holder: "You",
    best_for: "Full control & governance",
    body: "Run agents entirely within your own infrastructure and security perimeter — full control over execution environments, data access, network policies, and governance, with Silvana's APIs, SDK, and coordination layer doing the heavy lifting.",
    tone: "fg",
  },
  {
    key: "gcp",
    name: "Google Cloud",
    runs: "Google Cloud",
    key_holder: "You / GCP",
    best_for: "Scalable managed infra",
    body: "Deploy on Google Cloud for scalable, managed infrastructure with global availability — cloud-native flexibility on Silvana's execution framework, built to spin up and scale fast.",
    tone: "fg",
  },
  {
    key: "silvana",
    name: "Silvana Cloud",
    runs: "Silvana-managed",
    key_holder: "Silvana",
    best_for: "Fastest path to production",
    body: "The fastest path to production. Launch agents instantly on Silvana-managed infrastructure — no servers, no ops. You write agent logic; we handle deployment, scaling, orchestration, and maintenance.",
    tone: "accent",
    badge: "Fastest",
  },
  {
    key: "tee",
    name: "TEE",
    runs: "Trusted enclave",
    key_holder: "Enclave (sealed)",
    best_for: "Highest privacy bar",
    body: "Deploy inside Trusted Execution Environments for confidential execution of sensitive workflows. Agents process private data, run proprietary logic, and manage secrets in isolated enclaves — invisible to external systems, infrastructure providers, and other participants. Built for institutions with the highest privacy bar.",
    tone: "data",
    badge: "Confidential",
  },
];

const toneText: Record<Hosting["tone"], string> = {
  accent: "text-accent",
  data: "text-data",
  fg: "text-fg",
};

const toneCard: Record<Hosting["tone"], string> = {
  accent: "border-accent/40",
  data: "border-data/40",
  fg: "border-line",
};

const toneBadge: Record<Hosting["tone"], string> = {
  accent: "bg-accent/10 text-accent",
  data: "bg-data/15 text-data",
  fg: "bg-surface-2 text-muted",
};

function HostingTable() {
  const cols = ["Model", "Where it runs", "Who holds the key", "Best for"];
  return (
    <div className="mt-12 overflow-hidden rounded-3xl border border-line">
      {/* header — desktop only; cards become the mobile presentation */}
      <div className="hidden grid-cols-4 bg-surface-2 sm:grid">
        {cols.map((c) => (
          <div
            key={c}
            className="px-6 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted"
          >
            {c}
          </div>
        ))}
      </div>
      <div className="divide-y divide-line">
        {HOSTING.map((h) => (
          <div
            key={h.key}
            className="grid grid-cols-1 gap-1 bg-surface px-6 py-5 sm:grid-cols-4 sm:items-center sm:gap-0"
          >
            <div className={`display text-base ${toneText[h.tone]}`}>{h.name}</div>
            <div className="text-sm text-muted">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:hidden">
                Runs:{" "}
              </span>
              {h.runs}
            </div>
            <div className="text-sm text-muted">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:hidden">
                Key:{" "}
              </span>
              {h.key_holder}
            </div>
            <div className="text-sm text-fg">
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted sm:hidden">
                Best for:{" "}
              </span>
              {h.best_for}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HostingCard({ h }: { h: Hosting }) {
  return (
    <div className={`flex h-full flex-col rounded-2xl border bg-surface p-7 ${toneCard[h.tone]}`}>
      <div className="flex items-center justify-between">
        <h3 className={`display text-xl ${toneText[h.tone]}`}>{h.name}</h3>
        {h.badge && (
          <span
            className={`rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${toneBadge[h.tone]}`}
          >
            {h.badge}
          </span>
        )}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{h.body}</p>
    </div>
  );
}

function HostingSection() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          center
          eyebrow="Hosting models"
          title="Four ways to run"
          sub="Run them in the hosting model that fits your security perimeter — from your own machine to a trusted enclave."
        />
        <HostingTable />
        <div className="mt-6 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
          {HOSTING.map((h, i) => (
            <Reveal key={h.key} delay={(i % 2) * 0.06}>
              <HostingCard h={h} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- cross-link band */

function CrossLink({
  eyebrow,
  title,
  body,
  href,
  cta,
}: {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</span>
      <h3 className="display mt-3 text-2xl text-fg">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{body}</p>
      <div className="mt-6">
        <ArrowLink href={href}>{cta}</ArrowLink>
      </div>
    </div>
  );
}

function CrossLinkBand() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          center
          eyebrow="Next steps"
          title={
            <>
              What to run, <span className="text-gradient-flow">and how to run it</span>
            </>
          }
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 md:gap-6">
          <Reveal>
            <CrossLink
              eyebrow="What to run"
              title="The agent catalog"
              body="Browse agents you can deploy, buy, sell, and integrate into whatever you're building on Silvana — starting with the Silvana Book agent."
              href="/agents/catalog"
              cta="Browse the catalog"
            />
          </Reveal>
          <Reveal delay={0.06}>
            <CrossLink
              eyebrow="How to run it"
              title="The SDK guide"
              body="Wire up agent logic, pick a hosting model, and ship to production with Silvana's SDK, APIs, and coordination layer."
              href="/build/sdk-guide"
              cta="Start the SDK guide"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- page */

export default function AgentSpacePage() {
  return (
    <>
      <Hero
        eyebrow="Agent Space"
        headline="Your agent. Your infrastructure. Your call."
        subhead="Agents can be built, bought, sold, and integrated into whatever you're building on Silvana. Run them in the hosting model that fits your security perimeter — from your own machine to a trusted enclave."
        primary={{ label: "Start the SDK guide", href: "/build/sdk-guide" }}
        secondary={{ label: "Browse the agent catalog", href: "/agents/catalog" }}
        visual={<HeroDeploy />}
      />

      <AgentSection />
      <HostingSection />
      <CrossLinkBand />

      <CtaBand
        headline="Pick a model. Deploy an agent."
        primary={{ label: "Start the SDK guide", href: "/build/sdk-guide" }}
        secondary={{ label: "Browse the agent catalog", href: "/agents/catalog" }}
      />
    </>
  );
}
