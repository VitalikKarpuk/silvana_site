"use client";

/*
  Home — variant 2, restructured to a Mercury-style flow.
  Cool near-white theme, soft white cards on a tinted page, generous whitespace.
  Section rhythm: hero (dominant product diagram) → value-prop strip → trusted-by
  logos → alternating feature showcase (big animated panels + copy) → numbered
  getting-started → stats band → institutions/security → developers → testimonials
  → latest → newsletter → dual-CTA close. Brand accents: magenta = CTA/live,
  teal = data. Motion is reduced-motion gated.
*/

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ----------------------------------------------------------------- helpers */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

// Count-up to `value` on mount (eased), reduced-motion safe. With `live` it
// keeps drifting up afterwards so a running total reads as live.
function Counter({
  value,
  prefix = "",
  live = false,
}: {
  value: number;
  prefix?: string;
  live?: boolean;
}) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);
  useEffect(() => {
    if (reduce) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1500;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, value]);
  useEffect(() => {
    if (reduce || !live) return;
    const id = setInterval(
      () => setN((v) => v + Math.round(80 + Math.random() * 360)),
      3200,
    );
    return () => clearInterval(id);
  }, [reduce, live]);
  return (
    <>
      {prefix}
      {n.toLocaleString("en-US")}
    </>
  );
}

function Label({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
      {children}
    </span>
  );
}

// Small uppercase kicker with an accent dot — sits above section headlines.
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

// Full-width band with generous vertical rhythm and a hairline top rule.
function Band({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`border-t border-line ${className}`}>
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">{children}</div>
    </section>
  );
}

function SectionHead({
  eyebrow,
  title,
  sub,
  center = false,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="display mt-4 text-3xl text-fg sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {sub && (
        <p className={`mt-4 max-w-xl text-lg text-muted ${center ? "mx-auto" : ""}`}>
          {sub}
        </p>
      )}
    </Reveal>
  );
}

