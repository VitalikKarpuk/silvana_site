"use client";

/* Markets page — the live trading-pairs table.
   Each row shows last price, 24h change, and 24h volume in tabular mono.
   A subtle ticker drifts the last price and change on an interval so the
   board reads as live; recently launched pairs (cETH) carry a New chip.
   All motion is reduced-motion safe (useReducedMotion → static values). */

import Link from "next/link";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/sections/home-v2/shared";

type Pair = {
  symbol: string;
  base: string;
  quote: string;
  name: string;
  price: number;
  /** decimal places for the last price */
  dp: number;
  /** 24h change in percent (signed) */
  change: number;
  /** 24h volume in USD */
  volume: number;
  isNew?: boolean;
};

const PAIRS: Pair[] = [
  {
    symbol: "CC-USDC",
    base: "CC",
    quote: "USDC",
    name: "Canton Coin / USDC",
    price: 0.0811,
    dp: 4,
    change: 1.24,
    volume: 4_182_400,
  },
  {
    symbol: "CC-cETH",
    base: "CC",
    quote: "cETH",
    name: "Canton Coin / cETH",
    price: 0.0000241,
    dp: 7,
    change: -0.62,
    volume: 1_905_800,
    isNew: true,
  },
  {
    symbol: "cETH-USDC",
    base: "cETH",
    quote: "USDC",
    name: "cETH / USDC",
    price: 3364.18,
    dp: 2,
    change: 2.07,
    volume: 6_540_100,
    isNew: true,
  },
];

function fmtPrice(n: number, dp: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: dp,
    maximumFractionDigits: dp,
  });
}

function fmtVolume(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

// Up/down tone — teal for gains, magenta for losses.
function toneClass(change: number) {
  return change >= 0 ? "text-data" : "text-accent";
}

function Arrow({ up }: { up: boolean }) {
  return <span aria-hidden>{up ? "▲" : "▼"}</span>;
}

export function MarketsTable() {
  const reduce = useReducedMotion();
  const [rows, setRows] = useState(PAIRS);

  // Subtle live drift: nudge price and 24h change a hair on an interval.
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setRows((prev) =>
        prev.map((p) => {
          const drift = (Math.random() - 0.5) * 0.0009; // ±~0.045%
          const price = p.price * (1 + drift);
          const change = +(p.change + drift * 100).toFixed(2);
          return { ...p, price, change };
        }),
      );
    }, 2600);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <Reveal delay={0.06}>
      <div className="overflow-hidden rounded-3xl border border-line bg-surface">
        {/* column header */}
        <div className="grid grid-cols-[1.6fr_1fr_1fr] items-center gap-4 border-b border-line bg-surface-2 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-muted sm:grid-cols-[1.8fr_1fr_1fr_1fr_auto] sm:px-7">
          <span>Pair</span>
          <span className="text-right tabular-nums">Last price</span>
          <span className="text-right tabular-nums">24h</span>
          <span className="hidden text-right tabular-nums sm:block">24h volume</span>
          <span className="hidden text-right sm:block">Trade</span>
        </div>

        <ul className="divide-y divide-line">
          {rows.map((p) => {
            const up = p.change >= 0;
            return (
              <li key={p.symbol}>
                <Link
                  href="/app"
                  className="group grid grid-cols-[1.6fr_1fr_1fr] items-center gap-4 px-5 py-4 transition-colors hover:bg-surface-2 sm:grid-cols-[1.8fr_1fr_1fr_1fr_auto] sm:px-7 sm:py-5"
                >
                  {/* pair */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-medium text-fg">
                        {p.symbol}
                      </span>
                      {p.isNew && (
                        <span className="rounded-full border border-data/40 bg-data/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-data">
                          New
                        </span>
                      )}
                    </div>
                    <div className="mt-0.5 truncate text-xs text-muted">{p.name}</div>
                  </div>

                  {/* last price */}
                  <div className="text-right font-mono text-sm tabular-nums text-fg">
                    {fmtPrice(p.price, p.dp)}
                  </div>

                  {/* 24h change */}
                  <div
                    className={`flex items-center justify-end gap-1 text-right font-mono text-sm tabular-nums ${toneClass(p.change)}`}
                  >
                    <Arrow up={up} />
                    <span>
                      {up ? "+" : ""}
                      {p.change.toFixed(2)}%
                    </span>
                  </div>

                  {/* 24h volume */}
                  <div className="hidden text-right font-mono text-sm tabular-nums text-muted sm:block">
                    {fmtVolume(p.volume)}
                  </div>

                  {/* trade affordance */}
                  <div className="hidden items-center justify-end sm:flex">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-xs font-medium text-fg transition-colors group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:text-accent">
                      Trade
                      <svg
                        viewBox="0 0 24 24"
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* live-status footer rule */}
        <div className="flex items-center justify-between border-t border-line bg-surface-2 px-5 py-3 font-mono text-[11px] text-muted sm:px-7">
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              {!reduce && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-data/70" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-data" />
            </span>
            Private matching · atomic DvP on Canton
          </span>
          <span className="hidden sm:inline">More pairs every season</span>
        </div>
      </div>
    </Reveal>
  );
}

// Compact illustrative board reused as the hero visual.
export function MarketsBoard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_60px_-30px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="text-sm font-medium text-fg">Markets</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-data">
          Live
        </span>
      </div>
      <div className="divide-y divide-line font-mono text-xs">
        {PAIRS.map((p) => {
          const up = p.change >= 0;
          return (
            <div
              key={p.symbol}
              className="grid grid-cols-[1.4fr_1fr_0.8fr] items-center gap-3 px-4 py-3"
            >
              <span className="flex items-center gap-2 text-fg">
                {p.symbol}
                {p.isNew && (
                  <span className="rounded-full border border-data/40 bg-data/10 px-1.5 py-0.5 text-[9px] uppercase tracking-[0.12em] text-data">
                    New
                  </span>
                )}
              </span>
              <span className="text-right tabular-nums text-fg">
                {fmtPrice(p.price, p.dp)}
              </span>
              <span
                className={`flex items-center justify-end gap-1 text-right tabular-nums ${toneClass(p.change)}`}
              >
                <Arrow up={up} />
                {up ? "+" : ""}
                {p.change.toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
