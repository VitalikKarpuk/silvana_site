"use client";

/* Interactive pieces of the Agents → Agent catalog page:
   - FlagshipBand: five large saturated cards with a live status pulse — the
     "proof zone" of agents running in production today.
   - Catalog: category filter chips + a search input above a dense card grid.
     Each card is name + one-liner and expands on click to reveal the full
     description. A differently-styled "Your agent here" card closes the grid.
   All motion is reduced-motion safe. */

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Reveal,
  SectionHead,
  EASE,
} from "@/components/sections/home-v2/shared";

/* ----------------------------------------------------------------- flagship */

type Flagship = { name: string; body: string };

const FLAGSHIP: Flagship[] = [
  {
    name: "Market-making agent",
    body: "Posts two-sided quotes and continuously updates spreads and size to earn spread.",
  },
  {
    name: "Grid trading agent",
    body: "Places a ladder of buy and sell orders across a price range to harvest volatility.",
  },
  {
    name: "Taker agent",
    body: "Executes buy and sell flows via RFQ until the target amount fills, within your price limits.",
  },
  {
    name: "Settlement agent",
    body: "Consumes proposals and executes the Canton settlement workflow — preconfirmation, DvP propose, accept, allocation — until the trade is done.",
  },
  {
    name: "Proving agent",
    body: "Generates zero-knowledge proofs of orderbook operations without exposing private trade data.",
  },
];

function StatusPulse() {
  const reduce = useReducedMotion();
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-data">
      <span className="relative flex h-2 w-2">
        {!reduce && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-data/60" />
        )}
        <span className="relative inline-flex h-2 w-2 rounded-full bg-data" />
      </span>
      Live
    </span>
  );
}

