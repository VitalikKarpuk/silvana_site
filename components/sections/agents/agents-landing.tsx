"use client";

/* Interactive pieces of the Agents (landing) page:
   - AgentTreeVisual: the hero visual — the agent branches of the agentic tree
     with status pulses on the active branches (spec: hero visual).
   - SubNav: the sticky sub-nav tabs across the Agents section
     (How agents work / Catalog / Use cases / Playground).
   - LifecycleFlow: the 4-step horizontal lifecycle with a once-on-scroll
     order → match → settle animation.
   All motion is reduced-motion safe. */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/sections/home-v2/shared";

/* ------------------------------------------------------------- hero tree visual */

type Branch = { label: string; tone: "native" | "built" | "third"; active: boolean };

const BRANCHES: Branch[] = [
  { label: "Market maker", tone: "native", active: true },
  { label: "Grid", tone: "native", active: false },
  { label: "Taker", tone: "native", active: true },
  { label: "Settlement", tone: "built", active: true },
  { label: "Proving", tone: "built", active: false },
  { label: "Third-party", tone: "third", active: true },
];

const TONE_DOT: Record<Branch["tone"], string> = {
  native: "bg-accent",
  built: "bg-data",
  third: "bg-fg/60",
};

// The agentic tree: a trunk on the left, branches fanning to agent nodes. Active
// branches carry a status pulse so the tree reads as "live execution".
export function AgentTreeVisual() {
  const reduce = useReducedMotion();
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between border-b border-line pb-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        <span>Agentic tree</span>
        <span className="inline-flex items-center gap-1.5 text-data">
          <span className="relative flex h-1.5 w-1.5">
            {!reduce && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-data/70" />
            )}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-data" />
          </span>
          Live
        </span>
      </div>

      <div className="relative mt-5 grid grid-cols-[auto_1fr] gap-x-5">
        {/* trunk */}
        <div className="relative flex flex-col items-center">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/40 bg-accent/10 font-mono text-xs text-accent">
            ↯
          </span>
          <span aria-hidden className="mt-1 w-px flex-1 bg-line" />
        </div>

        {/* branches */}
        <ul className="space-y-2.5">
          {BRANCHES.map((b, i) => (
            <motion.li
              key={b.label}
              initial={reduce ? false : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.07 }}
              className="flex items-center gap-3"
            >
              <span aria-hidden className="h-px w-5 shrink-0 bg-line" />
              <span className="flex h-2 w-2 shrink-0 items-center justify-center">
                <span className={`relative flex h-2 w-2`}>
                  {b.active && !reduce && (
                    <span
                      className={`absolute inline-flex h-full w-full animate-ping rounded-full ${TONE_DOT[b.tone]} opacity-70`}
                    />
                  )}
                  <span className={`relative inline-flex h-2 w-2 rounded-full ${TONE_DOT[b.tone]} ${b.active ? "" : "opacity-30"}`} />
                </span>
              </span>
              <span className="flex flex-1 items-center justify-between rounded-lg border border-line bg-surface-2 px-3 py-2">
                <span className="text-sm text-fg">{b.label}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  {b.active ? "active" : "idle"}
                </span>
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- sticky subnav */

const SUBNAV = [
  { label: "How agents work", href: "#how-agents-work" },
  { label: "Catalog", href: "/agents/catalog" },
  { label: "Use cases", href: "/agents/use-cases" },
  { label: "Playground", href: "/agents/playground" },
] as const;

// Sticky tabs that ride below the global nav across the Agents section.
export function SubNav() {
  return (
    <div className="sticky top-0 z-30 border-b border-line bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-6 py-3">
        {SUBNAV.map((t) => {
          const isAnchor = t.href.startsWith("#");
          const cls =
            "whitespace-nowrap rounded-full border border-line px-4 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:border-accent/30 hover:text-fg";
          return isAnchor ? (
            <a key={t.href} href={t.href} className={cls}>
              {t.label}
            </a>
          ) : (
            <Link key={t.href} href={t.href} className={cls}>
              {t.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

/* ------------------------------------------------------------------- lifecycle */

type Step = {
  n: string;
  title: string;
  body: string;
  tone?: "default" | "settle";
  badge?: string;
};

const STEPS: Step[] = [
  {
    n: "1",
    title: "Connect",
    body: "The agent onboards with its own partyId and key, then opens gRPC streams to the orderbook and settlement services.",
  },
  {
    n: "2",
    title: "Monitor",
    body: "It watches market data, order state, settlement proposals, and any external feed — prices, news, APIs. No source restrictions.",
  },
  {
    n: "3",
    title: "Place, cancel, react",
    body: "It submits and updates orders, responds to RFQs, and reacts to fills and events in real time.",
  },
  {
    n: "4",
    title: "Settle via DvP",
    body: "On a match, the coordination layer drives atomic on-chain settlement. The agent signs locally; assets swap simultaneously or the flow rolls back.",
    tone: "settle",
    badge: "Atomic",
  },
];

function StepCard({ step, index, started, reduce }: {
  step: Step;
  index: number;
  started: boolean;
  reduce: boolean | null;
}) {
  const ring =
    step.tone === "settle" ? "border-data/40 bg-data/5" : "border-line bg-surface";
  const num =
    step.tone === "settle" ? "bg-data/15 text-data" : "bg-accent/10 text-accent";
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={started ? { opacity: 1, y: 0 } : reduce ? { opacity: 1 } : undefined}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.14 }}
      className={`flex h-full flex-col rounded-2xl border p-6 ${ring}`}
    >
      <div className="flex items-center justify-between">
        <span className={`flex h-8 w-8 items-center justify-center rounded-full font-mono text-sm ${num}`}>
          {step.n}
        </span>
        {step.badge && (
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            {step.badge}
          </span>
        )}
      </div>
      <h3 className="display mt-4 text-xl text-fg">{step.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
    </motion.div>
  );
}

// Order → match → settle ticker that runs once when the stepper scrolls in.
function FlowTicker({ started, reduce }: { started: boolean; reduce: boolean | null }) {
  const stages = ["Order placed", "Match found", "Settled via DvP"];
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!started || reduce) {
      if (reduce) setStage(stages.length - 1);
      return;
    }
    setStage(0);
    const ids = stages.map((_, i) =>
      setTimeout(() => setStage(i), 500 + i * 900),
    );
    return () => ids.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, reduce]);

  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
      {stages.map((s, i) => (
        <span key={s} className="flex items-center gap-3">
          <span
            className={`rounded-full border px-3 py-1.5 uppercase tracking-[0.14em] transition-colors duration-500 ${
              i <= stage
                ? i === stages.length - 1
                  ? "border-data/40 bg-data/10 text-data"
                  : "border-accent/40 bg-accent/10 text-accent"
                : "border-line text-muted"
            }`}
          >
            {s}
          </span>
          {i < stages.length - 1 && (
            <span aria-hidden className="text-muted">→</span>
          )}
        </span>
      ))}
    </div>
  );
}

export function LifecycleFlow() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const started = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref}>
      <div className="grid items-stretch gap-4 lg:grid-cols-4 lg:gap-6">
        {STEPS.map((step, i) => (
          <StepCard key={step.n} step={step} index={i} started={started} reduce={reduce} />
        ))}
      </div>
      <FlowTicker started={started} reduce={reduce} />
    </div>
  );
}