function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group/al inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover ${className}`}
    >
      {children}
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 transition-transform group-hover/al:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

/* --------------------------------------------------------------------- hero */

function Hero() {
  const content = (
    <div className="max-w-md">
      <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-fg backdrop-blur-sm">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        Live on Canton
        <span className="text-muted">
          · <span className="text-data tabular-nums"><Counter value={4218907} prefix="$" live /></span> settled
        </span>
      </div>

      <h1 className="display mt-6 text-5xl leading-[0.96] text-fg sm:text-6xl lg:text-[4rem]">
        The agent interaction layer for{" "}
        <span className="text-accent">tokenized assets.</span>
      </h1>

      <p className="mt-6 text-lg leading-relaxed text-muted">
        Silvana enables AI agents, applications, and institutions to securely
        operate tokenized assets on Canton — deploy agents that trade, settle,
        and prove.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button href="/app">Open the app</Button>
        <Button href="/build" variant="secondary">
          Start building
        </Button>
      </div>

      <p className="mt-4 text-sm text-muted">
        Trading takes minutes. Your first agent takes an afternoon.
      </p>

      {/* key metrics */}
      <dl className="mt-8 flex gap-x-8 border-t border-line pt-5">
        {[
          ["<1s", "Order matching"],
          ["100%", "Atomic settlement"],
          ["1,240+", "Agents running"],
        ].map(([v, l]) => (
          <div key={l}>
            <dt className="display tnum text-xl text-fg">{v}</dt>
            <dd className="mt-0.5 text-[11px] uppercase tracking-wider text-muted">
              {l}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );

  return (
    <>
      {/* LIGHT theme — diagram is the full-bleed banner background, text overlaid */}
      <section className="relative overflow-hidden border-b border-line dark:hidden">
        <Image
          src="/light.png"
          alt="The Silvana platform: ecosystems — Wallets, Canton, and data feeds — feed into Silvana, which branches into autonomous agents for market making, grid, taker, settlement, and proving."
          width={1672}
          height={941}
          priority
          sizes="100vw"
          className="tree-grow block w-full mix-blend-multiply"
        />
        {/* scrim on the left so the heading reads cleanly over the diagram (desktop) */}
        <div
          aria-hidden
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(to right, var(--bg) 0%, var(--bg) 20%, color-mix(in srgb, var(--bg) 60%, transparent) 38%, transparent 58%)",
          }}
        />
        <div className="absolute inset-0 hidden lg:block">
          <div className="mx-auto flex h-full max-w-7xl items-center px-6">{content}</div>
        </div>
        <div className="px-6 py-12 lg:hidden">{content}</div>
      </section>

      {/* DARK theme — two columns: text left, cropped diagram right, on black */}
      <section className="hidden border-b border-line dark:block">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-14 md:py-20 lg:grid-cols-2 lg:gap-12 lg:py-24">
          {content}
          <Image
            src="/hero-tree.png"
            alt="The Silvana platform diagram: ecosystems feed into Silvana, which branches into autonomous trading, settlement, and proving agents."
            width={949}
            height={842}
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="tree-grow mx-auto block w-full max-w-md lg:max-w-none"
          />
        </div>
      </section>
    </>
  );
}

/* ------------------------------------------------------------- value props */

function PropIcon({ kind }: { kind: string }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-5 w-5",
  };
  switch (kind) {
    case "book":
      return (
        <svg {...common}>
          <path d="M4 19V9M9 19V5M14 19v-6M19 19v-9" />
        </svg>
      );
    case "agent":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
        </svg>
      );
    case "settle":
      return (
        <svg {...common}>
          <path d="M4 8h13l-3-3M20 16H7l3 3" />
        </svg>
      );
    case "prove":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5c0 4.2-2.8 7.4-7 8.7C7.8 18.4 5 15.2 5 11V6l7-3Z" />
          <path d="M9.2 11.8l1.9 1.9 3.7-3.9" />
        </svg>
      );
    default:
      return null;
  }
}

const VALUE_PROPS = [
  {
    kind: "book",
    title: "Trade privately",
    body: "A sub-second orderbook with no mempool, no slippage, and no pools.",
  },
  {
    kind: "agent",
    title: "Automate with agents",
    body: "Configure once — agents run market-making, grid, RFQ, and settlement around the clock.",
  },
  {
    kind: "settle",
    title: "Settle atomically",
    body: "Delivery-versus-payment on Canton: every trade settles in full or rolls back.",
  },
  {
    kind: "prove",
    title: "Prove without revealing",
    body: "Hand auditors zero-knowledge proofs of activity without exposing a single order.",
  },
];

function ValueProps() {
  return (
    <Band>
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHead
          eyebrow="The platform"
          title="Everything an agent needs to operate tokenized assets."
          sub="Trading and agent infrastructure designed to work individually or together."
        />
        <Reveal delay={0.1}>
          <Button href="/app" variant="secondary" className="shrink-0">
            Launch demo
          </Button>
        </Reveal>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {VALUE_PROPS.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.06}>
            <div className="flex h-full flex-col bg-surface p-7">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <PropIcon kind={v.kind} />
              </span>
              <h3 className="display mt-5 text-lg text-fg">{v.title}</h3>
              <p className="mt-2 text-sm text-muted">{v.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}

/* ----------------------------------------------------------------- logo wall */

const PARTNERS = [
  { src: "/partners/canton.svg", alt: "Canton Network" },
  { src: "/partners/loopWallet.svg", alt: "Loop Wallet" },
  { src: "/partners/supanova.svg", alt: "Supanova" },
  { src: "/partners/modo.svg", alt: "Modo" },
  { src: "/partners/hecto.svg", alt: "Hecto" },
];

// One pass of the partner logos. Doubled so a single half always overflows the
// track — the -50% loop never exposes a gap. Rendered twice in LogoWall; the
// second copy is aria-hidden.
function LogoGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-14 pr-14 md:gap-16 md:pr-16"
    >
      {[...PARTNERS, ...PARTNERS].map((p, i) => (
        <Image
          key={i}
          src={p.src}
          alt={hidden ? "" : p.alt}
          width={120}
          height={26}
          draggable={false}
          className="h-6 w-auto select-none opacity-45 grayscale transition duration-300 ease-out hover:-translate-y-0.5 hover:opacity-100 hover:grayscale-0 md:h-7"
        />
      ))}
    </div>
  );
}

function LogoWall() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto grid max-w-7xl grid-cols-12 items-center gap-x-6 gap-y-6 px-6 py-12">
        <div className="col-span-12 lg:col-span-3">
          <Label>Building the agent economy with</Label>
        </div>
        <div className="marquee group/marquee relative col-span-12 overflow-hidden lg:col-span-9 mask-[linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
          {/* two identical halves → marquee-track animates to -50% for a seamless loop */}
          <div className="marquee-track flex w-max items-center">
            <LogoGroup />
            <LogoGroup hidden />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------- feature showcase data */

const PRODUCTS = [
  {
    tag: "Silvana Book",
    title: "Trade privately on a high-performance orderbook.",
    body: "Off-chain matching in under a second. Zero information leakage, zero slippage, zero pools. Your orders never touch a public mempool.",
    meta: ["CC-USDC · 5×5 depth", "Matched in 0.4s", "DvP settled on Canton"],
    cta: "Explore Silvana Book",
    href: "/products/silvana-book",
  },
  {
    tag: "Agents",
    title: "Put agents on the flow.",
    body: "Market making, grid, RFQ, settlement, proving — configure an agent once and let it run around the clock.",
    meta: ['market = "CC/USDC"', "delta_percent = 0.4", "levels = 6 · size = 250", "Running · 14h · 312 orders"],
    cta: "Browse the agent catalog",
    href: "/agents/catalog",
  },
  {
    tag: "Swap",
    title: "Swap with atomic settlement.",
    body: "Assets and payment move simultaneously — or not at all. No pools, no custody handoffs, rollback-protected.",
    meta: ["1,000 CC → 412.50 USDC", "Atomic DvP"],
    cta: "Try Swap",
    href: "/products/silvana-book",
  },
  {
    tag: "Agentic API",
    title: "Build on the Agentic API.",
    body: "One gRPC interface for everything on Canton: payments, DvP, transfers, multicall workflows.",
    meta: ["prepare() → sign() → execute()", "→ update_id", "Rust / TypeScript"],
    cta: "Read the API reference",
    href: "/build/api-reference",
  },
  {
    tag: "Proving",
    title: "Prove without revealing.",
    body: "Hand auditors ZK proofs of trading activity — without exposing a single order.",
    meta: ["Trade activity proof", "Verified ✓ · Orders revealed: 0"],
    cta: "How proving works",
    href: "/products/agentic-api",
  },
  {
    tag: "EarnHub",
    title: "Earn as you trade.",
    body: "Every settled transaction counts toward seasonal rewards in EarnHub.",
    meta: ["#12 ↑3 · 4,820 pts", "Season 6"],
    cta: "Open EarnHub",
    href: "/earnhub",
  },
];

/* ----------------------------------------------- light product mini-mockups */

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

function AgentMock() {
  const reduce = useReducedMotion();
  const [orders, setOrders] = useState(312);
  const [mins, setMins] = useState(840); // 14h 00m

  useEffect(() => {
    if (reduce) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setOrders((o) => o + 1 + (i % 3 === 0 ? 1 : 0));
      setMins((m) => m + 1);
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

// A scripted, self-running swap demo. A fake cursor drives the whole flow:
// it types the pay amount, opens the receive-token dropdown and picks a token,
// then clicks Confirm → Confirming → Settled, and the loop resets. JS-driven,
// so the whole thing is gated behind prefers-reduced-motion.
type SwapPhase = "idle" | "typing" | "token" | "toButton" | "settling";

const SWAP_RATE = 0.4125;

// The real post-swap flow (from order-book: settlementStepMapper) — three
// settlement steps that complete in sequence after Swap is pressed.
const SETTLE_STEPS = [
  { label: "Counterparties confirmation", doing: "Confirming…", done: "Both parties confirmed" },
  { label: "Contract Sign", doing: "Creating DVP contract…", done: "DVP contract signed" },
  { label: "Token Allocation", doing: "Allocating tokens…", done: "Settlement complete" },
];

function SwapMock() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<SwapPhase>("idle");
  const [pay, setPay] = useState("0");
  const [dropdown, setDropdown] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [step, setStep] = useState(0); // active settlement step; 3 = all done

  useEffect(() => {
    if (reduce) {
      setPay("1,000");
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));
    const run = () => {
      setPhase("idle");
      setPay("0");
      setDropdown(false);
      setPressed(false);
      setStep(0);
      // type the amount
      at(600, () => setPhase("typing"));
      at(720, () => setPay("1"));
      at(880, () => setPay("10"));
      at(1040, () => setPay("100"));
      at(1200, () => setPay("1,000"));
      // pick the receive token
      at(1750, () => {
        setPhase("token");
        setDropdown(true);
      });
      at(2650, () => setDropdown(false));
      // move to the button and click
      at(2950, () => setPhase("toButton"));
      at(3500, () => setPressed(true));
      at(3680, () => {
        setPressed(false);
        setPhase("settling");
        setStep(0);
      });
      // settlement steps complete in sequence
      at(4500, () => setStep(1));
      at(5400, () => setStep(2));
      at(6300, () => setStep(3));
      at(8600, run);
    };
    run();
    return () => timers.forEach(clearTimeout);
  }, [reduce]);

  const payNum = parseFloat(pay.replace(/,/g, "")) || 0;
  const receive = (payNum * SWAP_RATE).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // cursor target (relative to the swap body) per phase
  const cursor =
    phase === "toButton"
      ? { left: "50%", top: "92%" }
      : phase === "token"
        ? { left: "17%", top: "49%" }
        : { left: "88%", top: "16%" };

  return (
    <MockScreen title="Swap">
      <div className="relative">
        {/* You pay — amount is typed in */}
        <div className="rounded-lg border border-line bg-surface-2/60 px-2.5 py-2">
          <div className="text-[9px] text-muted">You pay</div>
          <div className="mt-1 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-fg">
              <span className="h-3.5 w-3.5 rounded-full bg-accent/70" />
              CC
            </span>
            <span className="flex items-center text-[15px] font-bold tabular-nums text-fg">
              {pay}
              {phase === "typing" && (
                <span className="ml-0.5 inline-block h-3.5 w-px bg-accent animate-[mock-blink_1.1s_steps(1)_infinite]" />
              )}
            </span>
          </div>
        </div>

        {/* You receive — token has a dropdown the cursor opens */}
        <div className="mt-2 rounded-lg border border-line bg-surface-2/60 px-2.5 py-2">
          <div className="text-[9px] text-muted">You receive</div>
          <div className="mt-1 flex items-center justify-between">
            <span className="relative flex items-center gap-1.5 text-fg">
              <span className="h-3.5 w-3.5 rounded-full bg-data/70" />
              USDC
              <span className="text-muted">▾</span>
              {dropdown && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute left-0 top-6 z-30 w-24 rounded-lg border border-line bg-surface p-1 shadow-[0_16px_30px_-14px_rgba(20,22,29,0.35)]"
                >
                  <span className="flex items-center gap-1.5 rounded-md bg-data/12 px-1.5 py-1 text-data">
                    <span className="h-3 w-3 rounded-full bg-data/70" />
                    USDC
                  </span>
                  <span className="mt-0.5 flex items-center gap-1.5 rounded-md px-1.5 py-1 text-muted">
                    <span className="h-3 w-3 rounded-full bg-accent/70" />
                    CC
                  </span>
                </motion.span>
              )}
            </span>
            <span className="text-[15px] font-bold tabular-nums text-fg">{receive}</span>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between text-[10px]">
          <span className="rounded bg-data/12 px-1.5 py-0.5 text-data animate-[mock-pulse_2.8s_ease-in-out_infinite]">
            Atomic DvP
          </span>
          <span className="text-muted">1 CC = 0.4125 USDC</span>
        </div>

        {/* swap button */}
        <div
          className={`mt-2 flex h-7 items-center justify-center rounded-full bg-accent text-[12px] font-semibold text-white transition-all duration-200 ${
            pressed ? "scale-95 brightness-95" : phase === "toButton" ? "brightness-105" : ""
          }`}
        >
          Swap
        </div>

        {/* fake cursor — drives input, token pick and the click */}
        {!reduce && phase !== "settling" && (
          <motion.svg
            viewBox="0 0 24 24"
            aria-hidden
            className="pointer-events-none absolute z-40 -ml-2 -mt-2 h-4 w-4 drop-shadow-[0_1px_2px_rgba(20,22,29,0.35)]"
            initial={false}
            animate={{ left: cursor.left, top: cursor.top, scale: pressed ? 0.8 : 1 }}
            transition={{ duration: pressed ? 0.12 : 0.5, ease: EASE }}
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
                1,000 CC → 412.50 USDC
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

const PRODUCT_MOCK = [BookMock, AgentMock, SwapMock, ApiMock, ProofMock, EarnMock];

/* -------------------------------------------------------------- bento tiles */

// A bento tile: the light product mockup is anchored at the bottom as a living
// background and dissolves upward, so the heading always sits on clean surface.
function BentoCard({
  p,
  Mock,
  big,
  className = "",
  delay,
}: {
  p: (typeof PRODUCTS)[number];
  Mock: () => ReactNode;
  big?: boolean;
  className?: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay} className={className}>
      <Link
        href={p.href}
        className="group relative flex h-full min-h-64 flex-col overflow-hidden rounded-3xl border border-line bg-surface p-6 shadow-[0_18px_40px_-28px_rgba(20,22,29,0.18)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-[0_28px_56px_-30px_rgba(20,22,29,0.28)]"
      >
        {/* product mockup — light, full card width, anchored at the bottom and
            dissolving upward so the heading stays on clean surface */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-5 bottom-5 mask-[linear-gradient(to_top,#000_72%,transparent)]"
        >
          <Mock />
        </div>
        {/* surface veil: keeps the upper copy area clean over any overlap */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-b from-surface via-surface/55 to-transparent"
        />

        <div className="relative z-10">
          <Eyebrow>{p.tag}</Eyebrow>
          <h3 className="display mt-2 max-w-xs text-lg text-fg md:text-xl">
            {p.title}
          </h3>
          {big && <p className="mt-2 max-w-sm text-sm text-muted">{p.body}</p>}
          <span className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent transition-colors group-hover:text-accent-hover">
            {p.cta}
            <svg
              viewBox="0 0 24 24"
              aria-hidden
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

function FeatureShowcase() {
  return (
    <Band>
      <SectionHead
        eyebrow="Products"
        title="One platform, every agentic workflow."
        sub="A complete set of trading and agent infrastructure — explore each on its own, or compose them together."
      />
      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[16rem]">
        {PRODUCTS.map((p, i) => {
          // Book (0) and Swap (2) are the big tiles — two 2×2 anchors on top,
          // the remaining four 1×1 tiles flow into the row beneath them.
          const big = i === 0 || i === 2;
          const place =
            i === 0
              ? "sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:col-start-1 lg:row-start-1"
              : i === 2
                ? "sm:col-span-2 lg:col-span-2 lg:row-span-2 lg:col-start-3 lg:row-start-1"
                : "";
          return (
            <BentoCard
              key={p.tag}
              p={p}
              Mock={PRODUCT_MOCK[i]}
              big={big}
              className={place}
              delay={i * 0.05}
            />
          );
        })}
      </div>
    </Band>
  );
}

/* ------------------------------------------------------------ getting started */

const PATHS = [
  {
    n: "01",
    title: "Don't code?",
    body: "Trade from the Terminal, swap in two clicks, and track rewards in EarnHub — no integration required.",
    cta: "Open the app",
    href: "/app",
  },
  {
    n: "02",
    title: "Configure an agent.",
    body: "Simulate a strategy in the Playground, then export the exact agent.toml and CLI command to run it for real.",
    cta: "Try the Playground",
    href: "/agents/playground",
  },
  {
    n: "03",
    title: "Build your own.",
    body: "gRPC services defined in proto work from any language. Agents run in Rust; a TypeScript SDK covers web. Two-phase signing keeps keys local.",
    cta: "Read the docs",
    href: "/build",
  },
];

function GettingStarted() {
  return (
    <Band>
      <SectionHead
        eyebrow="Get started"
        title="Three ways to begin."
        sub="Adapt Silvana to your architecture, not the other way around."
      />

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {PATHS.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.06}>
            <div className="glass flex h-full flex-col rounded-3xl p-7">
              <span className="display text-3xl text-accent">{p.n}</span>
              <h3 className="display mt-4 text-xl text-fg">{p.title}</h3>
              <p className="mt-3 flex-1 text-[15px] text-muted">{p.body}</p>
              <ArrowLink href={p.href} className="mt-6">
                {p.cta}
              </ArrowLink>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.12}>
        <p className="mt-10 border-t border-line pt-6 text-[15px] text-muted">
          <span className="font-medium text-fg">Scale with confidence:</span>{" "}
          Sub-second matching, bidirectional settlement streams, and canonical
          update IDs on every transaction — so your systems reconcile on the
          first pass, even at volume.
        </p>
      </Reveal>
    </Band>
  );
}

/* -------------------------------------------------------------------- stats */

const STATS = [
  ["<1s", "order matching, off-chain and optimistic"],
  ["100%", "atomic settlement: every trade settles in full or rolls back"],
  ["3", "live markets, with more launching every season"],
  ["1,240+", "agents deployed and running"],
];

function Stats() {
  return (
    <Band>
      <SectionHead eyebrow="By the numbers" title="Built for production volume." />
      <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map(([v, l], i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div className="flex h-full flex-col bg-surface p-7">
              <div className="display tnum text-5xl text-fg lg:text-6xl">{v}</div>
              <p className="mt-3 text-sm text-muted">{l}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 font-mono text-xs text-muted">
        Numbers update live from the platform.
      </p>
    </Band>
  );
}

/* ------------------------------------------------------------- institutions */

const INSTITUTION_ROWS = [
  {
    title: "Hecto builds white-label settlement rails on Silvana.",
    stat: "8 integration areas · 3 regulatory environments · weeks, not quarters, to launch",
    products: "Products used: Silvana Book, Agentic API, proving agents.",
  },
  { title: "Supanova embeds agent-driven trading directly in its wallet." },
  { title: "Modo indexes Canton settlement activity in real time on Silvana data." },
];

function Institutions() {
  const [open, setOpen] = useState(0);
  return (
    <Band>
      <SectionHead
        eyebrow="For institutions"
        title="Trade size without showing your hand."
        sub="Confidentiality, deterministic execution, and compliance-ready proofs — infrastructure that fits how institutions actually operate. Settle atomically via DvP on Canton, and hand over ZK proofs instead of spreadsheets."
      />

      <div className="mt-12 overflow-hidden rounded-3xl border border-line bg-surface">
        {INSTITUTION_ROWS.map((row, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="border-b border-line last:border-b-0">
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-surface-2/50"
              >
                <span className="display text-xl text-fg md:text-2xl">
                  {row.title}
                </span>
                <span
                  className={`shrink-0 font-mono text-accent transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  aria-hidden
                >
                  +
                </span>
              </button>
              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  {row.stat && (
                    <p className="font-mono text-xs text-data">{row.stat}</p>
                  )}
                  {row.products && (
                    <p className="mt-2 text-sm text-muted">{row.products}</p>
                  )}
                  <ArrowLink href="/solutions/case-studies" className="mt-3">
                    Read the story
                  </ArrowLink>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </Band>
  );
}

