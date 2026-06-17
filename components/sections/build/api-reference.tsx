"use client";

/* Interactive piece of the Build → API reference page:
   - ServiceExplorer: the gRPC services surface. On desktop it's a row of
     service tabs that crossfade a window-chrome detail card (RPCs + streaming
     model). On mobile it collapses to stacked definition cards so the whole
     surface is readable without tabbing.
   This is the page's focal block (spec: "the services table is the page").
   All motion is reduced-motion safe. */

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/sections/home-v2/shared";

/* ----------------------------------------------------------------- services */

type Service = {
  key: string;
  name: string; // mono gRPC service name
  role: string;
  streaming: string;
  rpcs: string[];
  doc: string;
};

const SERVICES: Service[] = [
  {
    key: "orderbook",
    name: "OrderbookService",
    role: "Order submission, market data, RFQ initiation.",
    streaming:
      "Server-streaming subscriptions for orderbook, order, and settlement updates.",
    rpcs: ["SubmitOrder", "MarketData", "InitiateRfq", "Subscribe"],
    doc: "https://docs.silvana.one",
  },
  {
    key: "settlement",
    name: "SettlementService",
    role: "DvP orchestration and RFQ handling.",
    streaming:
      "Bidirectional stream: proposals, preconfirmations, lifecycle events, recording.",
    rpcs: ["Propose", "Preconfirm", "Lifecycle", "Record"],
    doc: "https://docs.silvana.one",
  },
  {
    key: "ledger",
    name: "Ledger Gateway",
    role: "Ledger reads, agent onboarding, two-phase signing.",
    streaming:
      "Balances, preapprovals, and faucet on supported environments.",
    rpcs: ["Onboard", "Prepare", "Execute", "Balances", "Preapprove", "Faucet"],
    doc: "https://docs.silvana.one",
  },
  {
    key: "pricing",
    name: "PricingService",
    role: "External price feeds streamed straight into your agent.",
    streaming: "Live streams from Binance, ByBit, and CoinGecko.",
    rpcs: ["Subscribe", "Binance", "ByBit", "CoinGecko"],
    doc: "https://docs.silvana.one",
  },
  {
    key: "news",
    name: "News API",
    role: "Product and protocol announcements as a feed or live stream.",
    streaming: "Pipe into dashboards, Slack, or agent triggers.",
    rpcs: ["Feed", "Stream"],
    doc: "https://docs.silvana.one",
  },
];

/* --------------------------------------------------- shared detail card body */

function ServiceCard({ s }: { s: Service }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.4)]">
      {/* window chrome */}
      <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-line" />
          <span className="h-3 w-3 rounded-full bg-line" />
          <span className="h-3 w-3 rounded-full bg-line" />
        </div>
        <span className="font-mono text-xs text-data">gRPC</span>
      </div>

      <div className="px-5 py-5">
        <h3 className="display font-mono text-lg text-fg">{s.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{s.role}</p>

        <div className="mt-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            RPCs
          </span>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {s.rpcs.map((r) => (
              <span
                key={r}
                className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-xs text-fg"
              >
                {r}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-dashed border-data/40 bg-surface px-4 py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-data">
            Streaming model
          </span>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            {s.streaming}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- explorer */

export function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = SERVICES[active];

  return (
    <div className="mt-12">
      {/* desktop: tab row + crossfading detail card */}
      <div className="hidden lg:block">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          {/* service tabs as a vertical list */}
          <div className="flex flex-col gap-2">
            {SERVICES.map((s, i) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={`group flex items-center justify-between rounded-xl border px-5 py-4 text-left transition-colors ${
                  active === i
                    ? "border-accent/40 bg-accent/10"
                    : "border-line bg-surface hover:border-accent/30"
                }`}
              >
                <span className="min-w-0">
                  <span
                    className={`block font-mono text-sm ${
                      active === i ? "text-accent" : "text-fg"
                    }`}
                  >
                    {s.name}
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-muted">
                    {s.role}
                  </span>
                </span>
                <svg
                  viewBox="0 0 24 24"
                  className={`ml-4 h-4 w-4 shrink-0 transition-colors ${
                    active === i ? "text-accent" : "text-muted"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            ))}
          </div>

          {/* detail card */}
          <div className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.key}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <ServiceCard s={current} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* mobile: stacked definition cards — the whole surface, no tabbing */}
      <div className="grid gap-4 lg:hidden">
        {SERVICES.map((s) => (
          <ServiceCard key={s.key} s={s} />
        ))}
      </div>
    </div>
  );
}