/* ----------------------------------------------------------------- marketplace */

type Tile = { name: string; cat: string; tone: "native" | "built" | "third" };

const TILES: Tile[] = [
  { name: "Market Maker Pro", cat: "Liquidity", tone: "native" },
  { name: "Grid Trader", cat: "Strategy", tone: "native" },
  { name: "Taker Bot", cat: "Execution", tone: "native" },
  { name: "Settlement Driver", cat: "Settlement", tone: "built" },
  { name: "ZK Prover", cat: "Proving", tone: "built" },
  { name: "RFQ Responder", cat: "Quoting", tone: "built" },
  { name: "News Sentinel", cat: "Signals", tone: "third" },
  { name: "Risk Sentinel", cat: "Risk", tone: "third" },
];

const TILE_TONE: Record<Tile["tone"], string> = {
  native: "text-accent",
  built: "text-data",
  third: "text-fg/70",
};

// Storefront-style mosaic of agent tiles for the marketplace band.
export function MarketplaceMosaic() {
  const reduce = useReducedMotion();
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {TILES.map((t, i) => (
        <motion.div
          key={t.name}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease: EASE, delay: (i % 4) * 0.06 }}
          className="group flex flex-col justify-between rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/30"
        >
          <div className="flex items-center justify-between">
            <span className={`flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface-2 font-mono text-sm ${TILE_TONE[t.tone]}`}>
              ◆
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              {t.cat}
            </span>
          </div>
          <div className="mt-6">
            <p className="text-sm font-medium text-fg">{t.name}</p>
            <p className="mt-1 font-mono text-[11px] text-muted">
              {t.tone === "native" ? "Platform" : t.tone === "built" ? "Verified" : "Partner"}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
