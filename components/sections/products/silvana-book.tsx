"use client";

/* Interactive pieces of the Products → Silvana Book page:
   - ProductTabs: the Terminal / Swap / RFQ tabbed showcase with a crossfade
     between framed product previews (spec: "tab switch animates the screenshot
     crossfade").
   - StickyAppPill: the bottom-right "Open the app" pill that appears after the
     reader passes 50% of the page (spec: this page only).
   All motion is reduced-motion safe. */

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/sections/home-v2/shared";

/* ----------------------------------------------------------- product previews */

// Compact orderbook frame — reused as the hero visual and the Terminal preview.
function TerminalPreview() {
  const asks = [
    ["0.0814", "12.4"],
    ["0.0813", "8.1"],
    ["0.0812", "21.7"],
  ];
  const bids = [
    ["0.0810", "16.2"],
    ["0.0809", "9.5"],
    ["0.0808", "27.0"],
  ];
  return (
    <div className="font-mono text-xs">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="text-sm font-medium text-fg">CC / USDC</span>
        <span className="text-data">0.0811 ▲ 1.2%</span>
      </div>
      <div className="grid grid-cols-2 gap-px bg-line text-[11px]">
        <div className="bg-surface px-4 py-3">
          <div className="mb-2 uppercase tracking-wider text-muted">Asks</div>
          {asks.map(([p, s], i) => (
            <div key={i} className="relative flex justify-between py-0.5 text-accent">
              <span className="absolute inset-y-0 right-0 bg-accent/10" style={{ width: `${30 + i * 18}%` }} />
              <span className="relative">{p}</span>
              <span className="relative text-muted">{s}</span>
            </div>
          ))}
        </div>
        <div className="bg-surface px-4 py-3">
          <div className="mb-2 uppercase tracking-wider text-muted">Bids</div>
          {bids.map(([p, s], i) => (
            <div key={i} className="relative flex justify-between py-0.5 text-data">
              <span className="absolute inset-y-0 left-0 bg-data/10" style={{ width: `${60 - i * 18}%` }} />
              <span className="relative">{p}</span>
              <span className="relative text-muted">{s}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-3 text-[11px] text-muted">
        <span>Spread 0.0002</span>
        <span className="text-fg">Position +1,204 CC</span>
      </div>
    </div>
  );
}

function SwapPreview() {
  return (
    <div className="space-y-2 p-5">
      <div className="rounded-xl border border-line bg-surface-2 p-4">
        <div className="mb-1 text-[11px] uppercase tracking-wider text-muted">You pay</div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-2xl text-fg">1,000</span>
          <span className="rounded-full border border-line bg-surface px-3 py-1 text-sm font-medium text-fg">CC</span>
        </div>
      </div>
      <div className="flex justify-center">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface text-data">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
        </span>
      </div>
      <div className="rounded-xl border border-line bg-surface-2 p-4">
        <div className="mb-1 text-[11px] uppercase tracking-wider text-muted">You receive</div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-2xl text-fg">80.18</span>
          <span className="rounded-full border border-line bg-surface px-3 py-1 text-sm font-medium text-fg">USDC</span>
        </div>
      </div>
      <div className="flex items-center justify-between px-1 pt-1 font-mono text-[11px] text-muted">
        <span>1 CC = 0.0802 USDC</span>
        <span className="text-data">Atomic DvP</span>
      </div>
    </div>
  );
}

function RfqPreview() {
  const quotes = [
    ["Maker A", "0.0809", "live"],
    ["Maker B", "0.0807", "live"],
    ["Maker C", "0.0811", "expired"],
  ];
  return (
    <div className="p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-fg">Block RFQ · 50,000 CC</span>
        <span className="font-mono text-[11px] uppercase tracking-wider text-data">3 quotes</span>
      </div>
      <div className="space-y-2">
        {quotes.map(([who, px, state], i) => (
          <div
            key={i}
            className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm ${
              i === 1 ? "border-data/40 bg-data/5" : "border-line bg-surface-2"
            }`}
          >
            <span className="text-fg">{who}</span>
            <span className="font-mono text-fg">{px}</span>
            <span
              className={`font-mono text-[10px] uppercase tracking-wider ${
                state === "live" ? "text-data" : "text-muted line-through"
              }`}
            >
              {state}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3 text-[11px] text-muted">
        Best quote auto-selected · settles through atomic DvP
      </div>
    </div>
  );
}

const TABS = [
  {
    key: "terminal",
    label: "Terminal",
    desc: "Place orders, monitor markets, manage positions, and track settlement in one private interface. Real-time orderbook data, agent-driven execution, and DvP workflows — all in one place.",
    Preview: TerminalPreview,
  },
  {
    key: "swap",
    label: "Swap",
    desc: "Exchange assets in two clicks through Canton-native atomic DvP. Deterministic, rollback-protected, and pool-free.",
    Preview: SwapPreview,
  },
  {
    key: "rfq",
    label: "RFQ",
    desc: "Negotiate quotes privately for bilateral and block trades. Agents compute pricing, validate balances, and respond in real time — settlement runs through the same atomic flow.",
    Preview: RfqPreview,
  },
] as const;

export function HeroOrderbook() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_60px_-30px_rgba(0,0,0,0.4)]">
      <TerminalPreview />
    </div>
  );
}

export function ProductTabs() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const { Preview, desc } = TABS[active];

  return (
    <div className="mt-12">
      {/* tab triggers */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((t, i) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className={`cursor-pointer rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
              active === i
                ? "border-accent/40 bg-accent/10 text-accent"
                : "border-line text-muted hover:border-accent/30 hover:text-fg"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid items-center gap-8 lg:grid-cols-2">
        {/* framed preview — crossfades on tab switch */}
        <div className="relative min-h-72 overflow-hidden rounded-2xl border border-line bg-surface">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <Preview />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* copy */}
        <div>
          <h3 className="display text-2xl text-fg sm:text-3xl">{TABS[active].label}</h3>
          <p className="mt-4 text-lg leading-relaxed text-muted">{desc}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- sticky CTA pill */

export function StickyAppPill() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setShow(max > 0 && window.scrollY / max > 0.5);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? undefined : { opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.28, ease: EASE }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Link
            href="/app"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white shadow-[0_16px_40px_-12px_rgba(214,68,143,0.6)] transition-colors hover:bg-accent-hover"
          >
            Open the app
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