/* --------------------------------------------------------------- developers */

const DEV_CODE = `$ silvana onboard --name my-agent --invite EARLYBIRD
✓ Key generated · .env written · agent.toml created

$ silvana agent run
→ Connected to CC/USDC · quoting 6 levels · streaming settlement events…`;

function Developers() {
  return (
    <Band>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHead
            eyebrow="For developers"
            title="From strategy to running agent in an afternoon."
            sub="A general-purpose SDK, proto interfaces for any language, and four hosting models — from your laptop to a TEE. Onboard with one CLI command, configure your strategy in agent.toml, and run grid, market-making, or taker flows out of the box."
          />
          <Reveal delay={0.12} className="mt-7 flex flex-wrap gap-3">
            <Button href="/build/sdk-guide">5-minute quickstart</Button>
            <Button href="/agents/playground" variant="secondary">
              Try the Playground
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          {/* dark terminal — a single framed artifact */}
          <pre className="overflow-x-auto rounded-2xl border border-line bg-[#0c0c12] p-5 font-mono text-[12.5px] leading-relaxed text-white/85 shadow-[0_30px_60px_-30px_rgba(20,22,29,0.5)]">
            <code>{DEV_CODE}</code>
          </pre>
        </Reveal>
      </div>
    </Band>
  );
}

