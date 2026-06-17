"use client";

/* Interactive pieces of the Build → SDK guide page:
   - Quickstart: scrollytelling walkthrough — numbered steps on the left, a
     sticky window-chrome code panel on the right that swaps to the step
     currently in view. On mobile the code stacks inline under each step.
   - CodeBlock: framed mono block with a copy-to-clipboard button, reused for
     the "Go custom" section too.
   All motion is reduced-motion safe (useReducedMotion). */

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { EASE, Eyebrow } from "@/components/sections/home-v2/shared";

/* --------------------------------------------------------------- copy button */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — fail silently */
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-colors hover:border-accent/30 hover:text-fg"
    >
      {copied ? (
        <>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-data" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
          Copied
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>
          Copy
        </>
      )}
    </button>
  );
}

/* ------------------------------------------------------------- code block ui */

export function CodeBlock({
  label,
  code,
  className = "",
}: {
  label: string;
  code: string;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.45)] ${className}`}>
      {/* window chrome */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            {label}
          </span>
        </div>
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto px-5 py-4 font-mono text-[13px] leading-relaxed text-fg">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* --------------------------------------------------------------- quickstart */

type QStep = {
  id: string;
  n: string;
  title: string;
  body: ReactNode;
  label: string;
  code: string;
};

const STEPS: QStep[] = [
  {
    id: "install",
    n: "1",
    title: "Install",
    body: (
      <>
        Install the CLI and generate an{" "}
        <span className="text-gradient-flow">Ed25519 key</span> — no config
        needed yet.
      </>
    ),
    label: "shell",
    code: `# install the Silvana CLI
cargo install silvana-cli

# generate an Ed25519 keypair
silvana key generate`,
  },
  {
    id: "onboard",
    n: "2",
    title: "Onboard",
    body: (
      <>
        One command with your agent name, email, and invite code. Your{" "}
        <span className="font-mono text-data">.env</span> and{" "}
        <span className="font-mono text-data">agent.toml</span> are generated for
        you.
      </>
    ),
    label: "shell",
    code: `silvana onboard \\
  --name my-lp-agent \\
  --email you@example.com \\
  --invite SILVANA-XXXX

# ✓ wrote .env
# ✓ wrote agent.toml`,
  },
  {
    id: "sanity-check",
    n: "3",
    title: "Sanity-check",
    body: "Query balances, party ID, and network state straight from the CLI.",
    label: "shell",
    code: `silvana balance
silvana party id
silvana network status`,
  },
  {
    id: "configure",
    n: "4",
    title: "Configure",
    body: (
      <>
        Tune <span className="font-mono text-data">agent.toml</span> — markets,
        spreads, levels, size, liquidity settings.
      </>
    ),
    label: "agent.toml",
    code: `[market]
pair    = "CC/USDC"
spread  = 0.0002   # bps around mid
levels  = 5        # quotes per side
size    = 1000     # base size per level

[liquidity]
rfq      = true
min_size = 50`,
  },
  {
    id: "run",
    n: "5",
    title: "Run",
    body: (
      <>
        Launch the long-running LP agent for market making and RFQ, or fire taker
        flows: buy and sell via RFQ until your target fills.
      </>
    ),
    label: "shell",
    code: `# long-running LP agent (market making + RFQ)
silvana run lp

# or fire taker flows via RFQ
silvana taker buy  --pair CC/USDC --target 5000
silvana taker sell --pair CC/USDC --target 5000`,
  },
];

export function Quickstart() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Track which step is centered in the viewport to drive the sticky panel.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = Number(
            (visible.target as HTMLElement).dataset.index ?? 0,
          );
          setActive(idx);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.5, 1] },
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const activeStep = STEPS[active];

  return (
    <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
      {/* left rail — numbered steps */}
      <ol className="space-y-4">
        {STEPS.map((step, i) => (
          <li
            key={step.id}
            id={step.id}
            data-index={i}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            className="scroll-mt-28"
          >
            <div
              className={`flex gap-5 rounded-2xl border p-6 transition-colors ${
                active === i
                  ? "border-accent/40 bg-accent/5"
                  : "border-line bg-surface"
              }`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-sm transition-colors ${
                  active === i
                    ? "bg-accent/15 text-accent"
                    : "bg-surface-2 text-muted"
                }`}
              >
                {step.n}
              </span>
              <div className="min-w-0">
                <h3 className="display text-xl text-fg">{step.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {step.body}
                </p>
                {/* inline code on mobile only */}
                <div className="mt-4 lg:hidden">
                  <CodeBlock label={step.label} code={step.code} />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {/* right rail — sticky code panel (desktop) */}
      <div className="hidden lg:block">
        <div className="sticky top-28">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeStep.id}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <div className="mb-3 flex items-center gap-2">
                <Eyebrow>
                  Step {activeStep.n} / {STEPS.length}
                </Eyebrow>
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                  · {activeStep.title}
                </span>
              </div>
              <CodeBlock label={activeStep.label} code={activeStep.code} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
