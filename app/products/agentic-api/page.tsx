import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Hero } from "@/components/sections/hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal, SectionHead, ArrowLink } from "@/components/sections/home-v2/shared";
import { CodeTabs } from "@/components/sections/products/agentic-api";

export const metadata: Metadata = {
  title: "Agentic API — one gRPC interface for Canton",
  description:
    "The unified execution layer for agents and backends on Canton: two-phase signing, DvP, CIP-56 payments, transfers, payroll, multicall, and bridged transactions.",
};

/* ------------------------------------------------------------- hero visual */

// gRPC service surface — a compact proto/service frame standing in for the
// single unified interface the page is about.
function HeroService() {
  const rpcs = [
    "Cip56Payment",
    "DvpExecute",
    "CcTransfer",
    "Payroll",
    "Subscribe",
    "Multicall",
    "BridgedTx",
    "RequestUserService",
  ];
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_60px_-30px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between border-b border-line px-4 py-3 font-mono text-xs">
        <span className="text-fg">silvana.ledger.v1</span>
        <span className="text-data">gRPC</span>
      </div>
      <div className="px-5 py-4 font-mono text-[13px] leading-relaxed">
        <div className="text-muted">service AgenticApi {"{"}</div>
        <div className="mt-1 space-y-1">
          {rpcs.map((r) => (
            <div key={r} className="flex items-baseline gap-2 pl-4">
              <span className="text-accent">rpc</span>
              <span className="text-fg">{r}</span>
              <span className="text-muted">(Prepare) returns (Execute);</span>
            </div>
          ))}
        </div>
        <div className="mt-1 text-muted">{"}"}</div>
      </div>
      <div className="flex items-center justify-between border-t border-line px-5 py-3 font-mono text-[11px] text-muted">
        <span>proto in</span>
        <span className="text-data">agents out</span>
      </div>
    </div>
  );
}

/* --------------------------------------------------------- why it exists */

