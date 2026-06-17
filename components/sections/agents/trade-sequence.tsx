"use client";

/* Interactive sequence viewer for the Agents → Use cases page.
   Spec: a Trade demo as an event timeline (monitor → RFQ → order → match →
   settle) where the active step highlights the active actor on a small system
   diagram (agent / orderbook / coordination layer / Canton) and shows that
   step's detail. Step controls + replay; auto-advance only when motion is
   allowed. Reduced-motion: no auto-advance and no transition animation —
   the stepper still works as a fully manual control.

   On desktop the timeline is horizontal and actors sit as labelled nodes; on
   mobile the timeline stacks vertically and the actors become a chip row. */

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/sections/home-v2/shared";

/* ------------------------------------------------------------------- model */

type ActorId = "agent" | "orderbook" | "coordination" | "canton";

const ACTORS: { id: ActorId; label: string; hint: string }[] = [
  { id: "agent", label: "Agent", hint: "Autonomous trader" },
  { id: "orderbook", label: "Orderbook", hint: "Silvana Book" },
  { id: "coordination", label: "Coordination", hint: "Sequencer" },
  { id: "canton", label: "Canton", hint: "Settlement ledger" },
];

type Event = {
  key: string;
  tag: string;
  title: string;
  body: string;
  active: ActorId;
  log: string;
};

const EVENTS: Event[] = [
  {
    key: "monitor",
    tag: "Monitor",
    title: "The agent watches the market",
    body: "An autonomous agent streams private orderbook data, tracking spreads and depth in real time — deciding, without a human in the loop, when conditions are worth acting on.",
    active: "agent",
    log: "agent: spread 0.0002 · depth ok · signal → act",
  },
  {
    key: "rfq",
    tag: "RFQ",
    title: "It requests quotes",
    body: "The agent broadcasts a request for quote to the orderbook. Makers respond privately — no public mempool, no leaked intent, no front-running.",
    active: "orderbook",
    log: "orderbook: RFQ 50,000 CC → 3 quotes received",
  },
  {
    key: "order",
    tag: "Order",
    title: "It places the order",
    body: "The best quote is auto-selected and the agent submits the order. Balances are validated, but nothing is escrowed and assets never leave the wallet.",
    active: "orderbook",
    log: "orderbook: order accepted @ 0.0807 · maker B",
  },
  {
    key: "match",
    tag: "Match",
    title: "The coordination layer matches",
    body: "Bids and asks match off-chain in an optimistic state. Execution feels instant — under one second — while the coordination layer prepares the atomic settlement.",
    active: "coordination",
    log: "coordination: matched · building DvP obligation",
  },
  {
    key: "settle",
    tag: "Settle",
    title: "Canton settles atomically",
    body: "The trade finalizes through atomic DvP on Canton: asset and payment swap simultaneously, only when both legs deliver. If either side falls short, it rolls back — balances untouched.",
    active: "canton",
    log: "canton: DvP settled · both legs · finalized ✓",
  },
];

const AUTO_MS = 3400;

/* ---------------------------------------------------------------- diagram */

function SystemDiagram({ active }: { active: ActorId }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          System actors
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-data">
          live
        </span>
      </div>

      {/* Actor nodes — the active one highlights. Connectors between them read
          left-to-right on desktop, top-to-bottom on mobile. */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        {ACTORS.map((a, i) => {
          const on = a.id === active;
          return (
            <div key={a.id} className="flex items-center gap-2 sm:flex-1 sm:flex-col">
              <div
                aria-current={on ? "true" : undefined}
                className={`flex w-full flex-col rounded-xl border px-3 py-3 transition-colors ${
                  on
                    ? "border-accent/50 bg-accent/10"
                    : "border-line bg-surface-2"
                }`}
              >
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.14em] ${
                    on ? "text-accent" : "text-muted"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`mt-1 text-sm font-medium ${
                    on ? "text-fg" : "text-muted"
                  }`}
                >
                  {a.label}
                </span>
                <span className="mt-0.5 text-[11px] leading-tight text-muted">
                  {a.hint}
                </span>
              </div>
              {i < ACTORS.length - 1 && (
                <span
                  aria-hidden
                  className="mx-auto h-4 w-px shrink-0 bg-line sm:h-px sm:w-4"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- viewer */

export function TradeSequence() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);

  const event = EVENTS[i];
  const last = i === EVENTS.length - 1;

  const go = useCallback((n: number) => {
    setI(((n % EVENTS.length) + EVENTS.length) % EVENTS.length);
  }, []);

  // Auto-advance only when playing and motion is allowed. Stops at the end.
  useEffect(() => {
    if (reduce || !playing) return;
    if (last) {
      setPlaying(false);
      return;
    }
    const id = setTimeout(() => setI((v) => v + 1), AUTO_MS);
    return () => clearTimeout(id);
  }, [reduce, playing, last, i]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
      {/* left: timeline + controls */}
      <div className="flex flex-col">
        {/* horizontal stepper (vertical on mobile) */}
        <ol className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-0">
          {EVENTS.map((e, idx) => {
            const on = idx === i;
            const done = idx < i;
            return (
              <li key={e.key} className="flex items-center gap-2 sm:flex-1 sm:flex-col">
                <button
                  type="button"
                  onClick={() => go(idx)}
                  aria-current={on ? "step" : undefined}
                  className={`flex w-full items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-colors sm:flex-col sm:items-start ${
                    on
                      ? "border-accent/50 bg-accent/10"
                      : "border-line bg-surface hover:border-accent/30"
                  }`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] ${
                      on
                        ? "bg-accent/15 text-accent"
                        : done
                          ? "bg-data/15 text-data"
                          : "bg-surface-2 text-muted"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span
                    className={`font-mono text-[11px] uppercase tracking-[0.14em] ${
                      on ? "text-fg" : "text-muted"
                    }`}
                  >
                    {e.tag}
                  </span>
                </button>
                {idx < EVENTS.length - 1 && (
                  <span aria-hidden className="hidden h-px w-2 shrink-0 bg-line sm:block" />
                )}
              </li>
            );
          })}
        </ol>

        {/* detail panel — crossfades between steps when motion is allowed */}
        <div className="relative mt-6 min-h-44 overflow-hidden rounded-2xl border border-line bg-surface p-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={event.key}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                Step {i + 1} / {EVENTS.length} · {event.tag}
              </span>
              <h3 className="display mt-3 text-xl text-fg sm:text-2xl">{event.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{event.body}</p>
              <pre className="mt-4 overflow-x-auto rounded-lg border border-line bg-surface-2 px-3 py-2 font-mono text-[11px] leading-relaxed text-data">
                {event.log}
              </pre>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* controls */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => go(i - 1)}
            disabled={i === 0}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-accent/30 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
            Prev
          </button>

          {!reduce && (
            <button
              type="button"
              onClick={() => {
                if (last) {
                  setI(0);
                  setPlaying(true);
                } else {
                  setPlaying((p) => !p);
                }
              }}
              aria-pressed={playing}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              {last ? (
                <>
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" /></svg>
                  Replay
                </>
              ) : playing ? (
                <>
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M7 4h3v16H7zM14 4h3v16h-3z" /></svg>
                  Pause
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M7 4v16l13-8z" /></svg>
                  Play
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={() => go(i + 1)}
            disabled={last}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-medium text-fg transition-colors hover:border-accent/30 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>

      {/* right: system diagram with active actor highlighted */}
      <div className="lg:pt-12">
        <SystemDiagram active={event.active} />
      </div>
    </div>
  );
}