/* -------------------------------------------------------------- testimonials */

const TESTIMONIAL_CARDS = [
  {
    src: "/partners/modo.svg",
    alt: "Modo",
    body: "ships explorer infrastructure on Silvana data.",
  },
  {
    src: "/partners/supanova.svg",
    alt: "Supanova",
    body: "brings agent-driven apps to Canton wallets.",
  },
  {
    src: "/partners/hecto.svg",
    alt: "Hecto",
    body: "runs white-label settlement rails in weeks, not quarters.",
  },
];

function Testimonials() {
  return (
    <Band>
      <SectionHead
        eyebrow="Loved by builders"
        title="Teams are building the agent economy on Silvana."
      />

      <Reveal delay={0.06}>
        <figure className="glass mt-12 rounded-3xl p-8 md:p-12">
          <blockquote className="display max-w-[26ch] text-2xl leading-[1.18] text-fg sm:text-3xl md:text-4xl">
            “Silvana gives our users something wallets alone never could: assets
            that stay under their control while agents do the work.”
          </blockquote>
          <figcaption className="mt-8 flex flex-wrap items-center gap-4">
            <Image
              src="/partners/loopWallet.svg"
              alt="Loop Wallet"
              width={110}
              height={24}
              className="h-5 w-auto opacity-70 grayscale"
            />
            <span className="text-sm text-muted">Head of Product, Loop Wallet</span>
            <ArrowLink href="/solutions/case-studies">Read the story</ArrowLink>
          </figcaption>
        </figure>
      </Reveal>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {TESTIMONIAL_CARDS.map((c, i) => (
          <Reveal key={c.alt} delay={0.08 + i * 0.06}>
            <Link
              href="/solutions/case-studies"
              className="glass group flex h-full flex-col rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-0.5"
            >
              <Image
                src={c.src}
                alt={c.alt}
                width={110}
                height={24}
                className="h-5 w-auto opacity-60 grayscale transition group-hover:opacity-100 group-hover:grayscale-0"
              />
              <p className="mt-5 flex-1 text-[15px] text-fg">
                <span className="font-medium">{c.alt}</span>{" "}
                <span className="text-muted">{c.body}</span>
              </p>
              <span className="mt-5 text-accent transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}

/* --------------------------------------------------------------------- blog */

const POSTS = [
  ["Product", "Silvana V2 is here.", "A redesigned experience across every product — plus the new Trading Terminal."],
  ["Developers", "The Silvana SDK is live.", "Build agents and applications on Silvana Book with a developer-first interface."],
  ["Markets", "cETH markets are open.", "Trade CC-cETH and cETH-USDC with atomic DvP settlement."],
  ["Community", "EarnHub Season 6 has started.", "New challenges, new leaderboard, new rewards for settled activity."],
];

function Blog() {
  return (
    <Band>
      <SectionHead eyebrow="What's happening" title="The latest from Silvana." />
      <div className="mt-12 overflow-hidden rounded-3xl border border-line bg-surface">
        {POSTS.map(([tag, title, body], i) => (
          <Reveal key={title} delay={i * 0.05}>
            <Link
              href="/blog"
              className="group grid grid-cols-12 items-baseline gap-x-6 gap-y-2 border-b border-line px-6 py-6 transition-colors last:border-b-0 hover:bg-surface-2/50"
            >
              <span className="col-span-12 font-mono text-xs uppercase tracking-[0.18em] text-data lg:col-span-2">
                {tag}
              </span>
              <h3 className="display col-span-12 text-2xl text-fg lg:col-span-6">
                {title}
              </h3>
              <p className="col-span-12 text-[15px] text-muted lg:col-span-3">
                {body}
              </p>
              <span className="col-span-12 text-right text-accent transition-transform group-hover:translate-x-0.5 lg:col-span-1">
                →
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}

/* --------------------------------------------------------------- newsletter */

function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setState(valid ? "ok" : "err");
  }

  return (
    <Band>
      <Reveal>
        <div className="glass grid grid-cols-1 items-center gap-x-12 gap-y-8 rounded-3xl p-8 md:p-12 lg:grid-cols-2">
          <div>
            <h2 className="display text-3xl text-fg md:text-4xl">
              The agentic economy, in your inbox.
            </h2>
            <p className="mt-3 max-w-md text-[15px] text-muted">
              Product launches, new markets, and deep dives on agent
              infrastructure. Once or twice a month. No noise.
            </p>
          </div>

          <div>
            {state === "ok" ? (
              <p className="text-[15px] font-medium text-data">
                You&apos;re in. Watch for the next dispatch.
              </p>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state === "err") setState("idle");
                  }}
                  placeholder="you@company.com"
                  aria-label="Email address"
                  className="flex-1 rounded-full border border-line bg-bg px-4 py-2.5 text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover active:scale-[0.98]"
                >
                  Subscribe
                </button>
              </form>
            )}
            {state === "err" && (
              <p className="mt-3 text-sm text-accent">
                That email didn&apos;t go through — mind checking it?
              </p>
            )}
            {state !== "ok" && (
              <p className="mt-3 font-mono text-xs text-muted">
                Unsubscribe anytime. We never share your email.
              </p>
            )}
          </div>
        </div>
      </Reveal>
    </Band>
  );
}

/* ---------------------------------------------------------------- closing cta */

function ClosingCta() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-24 text-center md:py-32">
        <Reveal>
          <Eyebrow>Get started</Eyebrow>
          <h2 className="display mx-auto mt-5 max-w-[16ch] text-5xl text-fg sm:text-6xl lg:text-7xl">
            Ready to put agents to work?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            Create an account and trade in minutes, or talk to us about what
            you&apos;re building.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href="/app">Open the app</Button>
            <Button href="/about" variant="secondary">
              Contact sales
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              ["Start trading.", "Onboard, connect a wallet, and place your first private order today.", "Get started", "/app"],
              ["Start building.", "Get up and running with the SDK in as little as one afternoon.", "Quickstart", "/build/sdk-guide"],
            ].map(([title, body, cta, href]) => (
              <Link
                key={title}
                href={href}
                className="glass group rounded-3xl p-7 text-left transition-transform duration-300 hover:-translate-y-0.5"
              >
                <h3 className="display text-xl text-fg">{title}</h3>
                <p className="mt-2 text-[15px] text-muted">{body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  {cta}
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- page */

export function HomeV2() {
  return (
    <>
      <Hero />
      <ValueProps />
      <LogoWall />
      <FeatureShowcase />
      <GettingStarted />
      <Stats />
      <Institutions />
      <Developers />
      <Testimonials />
      <Blog />
      <Newsletter />
      <ClosingCta />
    </>
  );
}
