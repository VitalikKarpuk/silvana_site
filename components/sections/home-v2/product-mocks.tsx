"use client";

/* Light "app window" product mini-mockups shown inside the feature-showcase
   bento tiles. All motion is JS- or CSS-driven and reduced-motion gated. */

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { EASE } from "./shared";

const ASK = "#d8556e"; // soft red for asks, tuned for the light theme

// Shared light "app window" frame the product snippets render inside.
function MockScreen({
  title,
  children,
}: {
  title?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="rounded-xl border border-line bg-surface/95 shadow-[0_14px_34px_-22px_rgba(20,22,29,0.3)] backdrop-blur-sm">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-1.5">
        <span className="h-2 w-2 rounded-full bg-fg/15" />
        <span className="h-2 w-2 rounded-full bg-fg/15" />
        <span className="h-2 w-2 rounded-full bg-fg/15" />
        {title && (
          <span className="ml-2 flex-1 truncate font-mono text-[10px] text-muted">
            {title}
          </span>
        )}
      </div>
      <div className="p-3 font-mono text-[11px] leading-relaxed">{children}</div>
    </div>
  );
}

function BookMock() {
  const asks: [string, string, string][] = [
    ["0.9420", "1,540", "40%"],
    ["0.9418", "2,100", "62%"],
    ["0.9416", "990", "48%"],
  ];
  const bids: [string, string, string][] = [
    ["0.9412", "1,250", "66%"],
    ["0.9410", "3,400", "90%"],
    ["0.9408", "880", "44%"],
  ];
  const Row = ({ price, qty, w, ask, i }: { price: string; qty: string; w: string; ask?: boolean; i: number }) => (
    <div className="relative grid grid-cols-3 px-1 py-0.5">
      <span
        aria-hidden
        className="absolute inset-y-0 right-0 origin-right rounded-sm animate-[mock-bar_3.4s_ease-in-out_infinite]"
        style={{
          width: w,
          background: ask ? "rgba(216,85,110,0.10)" : "rgba(14,138,118,0.12)",
          animationDelay: `${i * 0.22 + (ask ? 0 : 0.3)}s`,
        }}
      />
      <span className="relative tabular-nums" style={{ color: ask ? ASK : "var(--data)" }}>
        {price}
      </span>
      <span className="relative text-right tabular-nums text-fg">{qty}</span>
      <span className="relative text-right tabular-nums text-muted">CC</span>
    </div>
  );
  return (
    <MockScreen title="Silvana Terminal — CC-USDC">
      <div className="relative">
        <div className="grid grid-cols-3 px-1 pb-1 text-[9px] text-muted">
          <span>Price</span>
          <span className="text-right">Qty</span>
          <span className="text-right">Total</span>
        </div>
        {asks.map(([p, q, w], i) => (
          <Row key={p} price={p} qty={q} w={w} i={i} ask />
        ))}
        <div
          className="my-1 flex items-center justify-between border-y border-line px-1 py-1 text-[12px] font-semibold tabular-nums"
          style={{ color: ASK }}
        >
          ▲ 0.9413
          <span className="text-[10px] font-normal text-muted">$0.9413</span>
        </div>
        {bids.map(([p, q, w], i) => (
          <Row key={p} price={p} qty={q} w={w} i={i} />
        ))}
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="rounded bg-data/12 px-1.5 py-0.5 text-data">5×5 depth</span>
          <span className="rounded bg-data/12 px-1.5 py-0.5 text-data">DvP on Canton</span>
        </div>

        {/* settlement toast — the event that surfaces after a fill settles */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-1 flex justify-center">
          <span className="flex items-center gap-1.5 rounded-lg border border-data/30 bg-surface px-2 py-1 text-[10px] text-fg shadow-[0_10px_24px_-12px_rgba(20,22,29,0.4)] animate-[mock-toast_5.5s_ease-in-out_infinite]">
            <span className="text-data">✓</span>
            Filled · settled in 0.4s
          </span>
        </div>
      </div>
    </MockScreen>
  );
}

type Fill = { id: number; side: "buy" | "sell"; qty: number; px: string };

// seed fills are static so server and first client render match (no hydration
// mismatch); the interval below only runs on the client.
const SEED_FILLS: Fill[] = [
  { id: 0, side: "buy", qty: 180, px: "0.9412" },
  { id: -1, side: "sell", qty: 120, px: "0.9415" },
  { id: -2, side: "buy", qty: 240, px: "0.9411" },
];

function makeFill(id: number): Fill {
  return {
    id,
    side: Math.random() > 0.5 ? "buy" : "sell",
    qty: Math.round((50 + Math.random() * 350) / 10) * 10,
    px: (0.9408 + Math.random() * 0.0009).toFixed(4),
  };
}

function AgentMock() {
  const reduce = useReducedMotion();
  const [orders, setOrders] = useState(312);
  const [mins, setMins] = useState(840); // 14h 00m
  const [fills, setFills] = useState<Fill[]>(SEED_FILLS);
  const nextId = useRef(1);

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      const burst = i % 3 === 0 ? 1 : 0; // occasional double fill
      setOrders((o) => o + 1 + burst);
      setMins((m) => m + 1);
      setFills((prev) => [makeFill(nextId.current++), ...prev].slice(0, 3));
    }, 2200);
    return () => clearInterval(id);
  }, [reduce]);

  const uptime = `${Math.floor(mins / 60)}h ${String(mins % 60).padStart(2, "0")}m`;
  const kv = (k: string, v: string, num?: boolean) => (
    <div>
      <span className="text-fg/80">{k}</span>
      <span className="text-muted"> = </span>
      <span className={num ? "text-amber-600" : "text-data"}>{v}</span>
    </div>
  );
  return (
    <MockScreen title="agent.toml">
      <div className="space-y-0.5">
        {kv("market", '"CC/USDC"')}
        {kv("delta_percent", "0.4", true)}
        {kv("levels", "6", true)}
        {kv("size", "250", true)}
      </div>

      {/* live fills the agent posts — newest slides in from the top */}
      <div className="-mx-3 mt-3 border-t border-line px-3 pt-2">
        <div className="mb-1 flex items-center justify-between text-[9px] uppercase tracking-[0.16em] text-muted">
          <span>Live fills</span>
          <span>qty · price</span>
        </div>
        <div className="space-y-0.5">
          {fills.map((f, idx) => (
            <motion.div
              key={f.id}
              initial={reduce || idx !== 0 ? false : { opacity: 0, y: -7 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="flex items-center justify-between tabular-nums"
            >
              <span
                className="font-medium"
                style={{ color: f.side === "buy" ? "var(--data)" : ASK }}
              >
                {f.side === "buy" ? "Buy" : "Sell"}
              </span>
              <span className="text-fg">
                {f.qty} <span className="text-muted">@</span> {f.px}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="-mx-3 -mb-3 mt-3 flex items-center gap-2 border-t border-line px-3 py-2 text-fg">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-[mock-dot_1.8s_ease-in-out_infinite]" />
        Running
        <span className="text-muted">· {uptime} · </span>
        <motion.span
          key={orders}
          initial={reduce ? false : { color: "var(--data)" }}
          animate={{ color: "var(--fg)" }}
          transition={{ duration: 0.5 }}
          className="tabular-nums"
        >
          {orders}
        </motion.span>
        <span className="text-muted">orders</span>
      </div>
    </MockScreen>
  );
}

// Self-running swap demo that mirrors the real order-book swap widget
// (src/widgets/swap/SwapBlock + shared/swap-ui): You pay / You receive cards
// with a token trigger, 25/50/Max chips, wallet balance, USD value, a circular
// direction button between the cards, and a rate row with the settlement fee.
// It types the amount, presses Swap, then runs the 3 settlement steps from
// order-book's settlementStepMapper. Gated behind prefers-reduced-motion.
type SwapPhase =
  | "idle"
  | "toToken"
  | "pickToken"
  | "toInput"
  | "typing"
  | "toButton"
  | "settling";

const SWAP_RATE = 0.080175; // 1,000 CC → 80.175 USDC (matches swap-data.ts)

// The real post-swap flow (from order-book: settlementStepMapper) — three
// settlement steps that complete in sequence after Swap is pressed.
const SETTLE_STEPS = [
  { label: "Counterparties confirmation", doing: "Confirming…", done: "Both parties confirmed" },
  { label: "Contract Sign", doing: "Creating DVP contract…", done: "DVP contract signed" },
  { label: "Token Allocation", doing: "Allocating tokens…", done: "Settlement complete" },
];

function TokenImg({ sym, className }: { sym: "CC" | "USDC"; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={sym === "CC" ? "/tokens/cc.svg" : "/tokens/usdc.png"}
      alt={sym}
      className={className ?? "h-4 w-4 rounded-full object-contain"}
    />
  );
}

function SwapTokenTrigger({ sym }: { sym: "CC" | "USDC" }) {
  return (
    <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface px-1.5 py-1 text-[12px] font-medium text-fg">
      <TokenImg sym={sym} />
      {sym}
      <span className="text-muted">▾</span>
    </span>
  );
}

// The two tokens shown in the selector modal (mirrors swap-data.ts).
const SWAP_TOKENS = [
  { sym: "CC" as const, admin: "0x7B…9c", bal: "50,323.43", usd: "$6.8M" },
  { sym: "USDC" as const, admin: "0x4D…1a", bal: "0", usd: "$0" },
];

function SwapMock() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<SwapPhase>("idle");
  const [pay, setPay] = useState("0");
  const [receiveToken, setReceiveToken] = useState<"USDC" | null>(null);
  const [modal, setModal] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [click, setClick] = useState(false); // cursor press scale
  const [step, setStep] = useState(0); // active settlement step; 3 = all done
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);

  const bodyRef = useRef<HTMLDivElement>(null);
  const tokenRef = useRef<HTMLSpanElement>(null);
  const payRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) {
      setPay("1,000");
      setReceiveToken("USDC");
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));

    // move the cursor to the center of an element, measured against the card
    const moveTo = (el: HTMLElement | null) => {
      const host = bodyRef.current;
      if (!el || !host) return;
      const r = el.getBoundingClientRect();
      const hr = host.getBoundingClientRect();
      setCursor({ x: r.left - hr.left + r.width / 2, y: r.top - hr.top + r.height / 2 });
    };
    const tap = () => {
      setClick(true);
      at(170, () => setClick(false));
    };

    const run = () => {
      setPhase("idle");
      setPay("0");
      setReceiveToken(null);
      setModal(false);
      setPressed(false);
      setStep(0);

      // 1 · open the token selector
      at(500, () => {
        setPhase("toToken");
        moveTo(tokenRef.current);
      });
      at(1150, tap);
      at(1300, () => {
        setModal(true);
        setPhase("pickToken");
      });
      // 2 · pick USDC from the list
      at(1600, () => moveTo(rowRef.current));
      at(2250, tap);
      at(2420, () => {
        setReceiveToken("USDC");
        setModal(false);
      });
      // 3 · type the pay amount
      at(2650, () => {
        setPhase("toInput");
        moveTo(payRef.current);
      });
      at(3250, () => setPhase("typing"));
      at(3370, () => setPay("1"));
      at(3510, () => setPay("10"));
      at(3650, () => setPay("100"));
      at(3790, () => setPay("1,000"));
      at(4100, () => setPhase("idle"));
      // 4 · press Swap
      at(4300, () => {
        setPhase("toButton");
        moveTo(buttonRef.current);
      });
      at(4950, () => {
        tap();
        setPressed(true);
      });
      at(5150, () => {
        setPressed(false);
        setPhase("settling");
        setStep(0);
      });
      // settlement steps complete in sequence
      at(5950, () => setStep(1));
      at(6850, () => setStep(2));
      at(7750, () => setStep(3));
      at(10200, run);
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, [reduce]);

  const payNum = parseFloat(pay.replace(/,/g, "")) || 0;
  const receiveRaw = (payNum * SWAP_RATE).toLocaleString("en-US", {
    maximumFractionDigits: 3,
  });
  const receive = receiveToken ? receiveRaw : "0";

  const wallet = (
    <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M16 12h2" strokeLinecap="round" />
    </svg>
  );

  return (
    <MockScreen title="Swap">
      <div ref={bodyRef} className="relative font-sans">
        {/* You pay */}
        <section className="rounded-xl bg-surface-2/60 px-2.5 pt-2 pb-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium text-muted">You pay</span>
            <div className="flex items-center gap-1">
              {["25%", "50%", "Max"].map((x) => (
                <span
                  key={x}
                  className="rounded-md border border-line bg-surface px-1.5 py-0.5 text-[8.5px] font-medium text-muted"
                >
                  {x}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <SwapTokenTrigger sym="CC" />
            <span ref={payRef} className="flex items-center text-[18px] font-bold tabular-nums text-fg">
              {pay}
              {phase === "typing" && (
                <span className="ml-0.5 inline-block h-4 w-px bg-accent animate-[mock-blink_1.1s_steps(1)_infinite]" />
              )}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[9px] text-muted">
            <span className="flex items-center gap-1">
              {wallet} 50,323.43 CC
            </span>
            <span>$135.63</span>
          </div>
        </section>

        {/* direction button, overlapping the seam between the two cards */}
        <div className="relative z-10 h-0">
          <span className="absolute left-1/2 top-0 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-surface-2 text-fg shadow-[0_0_0_3px_var(--surface)]">
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 4v13M4 7l3-3 3 3M17 20V7M14 17l3 3 3-3" />
            </svg>
          </span>
        </div>

        {/* You receive — token starts empty; the cursor picks it from the modal */}
        <section className="mt-1.5 rounded-xl bg-surface-2/60 px-2.5 pt-2 pb-2.5">
          <span className="text-[10px] font-medium text-muted">You receive</span>
          <div className="mt-2 flex items-center justify-between gap-2">
            <span
              ref={tokenRef}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-1.5 py-1 text-[12px] font-medium ${
                receiveToken
                  ? "border-line bg-surface text-fg"
                  : "border-accent/40 bg-accent/10 text-accent"
              }`}
            >
              {receiveToken ? (
                <>
                  <TokenImg sym="USDC" />
                  USDC
                  <span className="text-muted">▾</span>
                </>
              ) : (
                <>
                  Select token
                  <span>▾</span>
                </>
              )}
            </span>
            <span className="text-[18px] font-bold tabular-nums text-fg">{receive}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[9px] text-muted">
            <span className="flex items-center gap-1">
              {wallet} 0 USDC
            </span>
            <span>$135.63</span>
          </div>
        </section>

        {/* rate + settlement fee row (RateDetailsPanel) */}
        <div className="mt-2 flex items-center gap-1.5 text-[9px] text-muted">
          <span className="min-w-0 flex-1 truncate">1 USDC ≈ 13.6 CC</span>
          <svg viewBox="0 0 24 24" className="h-2.5 w-2.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M4 21h12M15 9h2a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0V8l-3-3" />
          </svg>
          <span className="tabular-nums">2.68 CC</span>
          <span>▾</span>
        </div>

        {/* swap button */}
        <div
          ref={buttonRef}
          className={`mt-2 flex h-8 items-center justify-center rounded-full bg-accent text-[12px] font-semibold text-white transition-all duration-200 ${
            pressed ? "scale-95 brightness-95" : ""
          }`}
        >
          Swap
        </div>

        {/* token selector modal (mirrors shared/swap-ui TokenSelectorModal) */}
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-40 flex flex-col gap-2 rounded-lg bg-surface/95 p-2.5 backdrop-blur-sm"
          >
            <div className="flex items-center justify-center">
              <span className="text-[11px] font-semibold text-fg">Select a token</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-surface-2/70 px-2 py-1 text-[9px] text-muted">
              <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4-4" strokeLinecap="round" />
              </svg>
              Search
            </div>
            <div className="text-[8px] uppercase tracking-[0.16em] text-muted">
              Tokens by balance
            </div>
            <div className="space-y-0.5">
              {SWAP_TOKENS.map((t) => (
                <div
                  key={t.sym}
                  ref={t.sym === "USDC" ? rowRef : undefined}
                  className={`flex items-center gap-2 rounded-lg px-1.5 py-1 transition-colors ${
                    phase === "pickToken" && t.sym === "USDC" ? "bg-surface-2" : ""
                  }`}
                >
                  <TokenImg sym={t.sym} className="h-5 w-5 rounded-full object-contain" />
                  <span className="leading-tight">
                    <span className="block text-[10px] font-medium text-fg">{t.sym}</span>
                    <span className="block text-[8px] text-muted">{t.admin}</span>
                  </span>
                  <span className="ml-auto text-right leading-tight">
                    <span className="block text-[10px] tabular-nums text-fg">{t.bal}</span>
                    <span className="block text-[8px] tabular-nums text-muted">{t.usd}</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* fake cursor — drives token pick, amount entry and the swap click */}
        {!reduce && cursor && phase !== "settling" && (
          <motion.svg
            viewBox="0 0 24 24"
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 z-50 -ml-1 -mt-1 h-4 w-4 drop-shadow-[0_1px_2px_rgba(20,22,29,0.4)]"
            initial={false}
            animate={{ x: cursor.x, y: cursor.y, scale: click ? 0.8 : 1 }}
            transition={{ duration: click ? 0.12 : 0.5, ease: EASE }}
          >
            <path
              d="M5 3l14 7-6 1.5L9.5 18 5 3z"
              fill="#fff"
              stroke="#14161d"
              strokeWidth={1.4}
              strokeLinejoin="round"
            />
          </motion.svg>
        )}

        {/* the screens that follow a successful swap: the 3-step settlement
            progress (matches order-book's settlementStepMapper) */}
        {phase === "settling" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="absolute inset-0 z-50 flex flex-col justify-center gap-2.5 rounded-lg bg-surface"
          >
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-semibold text-fg">
                {step >= 3 ? "Swap settled" : "Settling swap"}
              </span>
              <span className="font-mono text-[9px] tabular-nums text-muted">
                1,000 CC → 80.175 USDC
              </span>
            </div>
            {SETTLE_STEPS.map((s, i) => {
              const state = step > i ? "done" : step === i ? "doing" : "pending";
              return (
                <div key={s.label} className="flex items-center gap-2.5">
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                      state === "done"
                        ? "bg-data/15 text-data"
                        : state === "doing"
                          ? "text-accent"
                          : "border border-line text-muted"
                    }`}
                  >
                    {state === "done" ? (
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.4}>
                        <path d="M5 12l4.5 4.5L19 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : state === "doing" ? (
                      <span className="h-3 w-3 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
                    ) : (
                      <span className="text-[10px] tabular-nums">{i + 1}</span>
                    )}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block text-[11px] leading-tight ${
                        state === "pending" ? "text-muted" : "text-fg"
                      }`}
                    >
                      {s.label}
                    </span>
                    {state !== "pending" && (
                      <span
                        className={`block font-mono text-[9px] leading-tight ${
                          state === "done" ? "text-data" : "text-muted"
                        }`}
                      >
                        {state === "done" ? s.done : s.doing}
                      </span>
                    )}
                  </span>
                </div>
              );
            })}
            {step >= 3 && (
              <div className="mt-0.5 font-mono text-[9px] text-muted">
                Atomic DvP on Canton · update_id 0x9f…3c
              </div>
            )}
          </motion.div>
        )}
      </div>
    </MockScreen>
  );
}

function ApiMock() {
  const reduce = useReducedMotion();
  const [lang, setLang] = useState<"ts" | "rust">("ts");

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setLang((l) => (l === "ts" ? "rust" : "ts")), 3200);
    return () => clearInterval(id);
  }, [reduce]);

  const rust = lang === "rust";
  const Line = ({ name, fn, arg, caret }: { name: string; fn: string; arg: string; caret?: boolean }) => (
    <div className="flex items-center whitespace-nowrap">
      <span>
        <span className="text-accent">{rust ? "let" : "const"}</span>{" "}
        <span className="text-fg">{name}</span>
        <span className="text-muted"> = </span>
        {!rust && <span className="text-accent">await </span>}
        <span className="text-data">{fn}</span>
        <span className="text-muted">(</span>
        <span className="text-fg/70">{arg}</span>
        <span className="text-muted">)</span>
        {rust && <span className="text-accent">.await</span>}
        {rust && <span className="text-muted">?</span>}
        <span className="text-muted">;</span>
      </span>
      {caret && (
        <span className="ml-0.5 inline-block h-3 w-px bg-data animate-[mock-blink_1.1s_steps(1)_infinite]" />
      )}
    </div>
  );
  const Tab = ({ id, label }: { id: "ts" | "rust"; label: string }) => (
    <span
      className={`rounded px-1.5 py-0.5 text-[9px] transition-colors ${
        lang === id ? "bg-data/12 text-data" : "text-muted"
      }`}
    >
      {label}
    </span>
  );
  return (
    <MockScreen
      title={
        <span className="flex gap-1">
          <Tab id="ts" label="TypeScript" />
          <Tab id="rust" label="Rust" />
        </span>
      }
    >
      <motion.div
        key={lang}
        initial={reduce ? false : { opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
        className="space-y-0.5"
      >
        <Line name={rust ? "p" : "p"} fn="prepare" arg="tx" />
        <Line name="s" fn="sign" arg="p" />
        <Line name={rust ? "update_id" : "updateId"} fn="execute" arg="s" caret />
      </motion.div>
    </MockScreen>
  );
}

function ProofMock() {
  const reduce = useReducedMotion();
  const [pct, setPct] = useState(reduce ? 100 : 0);
  const [done, setDone] = useState(reduce);

  useEffect(() => {
    if (reduce) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));
    const run = () => {
      setDone(false);
      setPct(0);
      [14, 31, 47, 63, 80, 92, 100].forEach((v, i) => at(300 + i * 240, () => setPct(v)));
      at(300 + 7 * 240 + 200, () => setDone(true));
      at(300 + 7 * 240 + 200 + 2400, run);
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, [reduce]);

  return (
    <MockScreen title="Proof">
      <div className="flex items-start gap-2.5">
        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-data/12 text-data">
          {done && (
            <span
              aria-hidden
              className="absolute inset-0 rounded-lg ring-1 ring-data/40 animate-[mock-pulse_2.8s_ease-in-out_infinite]"
            />
          )}
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" strokeLinejoin="round" />
            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-[11px] text-fg">Trade activity proof</div>
          <div className="mt-1 font-mono text-[10px] text-muted">
            {done ? (
              <span className="inline-flex rounded bg-data/12 px-1.5 py-0.5 text-data">Verified ✓</span>
            ) : (
              <>Generating proof… {pct}%</>
            )}
          </div>
        </div>
      </div>
      {/* proving progress bar */}
      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-data transition-[width] duration-200 ease-out"
          style={{ width: `${done ? 100 : pct}%` }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-line pt-2 text-fg">
        <span className="text-muted">Orders revealed</span>
        <span className="tabular-nums">0</span>
      </div>
    </MockScreen>
  );
}

const EARN_FIELD = [
  { name: "0x7B…9c", pts: 5030 },
  { name: "loop.dao", pts: 4120 },
  { name: "0x4D…1a", pts: 3990 },
];

function EarnMock() {
  const reduce = useReducedMotion();
  const [pts, setPts] = useState(4820);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setPts((p) => (p >= 5320 ? 4820 : p + Math.round(70 + Math.random() * 120))),
      1600,
    );
    return () => clearInterval(id);
  }, [reduce]);

  const rows = [
    ...EARN_FIELD.map((f) => ({ ...f, you: false })),
    { name: "0x3E…b7", pts, you: true },
  ].sort((a, b) => b.pts - a.pts);
  const myIndex = rows.findIndex((r) => r.you);
  const climbed = 3 + Math.max(0, 1 - myIndex);

  return (
    <MockScreen
      title={
        <span className="flex w-full items-center justify-between">
          EarnHub
          <span className="rounded bg-data/12 px-1.5 py-0.5 text-[9px] text-data">Season 6</span>
        </span>
      }
    >
      <div className="space-y-1">
        {rows.map((r, i) => (
          <motion.div
            layout={!reduce}
            key={r.name}
            transition={{ duration: 0.5, ease: EASE }}
            className={`flex items-center gap-2 rounded-lg px-2 py-1 ${
              r.you ? "border border-accent/30 bg-accent/10 text-fg" : "text-muted"
            }`}
          >
            <span className="w-6 tabular-nums">#{11 + i}</span>
            <span
              className="h-3.5 w-3.5 shrink-0 rounded-full"
              style={{ background: r.you ? "linear-gradient(135deg,#d6448f,#0e8a76)" : "#cbd0da" }}
            />
            <span className={`truncate ${r.you ? "font-medium text-fg" : ""}`}>{r.name}</span>
            {r.you && (
              <span className="text-data animate-[mock-bob_1.8s_ease-in-out_infinite]">↑{climbed}</span>
            )}
            {r.you ? (
              <motion.span
                key={r.pts}
                initial={reduce ? false : { color: "var(--data)" }}
                animate={{ color: "var(--fg)" }}
                transition={{ duration: 0.45 }}
                className="ml-auto tabular-nums"
              >
                {r.pts.toLocaleString("en-US")} pts
              </motion.span>
            ) : (
              <span className="ml-auto tabular-nums">{r.pts.toLocaleString("en-US")}</span>
            )}
          </motion.div>
        ))}
      </div>
    </MockScreen>
  );
}

export const PRODUCT_MOCK = [BookMock, AgentMock, SwapMock, ApiMock, ProofMock, EarnMock];