function Why() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
        <SectionHead
          center
          eyebrow="Why it exists"
          title="Canton, without the complexity"
        />
        <Reveal delay={0.06}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            Talking to a ledger directly means wrangling contracts, parties,
            fees, and confirmations. The Agentic API abstracts all of it behind
            a clear-cut two-phase transaction flow — so your code{" "}
            <span className="text-fg">manages assets, coordinates payments,
            and runs workflows</span>{" "}
            while the API handles the ledger.
          </p>
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
    body: "The API builds the transaction and returns the payload and hash.",
  },
  {
    n: "2",
    title: "Sign locally",
    body: "Your agent verifies and signs. Private keys never leave the client.",
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

/* The two-phase diagram is the page's focal point: three nodes (Prepare →
   Sign → Execute) with the keys-stay-local callout pinned under node 2.
   Built as a self-contained block so it can be reused on Build → API
   reference (per the spec's Layout & UX note). */
function TwoPhaseDiagram() {
  return (
    <div className="mt-12">
      <div className="grid items-start gap-4 lg:grid-cols-3 lg:gap-6">
        {PHASES.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.06}>
            <div className="relative">
              {/* connector to next node */}
              {i < PHASES.length - 1 && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-3 top-[2.65rem] hidden h-px w-3 bg-line lg:block lg:-right-4 lg:w-4"
                />
              )}
              <PhaseNode phase={p} />
              {/* keys-stay-local callout pinned under node 2 */}
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
          eyebrow="Two-phase transaction flow"
          title="Prepare. Sign. Execute."
          sub="Every state-changing operation — transfers, DvP, CIP-56, recurring payments, multicall — runs through a two-phase flow instead of one blind RPC call."
        />

        <TwoPhaseDiagram />

        <Reveal delay={0.18}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted">
            Every on-chain action is explicitly authorized by the agent.{" "}
            <span className="text-fg">
              Unintended execution is structurally impossible.
            </span>
          </p>
        </Reveal>

        {/* One tabbed code block (Rust / TypeScript): prepare → execute. */}
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

type Cap = { name: string; body: string; icon: ReactNode };

function Icon({ d }: { d: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

const CAPS: Cap[] = [
  {
    name: "CIP-56 payments",
    body: "Programmable, verifiable, agent-driven payments on Canton's CIP-56 standard.",
    icon: <Icon d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />,
  },
  {
    name: "DvP execution",
    body: "Run any transaction through the Delivery-versus-Payment flow.",
    icon: <Icon d="M16 3l4 4-4 4M20 7H8M8 21l-4-4 4-4M4 17h12" />,
  },
  {
    name: "CC transfer",
    body: "Move Canton Coin in bulk or by splitting.",
    icon: <Icon d="M5 12h14M13 6l6 6-6 6" />,
  },
  {
    name: "Payroll",
    body: "Execute regular, programmable payments on schedule.",
    icon: <Icon d="M12 8v4l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z" />,
  },
  {
    name: "Stay updated",
    body: "Subscribe to a live stream of Canton updates.",
    icon: <Icon d="M4 11a9 9 0 0 1 9 9M4 4a16 16 0 0 1 16 16M5 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />,
  },
  {
    name: "Multicall",
    body: "Execute multi-step workflows across several agents — atomically.",
    icon: <Icon d="M4 6h16M4 12h16M4 18h10" />,
  },
  {
    name: "Bridged transactions",
    body: "Run cross-chain transactions through a bridge.",
    icon: <Icon d="M3 12h18M5 12v6M19 12v6M3 12a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4" />,
  },
  {
    name: "Request user service",
    body: "Engage providers to perform actions within provider-defined user flows.",
    icon: <Icon d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20a8 8 0 0 1 16 0" />,
  },
];

function Capabilities() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          center
          eyebrow="Core capabilities"
          title="What you can ship with it"
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {CAPS.map((c, i) => (
            <Reveal key={c.name} delay={(i % 4) * 0.05}>
              <div className="flex h-full flex-col bg-surface p-7">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  {c.icon}
                </span>
                <h3 className="display mt-4 text-lg text-fg">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------- any language, any stack */

function LanguageBand() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Any language, any stack" title="Proto in, agents out" />
            <Reveal delay={0.08}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                The API is defined in proto, so it works from any programming
                language. Agents run in{" "}
                <span className="text-fg">Rust</span>; the{" "}
                <span className="text-fg">TypeScript SDK</span> covers web
                environments. A transaction whitelist keeps execution safe and
                fee-accounted — and extends as new use cases come online.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                <ArrowLink href="/products/sdk">Explore the SDK</ArrowLink>
                <ArrowLink href="/build/api-reference">API reference</ArrowLink>
                <ArrowLink href="https://docs.silvana.one">Read the docs</ArrowLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-line bg-surface-2">
              <div className="border-b border-line px-5 py-3 font-mono text-xs text-muted">
                ledger.proto
              </div>
              <pre className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-relaxed">
                <code>
                  <span className="block text-muted">
                    // One contract, every language
                  </span>
                  <span className="block text-fg">message PrepareTransfer {"{"}</span>
                  <span className="block pl-4 text-fg">string from = 1;</span>
                  <span className="block pl-4 text-fg">string to = 2;</span>
                  <span className="block pl-4 text-fg">uint64 amount = 3;</span>
                  <span className="block text-fg">{"}"}</span>
                  <span className="block"> </span>
                  <span className="block text-accent">
                    rpc Prepare returns (Execute);
                  </span>
                </code>
              </pre>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- page */

export default function AgenticApiPage() {
  return (
    <>
      <Hero
        eyebrow="Agentic API"
        headline="Everything on Canton, behind one API."
        subhead="The Agentic API runs via the Silvana Ledger — a unified gRPC interface for agents and backend applications that transact on Canton. Define logic once. Agents handle the rest."
        primary={{ label: "Read the API reference", href: "/build/api-reference" }}
        secondary={{ label: "Get the SDK", href: "/products/sdk" }}
        visual={<HeroService />}
      />

      <Why />
      <TwoPhase />
      <Capabilities />
      <LanguageBand />

      <CtaBand
        headline="Define logic once. Let agents execute."
        primary={{ label: "Read the API reference", href: "/build/api-reference" }}
        secondary={{ label: "See the SDK guide", href: "/build/sdk-guide" }}
      />
    </>
  );
}
