"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";

/*
  Bento mini-UIs, styled as product *screenshots*: each sits in a small app
  window (chrome bar + content). All copy and numeric values are taken verbatim
  from content/HomePage.md (Card 1–6 mini-UI specs, all marked [UI data filler]).
  Animations are transform/opacity only and freeze under prefers-reduced-motion.
*/

// ── window chrome ──────────────────────────────────────────────────────────
function Screen({
  title,
  children,
  className = "",
  bleed = false,
}: {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  // when true the screen runs off the right edge of the card and dissolves
  // there (blur + fade), as if the interface continues beyond the frame
  bleed?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden border border-white/10 bg-[#0b0b12] shadow-[0_24px_48px_-28px_rgba(0,0,0,0.9)] ${
        bleed ? "-mr-6 rounded-l-xl border-r-0" : "rounded-xl"
      } ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-white/[0.07] bg-white/[0.03] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[#ff5f57]/80" />
        <span className="h-2 w-2 rounded-full bg-[#febc2e]/80" />
        <span className="h-2 w-2 rounded-full bg-[#28c840]/80" />
        {title && (
          <span className="ml-2 truncate font-mono text-[10px] text-muted">
            {title}
          </span>
        )}
      </div>
      <div className="p-3 font-mono text-[11px] leading-relaxed">{children}</div>

      {/* right-edge dissolve: progressive blur (stacked layers of increasing
          radius, each masked to start further right) so the blur ramps up
          smoothly with no hard seam, plus a gentle colour fade into the bg */}
      {bleed && (
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24">
          {([
            [1, "0%"],
            [2, "28%"],
            [4, "50%"],
            [8, "70%"],
          ] as const).map(([blur, start], i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
                maskImage: `linear-gradient(to right, transparent ${start}, #000 100%)`,
                WebkitMaskImage: `linear-gradient(to right, transparent ${start}, #000 100%)`,
              }}
            />
          ))}
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, transparent, var(--bg) 96%)" }}
          />
        </div>
      )}
    </div>
  );
}

// ── Card 1 · trading terminal orderbook ─────────────────────────────────────
// Styling mirrors the real Silvana terminal (order-book/terminal_v2): tabbed
// header, Price/Qty/Total columns, depth bars, bull(teal)/bear(soft-red) rows,
// spread last-price chip and a bid/ask ratio bar. Values are canonical [filler].
const BULL = "#39bdac";
const BEAR = "#ff8b8b";

const ASKS: [string, number][] = [
  ["0.9423", 1540],
  ["0.9420", 2100],
  ["0.9418", 990],
  ["0.9416", 1210],
  ["0.9415", 760],
];
const BIDS: [string, number][] = [
  ["0.9412", 1250],
  ["0.9410", 3400],
  ["0.9408", 880],
  ["0.9406", 1020],
  ["0.9404", 640],
];
// recent trades for the Trades tab: [price, amount, time, side]
const TRADES: [string, number, string, "buy" | "sell"][] = [
  ["0.9413", 320, "12:30:45", "buy"],
  ["0.9412", 150, "12:30:41", "sell"],
  ["0.9414", 980, "12:30:38", "buy"],
  ["0.9411", 540, "12:30:33", "sell"],
  ["0.9413", 210, "12:30:29", "buy"],
  ["0.9410", 760, "12:30:24", "sell"],
];

// keep qty changes plausible: jitter ±30%, never below a floor
const jitter = (q: number) => Math.max(120, Math.round(q * (0.7 + Math.random() * 0.6)));
const clockStr = () =>
  new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

