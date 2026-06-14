"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/*
  Interactive strategy simulator (Agents → Playground).
  Two panels: controls (left) drive a clearly-labeled mock market (right) —
  schematic orderbook + price line + event feed. No real data, no funds.
  Export produces the exact agent.toml + CLI from the chosen parameters —
  the bridge to Build. Falls back to a static snapshot under reduced-motion.
*/

type Strategy = "grid" | "market_making";

const STRATS: { id: Strategy; label: string }[] = [
  { id: "grid", label: "Grid" },
  { id: "market_making", label: "Market making" },
];

const N_POINTS = 44;

export function StrategySimulator() {
  const reduce = useReducedMotion();

  const [strategy, setStrategy] = useState<Strategy>("grid");
  const [spread, setSpread] = useState(0.4); // %
  const [levels, setLevels] = useState(6);
  const [size, setSize] = useState(250);
  const [showExport, setShowExport] = useState(false);

  // Mock price walk (browser-only; deterministic feel via bounded random walk).
  const [series, setSeries] = useState<number[]>(() =>
    Array.from({ length: N_POINTS }, () => 50),
  );
  const [flash, setFlash] = useState<{ side: "ask" | "bid"; level: number } | null>(null);
  const [events, setEvents] = useState<{ id: number; text: string; kind: "place" | "fill" | "settle" }[]>([
    { id: 0, text: `Placed ${6} levels around mid`, kind: "place" },
  ]);
  const evtId = useRef(1);

  // Stable per-level depth pattern (no fabricated prices — schematic widths).
  const depth = useMemo(
    () => Array.from({ length: 10 }, (_, i) => 0.4 + ((i * 37) % 60) / 100),
    [],
  );

  useEffect(() => {
    if (reduce) return;
    const tick = () => {
      setSeries((prev) => {
        const last = prev[prev.length - 1];
        const next = Math.max(20, Math.min(80, last + (Math.random() - 0.5) * 6));
        const up = next >= last;
        const lvl = Math.floor(Math.random() * Math.max(1, Math.min(levels, 4)));
        setFlash({ side: up ? "ask" : "bid", level: lvl });
        setEvents((e) => {
          const id = evtId.current++;
          const text = up
            ? `Filled ask · level ${lvl + 1}`
            : `Filled bid · level ${lvl + 1}`;
          const settle = id % 3 === 0;
          const list = [
            settle
              ? { id, text: "DvP settled on Canton", kind: "settle" as const }
              : { id, text, kind: "fill" as const },
            ...e,
          ].slice(0, 5);
          return list;
        });
        return [...prev.slice(1), next];
      });
    };
    const iv = setInterval(tick, 900);
    return () => clearInterval(iv);
  }, [reduce, levels]);

  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(null), 650);
    return () => clearTimeout(t);
  }, [flash]);

  // Re-log a "re-quote" when params change.
  useEffect(() => {
    setEvents((e) =>
      [{ id: evtId.current++, text: `Re-quoted: ${levels} levels`, kind: "place" as const }, ...e].slice(0, 5),
    );
  }, [strategy, spread, levels, size]);

  const points = useMemo(() => {
    const w = 100;
    const h = 40;
    return series
      .map((v, i) => {
        const x = (i / (series.length - 1)) * w;
        const y = h - ((v - 20) / 60) * h;
        return `${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ");
  }, [series]);

  const lastPt = useMemo(() => {
    const v = series[series.length - 1];
    return { x: 100, y: 40 - ((v - 20) / 60) * 40 };
  }, [series]);

  return (
    <div id="simulator" className="glass-strong overflow-hidden rounded-3xl">
      {/* Simulation banner — pinned */}
      <div className="flex items-center gap-2 border-b border-line bg-black/20 px-5 py-2.5 text-xs">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="font-medium text-fg">Simulation</span>
        <span className="text-muted">— no funds, no live orders, no risk</span>
      </div>

      <div className="grid md:grid-cols-[300px_1fr]">
        {/* Controls */}
        <div className="space-y-6 border-b border-line p-5 md:border-b-0 md:border-r">
          <Field label="Strategy">
            <div className="flex rounded-lg border border-line p-1">
              {STRATS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStrategy(s.id)}
                  className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    strategy === s.id ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </Field>

          <Slider label="Spread" value={`${spread.toFixed(1)}%`} min={0.1} max={2} step={0.1} val={spread} onChange={setSpread} />
          <Slider label="Price levels" value={`${levels}`} min={2} max={10} step={1} val={levels} onChange={(v) => setLevels(Math.round(v))} />
          <Slider label="Order size" value={`${size}`} min={50} max={1000} step={50} val={size} onChange={(v) => setSize(Math.round(v))} />

          <button
            onClick={() => setShowExport(true)}
            className="w-full rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover active:scale-[0.98] [transition-timing-function:var(--ease-out)]"
          >
            Export config
          </button>
        </div>

        {/* Visualization */}
        <div className="space-y-5 p-5">
          {/* Price line */}
          <div>
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-muted">CC-USDC · mock feed</span>
              <span className="font-mono text-data">
                {STRATS.find((s) => s.id === strategy)!.label}
              </span>
            </div>
            <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="h-24 w-full">
              <polyline points={points} fill="none" stroke="var(--data)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
              <circle cx={lastPt.x} cy={lastPt.y} r="1.4" fill="var(--data)" />
            </svg>
          </div>

          {/* Schematic orderbook ladder */}
          <div className="grid grid-cols-2 gap-4">
            <Ladder side="ask" levels={levels} depth={depth} strategy={strategy} flash={flash} />
            <Ladder side="bid" levels={levels} depth={depth} strategy={strategy} flash={flash} />
          </div>

          {/* Event feed */}
          <div className="rounded-xl border border-line bg-black/20 p-3 font-mono text-[11px]">
            <AnimatePresence initial={false}>
              {events.map((e) => (
                <motion.div
                  key={e.id}
                  initial={reduce ? false : { opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-2 py-0.5"
                >
                  <span
                    className={`inline-block h-1 w-1 rounded-full ${
                      e.kind === "settle" ? "bg-data" : e.kind === "fill" ? "bg-[#34d399]" : "bg-muted"
                    }`}
                  />
                  <span className={e.kind === "settle" ? "text-data" : "text-muted"}>{e.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showExport && (
          <ExportModal
            strategy={strategy}
            spread={spread}
            levels={levels}
            size={size}
            onClose={() => setShowExport(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-xs uppercase tracking-wider text-muted">{label}</div>
      {children}
    </div>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  val,
  onChange,
}: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  val: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="uppercase tracking-wider text-muted">{label}</span>
        <span className="font-mono text-fg">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={val}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full [accent-color:var(--data)]"
      />
    </div>
  );
}

function Ladder({
  side,
  levels,
  depth,
  strategy,
  flash,
}: {
  side: "ask" | "bid";
  levels: number;
  depth: number[];
  strategy: Strategy;
  flash: { side: "ask" | "bid"; level: number } | null;
}) {
  const color = side === "ask" ? "bg-accent/30" : "bg-[#34d399]/35";
  const flashColor = side === "ask" ? "bg-accent/70" : "bg-[#34d399]/80";
  const rows = Array.from({ length: levels }, (_, i) => i);
  // Market making clusters tighter near mid; grid spreads evenly.
  const widthFor = (i: number) =>
    strategy === "market_making"
      ? Math.max(0.25, depth[i % depth.length] - i * 0.05)
      : depth[i % depth.length];
  return (
    <div className={`space-y-1 ${side === "ask" ? "" : ""}`}>
      <div className="text-[10px] uppercase tracking-wider text-muted">{side === "ask" ? "Asks" : "Bids"}</div>
      {rows.map((i) => {
        const isFlash = flash?.side === side && flash.level === i;
        return (
          <div
            key={i}
            className={`h-1.5 origin-left rounded-sm transition-colors duration-200 ${isFlash ? flashColor : color}`}
            style={{ width: `${Math.min(widthFor(i), 1) * 100}%` }}
          />
        );
      })}
    </div>
  );
}

function ExportModal({
  strategy,
  spread,
  levels,
  size,
  onClose,
}: {
  strategy: Strategy;
  spread: number;
  levels: number;
  size: number;
  onClose: () => void;
}) {
  const toml = `# agent.toml — generated from your simulation
market = "CC/USDC"
strategy = "${strategy}"
spread_percent = ${spread.toFixed(1)}
levels = ${levels}
size = ${size}`;
  const cli = `silvana agent run --config agent.toml`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="glass-strong w-full max-w-lg rounded-3xl p-6"
      >
        <div className="flex items-center justify-between">
          <h3 className="display text-lg text-fg">Run it for real</h3>
          <button onClick={onClose} aria-label="Close" className="text-muted hover:text-fg">
            ✕
          </button>
        </div>
        <p className="mt-1 text-sm text-muted">
          Your exact configuration — drop it into the SDK and go live.
        </p>
        <Copyable label="agent.toml" code={toml} />
        <Copyable label="CLI" code={cli} />
      </motion.div>
    </motion.div>
  );
}

function Copyable({ label, code }: { label: string; code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="mt-4">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-muted">{label}</span>
        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            } catch {}
          }}
          className="text-xs text-muted hover:text-fg"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto rounded-lg border border-line bg-black/30 p-3 font-mono text-[12px] leading-relaxed text-fg">
        <code>{code}</code>
      </pre>
    </div>
  );
}
