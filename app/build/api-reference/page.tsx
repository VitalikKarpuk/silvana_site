import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal, SectionHead, ArrowLink } from "@/components/sections/home-v2/shared";
import { CodeTabs } from "@/components/sections/products/agentic-api";
import { ServiceExplorer } from "@/components/sections/build/api-reference";

export const metadata: Metadata = {
  title: "API reference — Silvana gRPC services",
  description:
    "Map the Silvana gRPC surface: orderbook, settlement, ledger gateway, pricing, and news services — plus the two-phase transaction flow.",
};

/* ------------------------------------------------------------- hero visual */

// Compact proto frame listing the four+1 services — a static map standing in
// for the surface the rest of the page details.
function HeroSurface() {
  const services = [
    ["OrderbookService", "orders · market data · RFQ"],
    ["SettlementService", "DvP · RFQ lifecycle"],
    ["LedgerGateway", "reads · two-phase signing"],
    ["PricingService", "Binance · ByBit · CoinGecko"],
    ["NewsApi", "feed · live stream"],
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_60px_-30px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between border-b border-line px-4 py-3 font-mono text-xs">
        <span className="text-fg">silvana.proto</span>
        <span className="text-data">gRPC</span>
      </div>
      <div className="px-5 py-4 font-mono text-[13px] leading-relaxed">
        {services.map(([name, note]) => (
          <div key={name} className="flex items-baseline gap-2 py-0.5">
            <span className="text-accent">service</span>
            <span className="text-fg">{name}</span>
            <span className="ml-auto text-[11px] text-muted">{note}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-line px-5 py-3 font-mono text-[11px] text-muted">
        <span>defined in proto</span>
        <span className="text-data">streamed to agents</span>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- the services */

function Services() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          eyebrow="The services"
          title="What each service does"
          sub="Agents talk to Silvana through five gRPC services. Pick one to see its RPCs and streaming model — the full reference lives in docs."
        />
        <ServiceExplorer />
        <Reveal delay={0.18}>
          <div className="mt-10">
            <ArrowLink href="https://docs.silvana.one">
              Browse every service in the full reference
            </ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------- two-phase transaction flow */

type Phase = {
  n: string;
  title: string;
  body: string;
  tone?: "default" | "sign";
};

const PHASES: Phase[] = [
  {
    n: "1",
    title: "Prepare",
    body: "The gateway builds the transaction and returns the prepared payload and hash.",
  },
  {
    n: "2",
    title: "Sign locally",
    body: "Your agent verifies and signs the hash. Keys never leave your side.",
    tone: "sign",
  },
  {
    n: "3",
    title: "Execute",
    body: "Submit the signature, get back the status and a canonical update ID.",
  },
];

function PhaseNode({ phase }: { phase: Phase }) {
  const isSign = phase.tone === "sign";
  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border p-6 ${
        isSign ? "border-data/40 bg-data/5" : "border-line bg-surface"
      }`}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full font-mono text-sm ${
          isSign ? "bg-data/15 text-data" : "bg-accent/10 text-accent"
        }`}
      >
        {phase.n}
      </span>
      <h3 className="display mt-4 text-xl text-fg">{phase.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{phase.body}</p>
    </div>
  );
}

/* Three nodes (Prepare → Sign → Execute) with the keys-stay-local callout
   pinned under node 2 — the same two-phase diagram pattern as the Agentic API
   page (spec: "Reuse the two-phase diagram component from the Agentic API
   page"). Rebuilt here as the source block doesn't export it. */
function TwoPhaseDiagram() {
  return (
    <div className="mt-12">
      <div className="grid items-start gap-4 lg:grid-cols-3 lg:gap-6">
        {PHASES.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.06}>
            <div className="relative">
              {i < PHASES.length - 1 && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-3 top-[2.65rem] hidden h-px w-3 bg-line lg:block lg:-right-4 lg:w-4"
                />
              )}
              <PhaseNode phase={p} />
              {p.tone === "sign" && (
                <div className="mt-3 rounded-xl border border-dashed border-data/40 bg-surface px-4 py-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-data">
                    Keys stay local
                  </span>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    Signing happens entirely client-side — no key material ever
                    crosses the wire.
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function TwoPhase() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          center
          eyebrow="Two-phase transactions"
          title="Prepare. Sign locally. Execute."
          sub="Every ledger mutation follows prepare → sign → execute. The gateway returns the prepared payload and hash; your agent signs locally; execution returns the status and a canonical update ID."
        />

        <TwoPhaseDiagram />

        <Reveal delay={0.18}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted">
            Keys never leave your side.{" "}
            <span className="text-fg">Every mutation is explicitly signed.</span>
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mx-auto mt-12 max-w-3xl">
            <CodeTabs />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ capabilities */

const CAPS: { name: string; doc?: boolean }[] = [
  { name: "CIP-56 payments" },
  { name: "DvP execution" },
  { name: "CC transfers — bulk, split, atomic batch via multicall" },
  { name: "Payroll" },
  { name: "Live update streams" },
  { name: "Multicall workflows" },
  { name: "Bridged transactions" },
  { name: "Request user service" },
];

function Capabilities() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          eyebrow="Core capabilities"
          title="What you can execute"
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {CAPS.map((c, i) => (
            <Reveal key={c.name} delay={(i % 4) * 0.05}>
              <div className="flex h-full items-start gap-3 bg-surface p-6">
                <span className="mt-1 flex h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="font-mono text-sm leading-relaxed text-fg">
                  {c.name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.18}>
          <div className="mt-10">
            <ArrowLink href="https://docs.silvana.one">
              Full capability docs
            </ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- page */

export default function ApiReferencePage() {
  return (
    <>
      <Hero
        eyebrow="API reference"
        headline="Four services. One execution layer."
        subhead="Agents talk to Silvana through gRPC services defined in proto. This page maps the surface; the full reference lives in docs."
        primary={{ label: "Open the full reference", href: "https://docs.silvana.one" }}
        secondary={{ label: "Read the SDK guide", href: "/build/sdk-guide" }}
        visual={<HeroSurface />}
      />

      <Services />
      <TwoPhase />
      <Capabilities />

      <CtaBand
        headline="Every endpoint, documented."
        primary={{ label: "Open docs.silvana.one", href: "https://docs.silvana.one" }}
        secondary={{ label: "Go to Agent Space", href: "/build/agent-space" }}
      />
    </>
  );
}
