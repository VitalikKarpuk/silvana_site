"use client";

/* Interactive pieces of the EarnHub page:
   - SeasonBanner: the slim season banner shown in the hero ticker slot — season
     number, a live countdown of days remaining, and the top prize (spec:
     "season number, days remaining, top prize ... fed dynamically").
   - PrizePool: a count-up of the seasonal prize pool, reduced-motion safe.
   - Leaderboard: the top-3 teaser rendered as a clean mono / tabular-nums table
     (spec: "top-3 rows (anonymized handles) rendered as a live component").
   All values are placeholders until wired to the live season feed.
   Motion is reduced-motion safe throughout. */

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Counter, EASE } from "@/components/sections/home-v2/shared";
import { SEASON, daysRemaining } from "./season-data";

/* ----------------------------------------------------------- season banner */

export function SeasonBanner() {
  // Compute on the client to keep the countdown current; start null to avoid
  // a hydration mismatch between server and client clocks.
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    setDays(daysRemaining(SEASON.endsISO));
  }, []);

  return (
    <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-full border border-line bg-surface px-4 py-2">
      <span className="inline-flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-data/60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-data" />
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-data">
          Season {SEASON.number} live
        </span>
      </span>
      <span aria-hidden className="h-3 w-px bg-line" />
      <span className="font-mono text-xs text-muted">
        {SEASON.startLabel} – {SEASON.endLabel}
      </span>
      <span aria-hidden className="h-3 w-px bg-line" />
      <span className="font-mono text-xs text-fg">
        {days === null ? "—" : days} days left
      </span>
      <span aria-hidden className="h-3 w-px bg-line" />
      <span className="font-mono text-xs text-accent">
        Top prize {SEASON.topPrize}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------- prize pool */

export function PrizePool() {
  return (
    <span className="display font-mono tabular-nums text-gradient-flow">
      <Counter value={SEASON.prizePool} prefix="" />
    </span>
  );
}

/* -------------------------------------------------------------- leaderboard */

type Row = {
  rank: number;
  handle: string;
  trades: number;
  settled: number;
  points: number;
};

const ROWS: Row[] = [
  { rank: 1, handle: "0x7a…f3c1", trades: 1842, settled: 1839, points: 48210 },
  { rank: 2, handle: "0x2e…9b04", trades: 1577, settled: 1571, points: 43960 },
  { rank: 3, handle: "0xc1…0d77", trades: 1403, settled: 1398, points: 39125 },
];

function medal(rank: number) {
  if (rank === 1) return "bg-accent/15 text-accent";
  if (rank === 2) return "bg-data/15 text-data";
  return "bg-surface-2 text-muted";
}

export function Leaderboard() {
  const reduce = useReducedMotion();
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      {/* header row */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-line px-5 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:grid-cols-[auto_1fr_auto_auto_auto] sm:gap-6">
        <span>Rank</span>
        <span>Trader</span>
        <span className="hidden text-right sm:block">Trades</span>
        <span className="hidden text-right sm:block">Settled</span>
        <span className="text-right">Points</span>
      </div>
      {ROWS.map((r, i) => (
        <motion.div
          key={r.rank}
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
          className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-line px-5 py-4 last:border-b-0 sm:grid-cols-[auto_1fr_auto_auto_auto] sm:gap-6"
        >
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full font-mono text-sm tabular-nums ${medal(
              r.rank,
            )}`}
          >
            {r.rank}
          </span>
          <span className="font-mono text-sm text-fg">{r.handle}</span>
          <span className="hidden text-right font-mono text-sm tabular-nums text-muted sm:block">
            {r.trades.toLocaleString("en-US")}
          </span>
          <span className="hidden text-right font-mono text-sm tabular-nums text-data sm:block">
            {r.settled.toLocaleString("en-US")}
          </span>
          <span className="text-right font-mono text-sm tabular-nums text-fg">
            {r.points.toLocaleString("en-US")}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