export function LiveOrderbook() {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<"orderbook" | "trades">("orderbook");
  const [selected, setSelected] = useState<string | null>(null);

  // live-activity state (initialised from the static book so SSR is stable)
  const [asks, setAsks] = useState(ASKS);
  const [bids, setBids] = useState(BIDS);
  const [last, setLast] = useState<{ price: string; dir: "up" | "down" }>({
    price: "0.9413",
    dir: "up",
  });
  const [trades, setTrades] = useState(TRADES);
  // per-price flash, with direction (up = size grew → teal, down → red)
  const [flashes, setFlashes] = useState<Record<string, "up" | "down">>({});

  // refs so the (stable) sim loop always reads the freshest book/best prices
  const asksRef = useRef(asks);
  const bidsRef = useRef(bids);
  asksRef.current = asks;
  bidsRef.current = bids;

  // simulate market activity. Updates arrive in irregular bursts (not a fixed
  // metronome), bias toward the levels near the spread, and trades actually
  // consume liquidity off the best bid/ask while the last price follows them.
  useEffect(() => {
    if (reduce) return;
    let timer: ReturnType<typeof setTimeout>;

    const flash = (price: string, dir: "up" | "down") => {
      setFlashes((f) => ({ ...f, [price]: dir }));
      setTimeout(
        () =>
          setFlashes((f) => {
            const n = { ...f };
            delete n[price];
            return n;
          }),
        420,
      );
    };

    // index biased toward the spread: asks → high index, bids → low index
    const nearSpreadIdx = (side: "ask" | "bid") => {
      const skew = Math.floor(Math.pow(Math.random(), 1.8) * 5); // 0 most likely
      return side === "ask" ? 4 - skew : skew;
    };

    const reprice = (price: string, q: number, refill: boolean) => {
      // small frequent tweaks, occasional larger refills
      const factor = refill ? 1.3 + Math.random() * 0.8 : 0.82 + Math.random() * 0.34;
      return { q: Math.max(120, Math.round(q * factor)), up: factor >= 1 };
    };

    const tick = () => {
      // 1–3 resting-order updates this burst
      const n = 1 + (Math.random() < 0.6 ? 1 : 0) + (Math.random() < 0.25 ? 1 : 0);
      for (let k = 0; k < n; k++) {
        const side = Math.random() > 0.5 ? "ask" : "bid";
        const idx = nearSpreadIdx(side);
        const refill = Math.random() < 0.3;
        const setter = side === "ask" ? setAsks : setBids;
        setter((p) =>
          p.map((r, i) => {
            if (i !== idx) return r;
            const { q, up } = reprice(r[0], r[1], refill);
            flash(r[0], up ? "up" : "down");
            return [r[0], q];
          }),
        );
      }

      // ~55% of bursts include a market trade that lifts the best ask (buy)
      // or hits the best bid (sell), consuming some size at that level
      if (Math.random() < 0.55) {
        const buy = Math.random() > 0.5;
        const book = buy ? asksRef.current : bidsRef.current;
        const bestIdx = buy ? 4 : 0; // best ask = last ask row, best bid = first bid row
        const px = book[bestIdx][0];
        const fill = Math.round(60 + Math.random() * 420);
        const setter = buy ? setAsks : setBids;
        setter((p) =>
          p.map((r, i) =>
            i === bestIdx ? [r[0], Math.max(120, r[1] - fill)] : r,
          ),
        );
        flash(px, "down");
        setLast({ price: px, dir: buy ? "up" : "down" });
        setTrades((prev) =>
          [
            [px, fill, clockStr(), buy ? "buy" : "sell"] as [
              string,
              number,
              string,
              "buy" | "sell",
            ],
            ...prev,
          ].slice(0, 6),
        );
      }

      // schedule the next burst at an organic, uneven interval
      timer = setTimeout(tick, 280 + Math.random() * 720);
    };

    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [reduce]);

  const total = (p: string, q: number) => parseFloat(p) * q;
  const maxTotal = Math.max(
    ...asks.map(([p, q]) => total(p, q)),
    ...bids.map(([p, q]) => total(p, q)),
  );
  const fmt = (n: number) => Math.round(n).toLocaleString("en-US");
  const bidQty = bids.reduce((s, [, q]) => s + q, 0);
  const askQty = asks.reduce((s, [, q]) => s + q, 0);
  const bidPct = (bidQty / (bidQty + askQty)) * 100;

  const Row = ({
    price,
    qty,
    side,
  }: {
    price: string;
    qty: number;
    side: "ask" | "bid";
  }) => (
    <button
      type="button"
      onClick={() => setSelected(price)}
      title="Click to fill price"
      className="relative grid w-full cursor-pointer grid-cols-3 px-3 py-0.5 text-left transition-colors duration-300 hover:bg-white/[0.04]"
      style={{
        background:
          selected === price
            ? "rgba(255,255,255,0.06)"
            : flashes[price] === "up"
              ? "rgba(57,189,172,0.16)"
              : flashes[price] === "down"
                ? "rgba(255,139,139,0.16)"
                : undefined,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 transition-[width] duration-300 ease-out"
        style={{
          width: `${(total(price, qty) / maxTotal) * 100}%`,
          background: side === "bid" ? "rgba(57,189,172,0.1)" : "rgba(255,139,139,0.1)",
        }}
      />
      <span
        className="relative z-10 tabular-nums"
        style={{ color: side === "bid" ? BULL : BEAR }}
      >
        {price}
      </span>
      <span className="relative z-10 text-right tabular-nums text-fg">{fmt(qty)}</span>
      <span className="relative z-10 text-right tabular-nums text-muted">
        {fmt(total(price, qty))}
      </span>
    </button>
  );

  const Tab = ({ id, label }: { id: typeof tab; label: string }) => (
    <button
      type="button"
      onClick={() => setTab(id)}
      className={`cursor-pointer font-medium transition-colors ${
        tab === id ? "text-fg" : "text-muted hover:text-fg"
      }`}
    >
      {label}
    </button>
  );

  return (
    <Screen title="Silvana Terminal — CC-USDC">
      {/* tabs header */}
      <div className="-mx-3 -mt-3 mb-2 flex items-center gap-4 border-b border-white/[0.07] px-3 py-2">
        <Tab id="orderbook" label="Order Book" />
        <Tab id="trades" label="Trades" />
      </div>

      {/* column headers */}
      <div className="grid grid-cols-3 px-3 pb-1 text-[10px] text-muted">
        <span>Price (USDC)</span>
        <span className="text-right">{tab === "trades" ? "Amount" : "Qty (CC)"}</span>
        <span className="text-right">{tab === "trades" ? "Time" : "Total"}</span>
      </div>

      {/* The Order Book always occupies the layout (sets the height); the Trades
          view overlays the same box so switching tabs never reflows the card. */}
      <div className="relative">
        <div className={tab === "trades" ? "invisible" : ""} aria-hidden={tab === "trades"}>
          {asks.map(([p, q]) => (
            <Row key={p} price={p} qty={q} side="ask" />
          ))}

          {/* spread / last price — ticks live with a directional flash */}
          <div className="-mx-3 my-1 border-y border-white/[0.07] bg-white/[0.05] px-3 py-1.5">
            <div className="flex items-baseline justify-between">
              <motion.span
                key={last.price}
                initial={reduce ? false : { opacity: 0.35 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-1 text-sm font-semibold tabular-nums"
                style={{ color: last.dir === "up" ? BULL : BEAR }}
              >
                {last.dir === "up" ? "▲" : "▼"} {last.price}
              </motion.span>
              <span className="text-[10px] tabular-nums text-muted">
                {selected ? `selected ${selected}` : `$${last.price}`}
              </span>
            </div>
          </div>

          {bids.map(([p, q]) => (
            <Row key={p} price={p} qty={q} side="bid" />
          ))}

          {/* bid / ask ratio bar */}
          <div className="-mx-3 mt-1 border-t border-white/[0.07] px-3 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-muted">B</span>
              <div className="relative h-1.5 min-w-0 flex-1 overflow-hidden rounded-full">
                <div className="absolute inset-y-0 left-0" style={{ width: `${bidPct}%`, background: BULL }} />
                <div className="absolute inset-y-0 right-0" style={{ width: `${100 - bidPct}%`, background: BEAR }} />
              </div>
              <span className="tabular-nums" style={{ color: BULL }}>{bidPct.toFixed(1)}%</span>
              <span className="tabular-nums" style={{ color: BEAR }}>{(100 - bidPct).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {tab === "trades" && (
          <div className="absolute inset-0 mt-0.5">
            {trades.map(([p, a, t, side], i) => (
              <motion.div
                key={`${t}-${i}`}
                initial={reduce || i !== 0 ? false : { opacity: 0, backgroundColor: "rgba(255,255,255,0.08)" }}
                animate={{ opacity: 1, backgroundColor: "rgba(255,255,255,0)" }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-3 px-3 py-0.5"
              >
                <span className="tabular-nums" style={{ color: side === "buy" ? BULL : BEAR }}>
                  {p}
                </span>
                <span className="text-right tabular-nums text-fg">{fmt(a)}</span>
                <span className="text-right tabular-nums text-muted">{t}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* canonical toast + settlement chip (HomePage.md) */}
      <div className="mt-3 flex flex-wrap gap-2">
        <motion.span
          className="inline-flex items-center gap-1 rounded-md px-2 py-0.5"
          style={{ background: "rgba(57,189,172,0.15)", color: BULL }}
          animate={reduce ? undefined : { opacity: [0.55, 1, 0.55] }}
          transition={
            reduce ? undefined : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
          }
        >
          ✓ Matched in 0.4s
        </motion.span>
        <span className="inline-flex items-center gap-1 rounded-md bg-data/15 px-2 py-0.5 text-data">
          DvP settled on Canton
        </span>
      </div>
    </Screen>
  );
}

// ── small code-editor helpers ───────────────────────────────────────────────
function CodeBlock({ lines }: { lines: ReactNode[] }) {
  return (
    <div className="flex">
      <div className="select-none pr-3 text-right text-muted/40">
        {lines.map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>
      <div className="min-w-0 flex-1">{lines}</div>
    </div>
  );
}

// ── Card 2 · agent.toml in an editor + status bar ───────────────────────────
export function AgentRunning() {
  const reduce = useReducedMotion();
  const lines = [
    <div key="m">
      <span className="text-fg/80">market</span>
      <span className="text-muted"> = </span>
      <span className="text-data">&quot;CC/USDC&quot;</span>
    </div>,
    <div key="d">
      <span className="text-fg/80">delta_percent</span>
      <span className="text-muted"> = </span>
      <span className="text-[#e0a96d]">0.4</span>
    </div>,
    <div key="l">
      <span className="text-fg/80">levels</span>
      <span className="text-muted"> = </span>
      <span className="text-[#e0a96d]">6</span>
    </div>,
    <div key="s">
      <span className="text-fg/80">size</span>
      <span className="text-muted"> = </span>
      <span className="text-[#e0a96d]">250</span>
    </div>,
  ];
  return (
    <Screen title="agent.toml" className="flex flex-col" bleed>
      <CodeBlock lines={lines} />
      <AgentStatusBar reduce={!!reduce} />
    </Screen>
  );
}

// live status bar: ticking uptime + a growing "orders managed" counter that
// flashes on each fill. Starts from the canonical 14h / 312 (HomePage.md).
function AgentStatusBar({ reduce }: { reduce: boolean }) {
  const [orders, setOrders] = useState(312);
  const [mins, setMins] = useState(14 * 60); // 14h
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setOrders((o) => o + 1 + (Math.random() < 0.3 ? 1 : 0));
      setMins((m) => m + 1);
      setBump(true);
      setTimeout(() => setBump(false), 400);
    }, 2600);
    return () => clearInterval(id);
  }, [reduce]);

  const uptime = `${Math.floor(mins / 60)}h ${String(mins % 60).padStart(2, "0")}m`;

  return (
    <div className="-mx-3 -mb-3 mt-3 flex items-center gap-2 border-t border-line bg-white/[0.03] px-3 py-2 text-fg">
      <motion.span
        className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
        animate={reduce ? undefined : { opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
        transition={
          reduce ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <span>Running</span>
      <span className="text-muted">· {uptime} uptime · </span>
      <motion.span
        className="tabular-nums"
        animate={bump ? { color: ["#39bdac", "var(--muted)"] } : undefined}
        transition={{ duration: 0.4 }}
        style={{ color: "var(--muted)" }}
      >
        {orders.toLocaleString("en-US")}
      </motion.span>
      <span className="text-muted">orders managed</span>
    </div>
  );
}

// ── Card 4 · API code editor with Rust / TypeScript tabs ────────────────────
export function ApiFlow() {
  const reduce = useReducedMotion();
  const [lang, setLang] = useState<"rust" | "ts">("ts");
  const code: Record<typeof lang, ReactNode[]> = {
    ts: [
      <Line key="0" kw="const" name="p" fn="prepare" arg="tx" await />,
      <Line key="1" kw="const" name="s" fn="sign" arg="p" await />,
      <Line key="2" kw="const" name="updateId" fn="execute" arg="s" await />,
    ],
    rust: [
      <Line key="0" kw="let" name="p" fn="prepare" arg="tx" rust />,
      <Line key="1" kw="let" name="s" fn="sign" arg="p" rust noAwait />,
      <Line key="2" kw="let" name="update_id" fn="execute" arg="s" rust />,
    ],
  };
  const tabs: { id: typeof lang; label: string }[] = [
    { id: "rust", label: "Rust" },
    { id: "ts", label: "TypeScript" },
  ];
  return (
    <Screen
      title={
        <span className="flex gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setLang(t.id);
              }}
              className={`rounded px-1.5 py-0.5 text-[10px] transition-colors ${
                lang === t.id ? "bg-data/15 text-data" : "text-muted hover:text-fg"
              }`}
            >
              {t.label}
            </button>
          ))}
        </span>
      }
      bleed
    >
      <CodeBlock
        lines={code[lang].map((line, i) => (
          <motion.div
            key={`${lang}-${i}`}
            className="flex items-center"
            animate={reduce ? undefined : { opacity: [0.45, 1, 0.45] }}
            transition={
              reduce
                ? undefined
                : { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.9 }
            }
          >
            {line}
            {/* blinking caret on the last line, like a live editor */}
            {i === 2 && (
              <motion.span
                className="ml-0.5 inline-block h-3 w-[2px] bg-data"
                animate={reduce ? undefined : { opacity: [1, 0, 1] }}
                transition={reduce ? undefined : { duration: 1.1, repeat: Infinity, ease: "linear" }}
              />
            )}
          </motion.div>
        ))}
      />
    </Screen>
  );
}

// one highlighted line: `const x = await fn(arg);`  /  `let x = fn(arg).await?;`
function Line({
  kw,
  name,
  fn,
  arg,
  await: aw,
  rust,
  noAwait,
}: {
  kw: string;
  name: string;
  fn: string;
  arg: string;
  await?: boolean;
  rust?: boolean;
  noAwait?: boolean;
}) {
  return (
    <div className="whitespace-nowrap">
      <span className="text-accent">{kw}</span>{" "}
      <span className="text-fg">{name}</span>
      <span className="text-muted"> = </span>
      {aw && <span className="text-accent">await </span>}
      <span className="text-data">{fn}</span>
      <span className="text-muted">(</span>
      <span className="text-fg/80">{arg}</span>
      <span className="text-muted">)</span>
      {rust && !noAwait && <span className="text-accent">.await</span>}
      {rust && <span className="text-muted">?</span>}
      <span className="text-muted">;</span>
    </div>
  );
}

// ── Card 3 · interactive swap playground ────────────────────────────────────
// Styling and tokens mirror the real Silvana swap (order-book/widgets/swap):
// only CC and USDC, with their real icons. Fully interactive inline: pick a
// token, edit the pay amount, flip direction, run a confirm. The canonical rate
// (1 CC = 0.4125 USDC) gives the default 1,000 CC → 412.50 USDC.
type Sym = "CC" | "USDC";
const TOKENS: Sym[] = ["CC", "USDC"];
const TOKEN_ICON: Record<Sym, string> = {
  CC: "/tokens/cc.svg",
  USDC: "/tokens/usdc.png",
};
const CC_USDC_RATE = 0.4125;

function TokenIcon({ sym, size = 20 }: { sym: Sym; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={TOKEN_ICON[sym]}
      alt={sym}
      width={size}
      height={size}
      className="shrink-0 rounded-full object-contain"
      style={{ width: size, height: size }}
    />
  );
}

function TokenSelect({
  sym,
  open,
  onToggle,
  onPick,
}: {
  sym: Sym;
  open: boolean;
  onToggle: () => void;
  onPick: (t: Sym) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const toggle = () => {
    if (ref.current) setRect(ref.current.getBoundingClientRect());
    onToggle();
  };

  return (
    <>
      <button
        ref={ref}
        type="button"
        onClick={toggle}
        className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 text-fg transition-colors hover:bg-white/10"
      >
        <TokenIcon sym={sym} />
        {sym}
        <span className="text-[#8D9099]">▾</span>
      </button>

      {/* dropdown is portalled to <body> so it floats above every card/overflow */}
      {open &&
        rect &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <div className="fixed inset-0 z-[90]" onClick={onToggle} aria-hidden />
            <div
              className="fixed z-[100] w-36 rounded-xl border border-white/10 bg-[#0E111A] p-1 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.85)]"
              style={{ top: rect.bottom + 6, left: rect.left }}
            >
              {TOKENS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => onPick(t)}
                  className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-white/5 ${
                    t === sym ? "text-data" : "text-fg"
                  }`}
                >
                  <TokenIcon sym={t} size={18} />
                  {t}
                </button>
              ))}
            </div>
          </>,
          document.body,
        )}
    </>
  );
}

function groupInt(raw: string) {
  const [int, dec] = raw.split(".");
  const grouped = Number(int || "0").toLocaleString("en-US");
  return dec !== undefined ? `${grouped}.${dec}` : grouped;
}

export function SwapPreview() {
  const reduce = useReducedMotion();
  const [payToken, setPayToken] = useState<Sym>("CC");
  const [payRaw, setPayRaw] = useState("1000");
  const [status, setStatus] = useState<"idle" | "confirming" | "settled">("idle");
  const [openSel, setOpenSel] = useState<"pay" | "receive" | null>(null);

  const receiveToken: Sym = payToken === "CC" ? "USDC" : "CC";
  const payNum = parseFloat(payRaw || "0") || 0;
  const receiveNum =
    payToken === "CC" ? payNum * CC_USDC_RATE : payNum / CC_USDC_RATE;
  const receiveStr = receiveNum.toLocaleString("en-US", {
    minimumFractionDigits: receiveToken === "USDC" ? 2 : 0,
    maximumFractionDigits: 2,
  });
  const rate = payToken === "CC" ? CC_USDC_RATE : 1 / CC_USDC_RATE;
  const rateStr = `1 ${payToken} = ${rate.toLocaleString("en-US", {
    maximumFractionDigits: 4,
  })} ${receiveToken}`;

  // only two tokens, so receive is always the opposite of pay.
  const other = (t: Sym): Sym => (t === "CC" ? "USDC" : "CC");
  const pickPay = (t: Sym) => {
    setPayToken(t);
    setOpenSel(null);
    setStatus("idle");
  };
  const pickReceive = (t: Sym) => {
    setPayToken(other(t)); // making receive = t means pay = the opposite
    setOpenSel(null);
    setStatus("idle");
  };

  const flip = () => {
    setPayToken(receiveToken);
    // carry the value across so the swap reads naturally
    setPayRaw(receiveNum ? String(Number(receiveNum.toFixed(2))) : "");
    setStatus("idle");
  };

  const confirm = () => {
    if (status !== "idle") return;
    setStatus("confirming");
    setTimeout(() => setStatus("settled"), 1400);
    setTimeout(() => setStatus("idle"), 3400);
  };

  return (
    <Screen title="Swap">
      <div className="relative flex flex-col gap-2.5">
        {/* You pay — editable */}
        <section className="flex flex-col rounded-xl bg-[#181A22] px-3 pt-3 pb-4">
          <span className="text-[11px] font-medium text-[rgba(236,236,237,0.6)]">
            You pay
          </span>
          <div className="mt-2 flex items-center justify-between gap-3">
            <TokenSelect
              sym={payToken}
              open={openSel === "pay"}
              onToggle={() => setOpenSel(openSel === "pay" ? null : "pay")}
              onPick={pickPay}
            />
            <input
              type="text"
              inputMode="decimal"
              value={groupInt(payRaw)}
              onChange={(e) => {
                setPayRaw(e.target.value.replace(/[^0-9.]/g, ""));
                setStatus("idle");
              }}
              placeholder="0"
              className="w-0 min-w-0 flex-1 bg-transparent text-right text-[20px] font-bold tabular-nums text-fg outline-none placeholder:text-[#8D9099]"
            />
          </div>
        </section>

        {/* You receive — derived */}
        <section className="flex flex-col rounded-xl bg-[#181A22] px-3 pt-3 pb-4">
          <span className="text-[11px] font-medium text-[rgba(236,236,237,0.6)]">
            You receive
          </span>
          <div className="mt-2 flex items-center justify-between gap-3">
            <TokenSelect
              sym={receiveToken}
              open={openSel === "receive"}
              onToggle={() => setOpenSel(openSel === "receive" ? null : "receive")}
              onPick={pickReceive}
            />
            <span className="truncate text-[20px] font-bold tabular-nums text-fg">
              {receiveStr}
            </span>
          </div>
        </section>

        {/* working direction button */}
        <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
          <motion.button
            type="button"
            onClick={flip}
            aria-label="Swap pay and receive"
            whileTap={{ scale: 0.9 }}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#181A22] text-fg shadow-[0_0_0_4px_#0b0b12] transition-transform hover:scale-110"
          >
            ↓
          </motion.button>
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1 rounded-md bg-data/15 px-2 py-0.5 text-data">
          Atomic DvP
        </span>
        <span className="truncate text-[10px] text-muted">{rateStr}</span>
      </div>

      {/* interactive confirm button */}
      <button
        type="button"
        onClick={confirm}
        disabled={status !== "idle" || payNum <= 0}
        className={`mt-2.5 flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-full text-[13px] font-semibold transition-colors ${
          status === "settled"
            ? "bg-data/15 text-data"
            : payNum <= 0
              ? "bg-accent/10 text-accent/40"
              : "bg-accent text-white hover:opacity-90 active:scale-[0.98]"
        }`}
      >
        {status === "confirming" && (
          <motion.span
            className="inline-block h-3.5 w-3.5 rounded-full border-2 border-white/40 border-t-white"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={reduce ? undefined : { duration: 0.9, repeat: Infinity, ease: "linear" }}
          />
        )}
        {status === "idle" && "Confirm swap"}
        {status === "confirming" && "Confirming…"}
        {status === "settled" && "✓ Settled · DvP on Canton"}
      </button>
    </Screen>
  );
}

// ── Card 5 · zk-proof result panel ──────────────────────────────────────────
export function ProofCard() {
  const reduce = useReducedMotion();
  return (
    <Screen title="Proof" bleed>
      <div className="flex items-start gap-3">
        <motion.div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-data/12 text-data"
          // periodic re-verify glow pulse
          animate={reduce ? undefined : { boxShadow: ["0 0 0 0 rgba(25,200,176,0)", "0 0 0 4px rgba(25,200,176,0.18)", "0 0 0 0 rgba(25,200,176,0)"] }}
          transition={reduce ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* shield-check */}
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" strokeLinejoin="round" />
            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        <div className="min-w-0">
          <div className="text-[12px] text-fg">Trade activity proof</div>
          <motion.div
            className="mt-1 inline-flex items-center gap-1 rounded-md bg-[#34d399]/15 px-2 py-0.5 text-[#34d399]"
            animate={reduce ? undefined : { opacity: [1, 0.55, 1] }}
            transition={reduce ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            Verified ✓
          </motion.div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-line pt-2 text-fg">
        <span className="text-muted">Orders revealed</span>
        <span className="tabular-nums">0</span>
      </div>
    </Screen>
  );
}

// ── Card 6 · EarnHub leaderboard ────────────────────────────────────────────
// EarnHub leaderboard window: fixed competitors + the user's live row. Points
// tick up; when the user overtakes a neighbour the list re-sorts and the rank
// label drops — a coherent, climbing leaderboard. Top shown row is #9 (filler).
// 4-row window: one rival above the user, two below (user starts #12, [filler])
const BASE_RANK = 11;
const START_INDEX = 1; // user's position among the shown rows at start
const FIELD: { name: string; pts: number; bg: string }[] = [
  { name: "0x7B…9c", pts: 5030, bg: "#eab308" },
  { name: "0x4D…1a", pts: 4610, bg: "#06b6d4" },
  { name: "loop.dao", pts: 4120, bg: "#f97316" },
];

export function LiveLeaderboard() {
  const reduce = useReducedMotion();
  const [pts, setPts] = useState(4820);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setPts((p) => p + Math.round(8 + Math.random() * 48));
      setFlash(true);
      setTimeout(() => setFlash(false), 450);
    }, 2200);
    return () => clearInterval(id);
  }, [reduce]);

  // merge the user into the field and sort to get live ranks
  const rows = [
    ...FIELD.map((f) => ({ ...f, you: false })),
    { name: "0x3E…b7", pts, bg: "linear-gradient(135deg,#d6448f,#19c8b0)", you: true },
  ].sort((a, b) => b.pts - a.pts);
  const myIndex = rows.findIndex((r) => r.you);
  const climbed = 3 + Math.max(0, START_INDEX - myIndex); // base ↑3, grows as you pass rivals

  return (
    <Screen
      title={
        <span className="flex w-full items-center justify-between gap-2">
          EarnHub
          <span className="rounded bg-data/15 px-1.5 py-0.5 text-[10px] text-data">
            Season 6
          </span>
        </span>
      }
      bleed
    >
      <div className="flex flex-col gap-0.5">
        {rows.map((r, i) => (
          <div
            key={r.name}
            className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${
              r.you ? "border border-accent/30 bg-accent/10 text-fg" : "text-muted"
            }`}
          >
            <span className="w-6 shrink-0 tabular-nums">#{BASE_RANK + i}</span>
            <span className="h-4 w-4 shrink-0 rounded-full" style={{ background: r.bg }} />
            <span className={`truncate ${r.you ? "font-medium text-fg" : ""}`}>
              {r.name}
            </span>
            {r.you && (
              <motion.span
                className="text-[#34d399]"
                animate={reduce ? undefined : { y: [0, -2, 0] }}
                transition={
                  reduce ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
                }
              >
                ↑{climbed}
              </motion.span>
            )}
            <motion.span
              className="ml-auto tabular-nums"
              animate={r.you && flash ? { color: ["#39bdac", "var(--data)"] } : undefined}
              transition={{ duration: 0.45 }}
              style={{ color: r.you ? "var(--data)" : undefined }}
            >
              {r.pts.toLocaleString("en-US")}
              {r.you ? " pts" : ""}
            </motion.span>
          </div>
        ))}
      </div>
    </Screen>
  );
}