export function FlagshipBand() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          eyebrow="Flagship agents"
          title="Running in production"
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FLAGSHIP.map((a, i) => (
            <Reveal key={a.name} delay={(i % 3) * 0.06}>
              <div className="flex h-full flex-col rounded-2xl border border-accent/30 bg-accent/[0.04] p-7 shadow-[0_24px_60px_-40px_rgba(214,68,143,0.5)]">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <StatusPulse />
                </div>
                <h3 className="display mt-5 text-xl text-fg">{a.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{a.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ catalog */

type Agent = { name: string; body: string };
type Category = { key: string; label: string; agents: Agent[] };

const CATEGORIES: Category[] = [
  {
    key: "trading",
    label: "Trading & execution",
    agents: [
      { name: "RFQ", body: "Responds to private quote requests with controlled pricing for bilateral and block trades." },
      { name: "Scalping", body: "Captures small, frequent price moves with tight risk and fast turnover." },
      { name: "Arbitrage", body: "Exploits price differences between venues or instruments before they close." },
      { name: "Trend-following", body: "Rides sustained directional moves and exits when momentum fades." },
      { name: "Mean-reversion", body: "Fades stretched prices that are likely to snap back toward fair value." },
      { name: "Breakout", body: "Trades decisive moves through key levels as ranges resolve." },
      { name: "Momentum", body: "Buys strength and sells weakness as price velocity builds." },
      { name: "Spread capture", body: "Earns the bid-ask spread by quoting both sides patiently." },
      { name: "TWAP execution", body: "Splits a large trade into smaller timed slices to reduce market impact." },
      { name: "Iceberg execution", body: "Reveals only small visible fragments while working a larger hidden position." },
      { name: "Block execution", body: "Fills large size through negotiated, privacy-preserving trades." },
      { name: "Liquidity-seeking", body: "Routes opportunistically to wherever depth and price are best." },
      { name: "Entry/exit", body: "Times position opens and closes against strategy signals." },
      { name: "Hedging", body: "Offsets unwanted exposure to keep risk inside mandate." },
      { name: "Cross-venue hedging", body: "Balances exposure across multiple venues simultaneously." },
      { name: "Cross-chain opportunity", body: "Acts on price and liquidity differences spanning chains." },
    ],
  },
  {
    key: "portfolio",
    label: "Portfolio & treasury",
    agents: [
      { name: "Portfolio rebalancing", body: "Restores target allocations when holdings drift from policy weights." },
      { name: "Target allocation", body: "Steers holdings toward a defined allocation policy over time." },
      { name: "Treasury management", body: "Manages cash, reserves, and operational liquidity on policy." },
      { name: "Inventory management", body: "Keeps trading inventory balanced against demand and risk." },
      { name: "Cash buffer", body: "Keeps enough idle liquidity for settlement, fees, and fast reactions." },
      { name: "Yield rotation", body: "Moves idle capital toward the best available yield within limits." },
      { name: "Structured product allocation", body: "Allocates across structured products by mandate and risk." },
      { name: "Lending and financing", body: "Sources and manages financing against eligible collateral." },
    ],
  },
  {
    key: "settlement",
    label: "Settlement & operations",
    agents: [
      { name: "Order state monitor", body: "Tracks every order through its lifecycle and flags anomalies." },
      { name: "Allocation readiness", body: "Confirms assets and accounts are ready before allocation." },
      { name: "Signing", body: "Performs sensitive cryptographic signing in a secure off-chain runtime without exposing keys." },
      { name: "Failure-recovery", body: "Detects failed or stale flows and retries, cancels, or rolls back safely." },
      { name: "Order expiry", body: "Cancels or refreshes orders as they reach their time limits." },
      { name: "Reconciliation", body: "Matches internal records against settled on-chain state." },
      { name: "Collateral movement", body: "Moves collateral to where obligations require it, on time." },
      { name: "Corporate treasury settlement", body: "Runs settlement workflows for corporate treasury operations." },
    ],
  },
  {
    key: "risk",
    label: "Risk & compliance",
    agents: [
      { name: "Risk compliance", body: "Enforces risk policy across positions, orders, and exposure." },
      { name: "Pre-trade limit", body: "Blocks orders that violate size, price, leverage, or notional limits." },
      { name: "Exposure control", body: "Keeps aggregate exposure within defined boundaries." },
      { name: "Inventory risk", body: "Monitors and caps risk from held inventory positions." },
      { name: "Compliance screening", body: "Screens counterparties and transactions against policy rules." },
      { name: "Blocked-party detection", body: "Flags and stops interaction with blocked counterparties." },
      { name: "Sanctions screening", body: "Checks parties against sanctions lists before execution." },
      { name: "AML monitoring", body: "Surveils flows for anti-money-laundering signals." },
      { name: "Market abuse surveillance", body: "Detects manipulative or abusive trading patterns." },
      { name: "Best-execution", body: "Verifies trades meet best-execution obligations." },
      { name: "Kill-switch", body: "Halts quoting instantly when risk or connectivity conditions break." },
      { name: "Circuit-breaker", body: "Pauses activity when volatility or thresholds are breached." },
    ],
  },
  {
    key: "data",
    label: "Data & oracle",
    agents: [
      { name: "Oracle", body: "Fetches on-chain and off-chain data and makes it usable for decisions." },
      { name: "Market data", body: "Streams and normalizes live market data for strategies." },
      { name: "News signal", body: "Turns news and event flow into trading signals for discretionary or AI-driven strategies." },
      { name: "Pivot points", body: "Computes technical pivot levels for entries and exits." },
      { name: "Fair value", body: "Estimates fair value to anchor pricing and quoting." },
      { name: "Volatility", body: "Measures and forecasts volatility for sizing and risk." },
      { name: "Liquidity analytics", body: "Analyzes depth and liquidity across books and venues." },
      { name: "PnL", body: "Computes realized and unrealized profit and loss in real time." },
      { name: "Exposure dashboard", body: "Surfaces live exposure across positions and venues." },
      { name: "Performance attribution", body: "Explains returns by strategy, asset, and decision." },
    ],
  },
  {
    key: "proofs",
    label: "Proofs & audit",
    agents: [
      { name: "Proof-of-funds", body: "Proves available funds without revealing balances or accounts." },
      { name: "Trade activity proof", body: "Proves trading activity occurred without exposing the trades." },
      { name: "Aggregate analytics proof", body: "Proves totals like average price or volume while keeping raw trades private." },
      { name: "Audit trail", body: "Builds a provable history of decisions, trades, and outcomes." },
      { name: "Witness", body: "Attests to events and state for downstream verification." },
    ],
  },
  {
    key: "workflow",
    label: "Workflow & orchestration",
    agents: [
      { name: "Workflow automation", body: "Automates multi-step operational workflows end to end." },
      { name: "Strategy orchestrator", body: "Combines multiple specialist agents into one controlled workflow." },
      { name: "Notification", body: "Sends alerts on events, thresholds, and state changes." },
      { name: "Approval (human sign-off)", body: "Pauses for human approval before sensitive actions execute." },
      { name: "Simulation", body: "Runs strategies against simulated markets before going live." },
      { name: "Backtesting", body: "Replays history to evaluate strategy performance." },
      { name: "AI strategy", body: "Runs model-driven decision logic on market and contextual inputs." },
    ],
  },
  {
    key: "corporate",
    label: "Corporate & governance",
    agents: [
      { name: "Proxy voting", body: "Casts proxy votes according to predefined policy." },
      { name: "Governance participation", body: "Votes according to predefined mandates." },
      { name: "Rights offering", body: "Manages participation in rights offerings automatically." },
      { name: "Equity issuance", body: "Automates new token issuance." },
      { name: "Investor relations", body: "Coordinates investor reporting and disclosures." },
    ],
  },
];

const ALL_KEY = "all";

function AgentCard({ agent }: { agent: Agent }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  return (
    <button
      type="button"
      onClick={() => setOpen((v) => !v)}
      aria-expanded={open}
      className="group flex h-full cursor-pointer flex-col rounded-xl border border-line bg-surface p-5 text-left transition-colors hover:border-accent/30"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="display text-base text-fg">{agent.name}</span>
        <svg
          viewBox="0 0 24 24"
          className={`mt-1 h-4 w-4 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="overflow-hidden text-sm leading-relaxed text-muted"
          >
            <span className="mt-3 block">{agent.body}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </button>
  );
}

function YourAgentCard() {
  return (
    <Link
      href="/build"
      className="group flex h-full flex-col justify-between rounded-xl border border-dashed border-accent/40 bg-accent/[0.03] p-5 transition-colors hover:border-accent/70 hover:bg-accent/[0.06]"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
        Build it
      </span>
      <span className="display mt-6 inline-flex items-center gap-1.5 text-base text-fg">
        Your agent here
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}

export function Catalog() {
  const [active, setActive] = useState(ALL_KEY);
  const [query, setQuery] = useState("");

  const chips = useMemo(
    () => [
      { key: ALL_KEY, label: "All" },
      ...CATEGORIES.map((c) => ({ key: c.key, label: c.label })),
    ],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATEGORIES.filter((c) => active === ALL_KEY || c.key === active)
      .map((c) => ({
        ...c,
        agents: q
          ? c.agents.filter(
              (a) =>
                a.name.toLowerCase().includes(q) ||
                a.body.toLowerCase().includes(q),
            )
          : c.agents,
      }))
      .filter((c) => c.agents.length > 0);
  }, [active, query]);

  return (
    <div className="mt-12">
      {/* controls: search + category chips */}
      <div className="flex flex-col gap-5">
        <div className="relative max-w-md">
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search agents…"
            aria-label="Search agents"
            className="w-full rounded-full border border-line bg-surface py-2.5 pl-10 pr-4 text-sm text-fg placeholder:text-muted focus:border-accent/40 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {chips.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setActive(c.key)}
              aria-pressed={active === c.key}
              className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                active === c.key
                  ? "border-accent/40 bg-accent/10 text-accent"
                  : "border-line text-muted hover:border-accent/30 hover:text-fg"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* grouped grid */}
      <div className="mt-12 space-y-14">
        {filtered.map((c) => (
          <div key={c.key}>
            <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              {c.label}
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {c.agents.map((a) => (
                <AgentCard key={a.name} agent={a} />
              ))}
              {/* footer card lives in the last visible group */}
              {c.key === filtered[filtered.length - 1].key && <YourAgentCard />}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-sm text-muted">
            No agents match that search. Try another term — or{" "}
            <Link href="/build" className="text-accent hover:text-accent-hover">
              build the one that&apos;s missing
            </Link>
            .
          </p>
        )}
      </div>

      <p className="mt-12 max-w-2xl text-sm text-muted">
        This list is not exhaustive. We support any agent out there — whatever it does.
      </p>
    </div>
  );
}
