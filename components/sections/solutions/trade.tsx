"use client";

/* Interactive pieces of the Solutions → Trade (Live) page. The page itself is a
   server component; only the hero visual and the flow timeline need the client
   for scroll-reveal motion.

   - LiveHeroVisual: a compact "agent on the book" panel used as the hero visual
     — a strategy header plus a live, drifting tape of agent actions (RFQ →
     order → settle). The drift is reduced-motion safe.
   - FlowTimeline: the nine-step "How it runs" lifecycle as a vertical timeline
     with actor tags (you / agent / Silvana / Canton) — the handoff between
     actors is the story, so each step carries the actor that owns it.

   All motion is reduced-motion safe via <Reveal/> and useReducedMotion. */

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, EASE } from "@/components/sections/home-v2/shared";

/* --------------------------------------------------------------- hero visual */

type Actor = "you" | "agent" | "silvana" | "canton";

const ACTOR_STYLE: Record<Actor, { label: string; chip: string }> = {
  you: { label: "You", chip: "border-line bg-surface-2 text-muted" },
  agent: { label: "Agent", chip: "border-accent/40 bg-accent/10 text-accent" },
  silvana: { label: "Silvana", chip: "border-data/40 bg-data/10 text-data" },
  canton: { label: "Canton", chip: "border-line bg-surface-2 text-fg" },
};

function ActorTag({ actor }: { actor: Actor }) {
  const a = ACTOR_STYLE[actor];
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] ${a.chip}`}
    >
      {a.label}
    </span>
  );
}

// A short tape of agent actions that drifts upward to read as live.
const TAPE: { actor: Actor; text: string; px: string }[] = [
  { actor: "agent", text: "RFQ sent · 50,000 CC", px: "0.0809" },
  { actor: "silvana", text: "Quote matched · Maker B", px: "0.0807" },
  { actor: "canton", text: "Settled atomically · DvP", px: "0.0807" },
  { actor: "agent", text: "Rebalanced to target", px: "+1.2%" },
];

export function LiveHeroVisual() {
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setTick((t) => t + 1), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  // Rotate the tape so the freshest action sits on top.
  const rows = TAPE.map((_, i) => TAPE[(i + tick) % TAPE.length]);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-[0_24px_60px_-30px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="text-sm font-medium text-fg">Trading agent · CC / USDC</span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-data">
          <span className="h-1.5 w-1.5 rounded-full bg-data" />
          Live
        </span>
      </div>

      <div className="grid grid-cols-2 gap-px bg-line">
        <div className="bg-surface px-4 py-3">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted">Objective</div>
          <div className="mt-1 text-sm text-fg">Hold 60 / 40 · CC / USDC</div>
        </div>
        <div className="bg-surface px-4 py-3">
          <div className="font-mono text-[10px] uppercase tracking-wider text-muted">Risk limit</div>
          <div className="mt-1 text-sm text-fg">Max slippage 0.10%</div>
        </div>
      </div>

      <div className="space-y-2 px-4 py-4">
        {rows.map((r, i) => (
          <motion.div
            key={`${tick}-${i}`}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: i === 0 ? 1 : 0.55 - i * 0.1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface-2 px-3 py-2.5"
          >
            <div className="flex items-center gap-2.5">
              <ActorTag actor={r.actor} />
              <span className="text-xs text-fg">{r.text}</span>
            </div>
            <span className="font-mono text-xs text-muted">{r.px}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- flow timeline */

type Flow = { n: string; actor: Actor; text: string };

const FLOW: Flow[] = [
  { n: "1", actor: "you", text: "You define trading objectives and risk parameters." },
  { n: "2", actor: "agent", text: "The agent monitors markets and available liquidity." },
  { n: "3", actor: "agent", text: "It requests RFQs or identifies matching orders." },
  { n: "4", actor: "agent", text: "It evaluates execution opportunities." },
  { n: "5", actor: "agent", text: "It places orders or negotiates quotes." },
  { n: "6", actor: "silvana", text: "Silvana matches and coordinates execution." },
  { n: "7", actor: "canton", text: "Silvana coordinates settlement on Canton." },
  { n: "8", actor: "agent", text: "The agent tracks positions and portfolio performance." },
  { n: "9", actor: "agent", text: "It rebalances holdings when market conditions change." },
];

function FlowStep({ step, last }: { step: Flow; last: boolean }) {
  return (
    <div className="relative flex gap-5 pb-8 last:pb-0">
      {/* spine + node */}
      <div className="relative flex flex-col items-center">
        <span className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface font-mono text-sm text-fg">
          {step.n}
        </span>
        {!last && (
          <span aria-hidden className="absolute top-9 h-full w-px bg-line" />
        )}
      </div>
      {/* content */}
      <div className="flex-1 pt-1">
        <ActorTag actor={step.actor} />
        <p className="mt-2 text-base leading-relaxed text-fg">{step.text}</p>
      </div>
    </div>
  );
}

export function FlowTimeline() {
  return (
    <div className="mt-12 max-w-2xl">
      {FLOW.map((step, i) => (
        <Reveal key={step.n} delay={Math.min(i, 4) * 0.05}>
          <FlowStep step={step} last={i === FLOW.length - 1} />
        </Reveal>
      ))}
    </div>
  );
}
