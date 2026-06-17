import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal, SectionHead, ArrowLink } from "@/components/sections/home-v2/shared";
import {
  AgentTreeVisual,
  SubNav,
  LifecycleFlow,
  MarketplaceMosaic,
} from "@/components/sections/agents/agents-landing";

export const metadata: Metadata = {
  title: "Agents — autonomous execution on Silvana",
  description:
    "Bring your own agents, integrate third-party agents, or build new ones. Silvana orchestrates agent operations across trading, settlement, and proving on Canton.",
};

/* ---------------------------------------------------- how agents work (sources) */

type Source = {
  eyebrow: string;
  title: string;
  body: string;
  link: { label: string; href: string };
  providers?: string[];
};

const SOURCES: Source[] = [
  {
    eyebrow: "Platform-native",
    title: "Ready to deploy",
    body: "Market making, grid, taker, settlement, and proving agents, ready to deploy.",
    link: { label: "Browse the catalog", href: "/agents/catalog" },
  },
  {
    eyebrow: "Built by you",
    title: "Custom in any language",
    body: "Write custom agents in any language the proto interfaces support.",
    link: { label: "Read the SDK guide", href: "/build/sdk-guide" },
  },
  {
    eyebrow: "Third-party",
    title: "Integrate external providers",
    body: "Integrate agents from external providers — Perplexity, Claude, and beyond.",
    link: { label: "See use cases", href: "/agents/use-cases" },
    providers: ["Perplexity", "Claude", "+ more"],
  },
];

function SourceCard({ source }: { source: Source }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7">
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
        {source.eyebrow}
      </span>
      <h3 className="display mt-3 text-xl text-fg">{source.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{source.body}</p>
      {source.providers && (
        <div className="mt-5 flex flex-wrap gap-2">
          {source.providers.map((p) => (
            <span
              key={p}
              className="rounded-full border border-line bg-surface-2 px-3 py-1 font-mono text-[11px] text-muted"
            >
              {p}
            </span>
          ))}
        </div>
      )}
      <div className="mt-auto pt-6">
        <ArrowLink href={source.link.href}>{source.link.label}</ArrowLink>
      </div>
    </div>
  );
}

function HowAgentsWork() {
  return (
    <section id="how-agents-work" className="scroll-mt-16 border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          eyebrow="How agents work"
          title="Ahead of the narrative, not chasing it"
          sub="Agent execution is the trending story in crypto. Silvana is already running it. The platform orchestrates agent operations across whatever workflows you build — and embraces every type of agent out there: AI-powered, rule-based, human-assisted."
        />
        <Reveal delay={0.06}>
          <p className="mt-6 max-w-2xl text-base text-muted">
            Agents come from three sources.
          </p>
        </Reveal>
        <div className="mt-12 grid items-stretch gap-4 md:grid-cols-3 lg:gap-6">
          {SOURCES.map((s, i) => (
            <Reveal key={s.eyebrow} delay={i * 0.08}>
              <SourceCard source={s} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.12}>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted">
            Mix agents from different providers, connect them into custom
            workflows, and deploy them through one unified execution layer.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------- lifecycle */

function Lifecycle() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          center
          eyebrow="The lifecycle"
          title="Connect. Monitor. Act. Settle."
        />
        <div className="mt-12">
          <LifecycleFlow />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ marketplace */

function Marketplace() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          eyebrow="Marketplace"
          title="The agent marketplace"
          sub="Agents are the building blocks of the tokenized economy. The Silvana Agent Marketplace is an open ecosystem where agents are bought and sold — so instead of building every workflow from scratch, you can purchase specialized agents and put them straight to work."
        />
        <Reveal delay={0.06}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted">
            As the ecosystem grows, the marketplace becomes the hub for
            agent-driven applications: businesses assembling complete financial
            and operational systems from modular, reusable components.
          </p>
        </Reveal>
        <div className="mt-12">
          <MarketplaceMosaic />
        </div>
        <Reveal delay={0.12}>
          <div className="mt-8">
            <ArrowLink href="/agents/catalog">Explore the catalog</ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------- page */

export default function AgentsPage() {
  return (
    <>
      <Hero
        eyebrow="Agents"
        headline="Agents trade. Agents settle. Agents prove."
        subhead="Silvana provides the infrastructure for agents to interact with assets — automate actions, coordinate transactions, and trigger settlement. Every sensitive operation is constrained by permissions, policies, signing rules, and settlement logic. Automation without blind execution."
        primary={{ label: "Try the Playground", href: "/agents/playground" }}
        secondary={{ label: "Browse the catalog", href: "/agents/catalog" }}
        visual={<AgentTreeVisual />}
      />

      <SubNav />

      <HowAgentsWork />
      <Lifecycle />
      <Marketplace />

      <CtaBand
        headline="See an agent in action — right now."
        primary={{ label: "Try the Playground", href: "/agents/playground" }}
        secondary={{ label: "Read the Agentic API docs", href: "/products/agentic-api" }}
      />
    </>
  );
}
