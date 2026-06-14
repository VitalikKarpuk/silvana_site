import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { CtaBand } from "@/components/sections/cta-band";
import { StrategySimulator } from "@/components/demos/strategy-simulator";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Playground — try an agent without deploying | Silvana",
  description:
    "Pick a strategy, set your parameters, and watch an agent react on a simulated feed. Export the real agent.toml and CLI command when you're ready.",
};

const STEPS = [
  { n: "1", title: "Pick a strategy.", body: "Grid or market making." },
  { n: "2", title: "Set parameters.", body: "Spread, price levels, order size." },
  { n: "3", title: "Watch it work.", body: "Placements, fills, and adjustments — live on a mock feed." },
  { n: "4", title: "Export the real thing.", body: "Download the generated agent.toml and the CLI command to deploy it." },
];

export default function PlaygroundPage() {
  return (
    <>
      <Hero
        eyebrow="Playground"
        headline="Drive an agent before you deploy one."
        subhead="Configure a strategy, watch it react to a simulated market, and leave with the exact config and command to run it for real. Clearly labeled simulation — no funds, no live orders, no risk."
        primary={{ label: "Open the strategy simulator", href: "#simulator" }}
        secondary={{ label: "Read the SDK guide", href: "/build/sdk-guide" }}
      />

      {/* Strategy simulator (v1) */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <Reveal>
            <h2 className="display text-3xl text-fg sm:text-4xl">Configure. Simulate. Export.</h2>
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.06}>
                <div className="flex gap-3">
                  <span className="font-mono text-sm text-data">{s.n}</span>
                  <div>
                    <div className="text-sm font-medium text-fg">{s.title}</div>
                    <div className="mt-1 text-sm text-muted">{s.body}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12">
            <StrategySimulator />
          </div>
        </div>
      </section>

      {/* v2 + testnet bands — described, not rendered as disabled UI */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-16 md:grid-cols-2">
          <RoadmapBand
            chip="v2"
            title="Describe a strategy. Get an agent."
            body="Type a strategy in plain language and get a working config or SDK snippet back. Shipping in the next playground release."
          />
          <RoadmapBand
            chip="Coming soon"
            title="From simulation to sandbox"
            body="Run your configured strategy against the external developer testnet — live sandbox conditions before production."
          />
        </div>
      </section>

      <CtaBand
        headline="Liked what it did? Run it for real."
        primary={{ label: "Go to Build", href: "/build" }}
        secondary={{ label: "Deploy with the CLI", href: "/build/sdk-guide" }}
      />
    </>
  );
}

function RoadmapBand({ chip, title, body }: { chip: string; title: string; body: string }) {
  return (
    <Reveal>
      <div className="glass h-full rounded-3xl p-6">
        <span className="inline-block rounded border border-line bg-surface-2 px-2 py-0.5 text-xs text-muted">
          {chip}
        </span>
        <h3 className="display mt-4 text-xl text-fg">{title}</h3>
        <p className="mt-2 text-sm text-muted">{body}</p>
      </div>
    </Reveal>
  );
}
