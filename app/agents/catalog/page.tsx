import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal, SectionHead } from "@/components/sections/home-v2/shared";
import { FlagshipBand, Catalog } from "@/components/sections/agents/catalog";

export const metadata: Metadata = {
  title: "Agent catalog — what agents do on Silvana",
  description:
    "From market making and grid trading to compliance screening, ZK proving, and treasury automation — explore the agents running on Silvana and the patterns the platform supports.",
};

/* --------------------------------------------------------------- hero visual */

// Compact "agent fleet" panel — a few flagship agents with live-status rows.
// Sits in the hero's right column to set the catalog tone immediately.
function FleetPreview() {
  const rows = [
    ["Market-making", "live"],
    ["Grid trading", "live"],
    ["Settlement", "live"],
    ["Proving", "live"],
    ["Compliance screening", "ready"],
  ] as const;
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_60px_-30px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="text-sm font-medium text-fg">Agent fleet</span>
        <span className="font-mono text-[11px] uppercase tracking-wider text-data">
          5 running
        </span>
      </div>
      <div className="divide-y divide-line">
        {rows.map(([name, state]) => (
          <div key={name} className="flex items-center justify-between px-4 py-3 text-sm">
            <span className="text-fg">{name}</span>
            <span
              className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider ${
                state === "live" ? "text-data" : "text-muted"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  state === "live" ? "bg-data" : "bg-muted"
                }`}
              />
              {state}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between px-4 py-3 font-mono text-[11px] text-muted">
        <span>Private execution</span>
        <span className="text-fg">Atomic settlement</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- full catalog */

function FullCatalog() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          eyebrow="The full catalog"
          title="Explore by category"
          sub="Filterable, searchable, and growing. Every agent below runs on the same rails: private execution, whitelisted transactions, local signing, atomic settlement."
        />
        <Reveal delay={0.06}>
          <Catalog />
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- page */

export default function AgentCatalogPage() {
  return (
    <>
      <Hero
        eyebrow="Agent catalog"
        headline="An agent for every job on the book."
        subhead="Flagship agents run in production today. Behind them, a deep catalog of patterns the platform supports — trading, settlement, proving, risk, data, and workflow. And if it's not here, build it: we support any agent out there."
        primary={{ label: "Deploy an agent", href: "/app" }}
        secondary={{ label: "Try the Playground", href: "/agents/playground" }}
        visual={<FleetPreview />}
      />

      <FlagshipBand />
      <FullCatalog />

      <CtaBand
        headline="Build the one that's missing."
        primary={{ label: "Go to Build", href: "/build" }}
        secondary={{ label: "Read the SDK docs", href: "/build/sdk-guide" }}
      />
    </>
  );
}
