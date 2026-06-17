"use client";

/* Interactive pieces of the Build → Agent Space page.
   - AgentFlow: the small architecture diagram for the Silvana Book agent —
     agent → gRPC proxy → coordination layer → Canton. A signal pulse travels
     left-to-right along the chain to suggest a proxied ledger operation.
   All motion is reduced-motion safe. */

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/sections/home-v2/shared";

const NODES = [
  { key: "agent", label: "Agent", sub: "Silvana Book", tone: "accent" as const },
  { key: "grpc", label: "gRPC proxy", sub: "Silvana service", tone: "fg" as const },
  { key: "coord", label: "Coordination", sub: "Atomic DvP", tone: "data" as const },
  { key: "canton", label: "Canton", sub: "Ledger", tone: "fg" as const },
];

const toneRing: Record<"accent" | "data" | "fg", string> = {
  accent: "border-accent/40 bg-accent/5",
  data: "border-data/40 bg-data/5",
  fg: "border-line bg-surface",
};

const toneLabel: Record<"accent" | "data" | "fg", string> = {
  accent: "text-accent",
  data: "text-data",
  fg: "text-fg",
};

function Connector({ reduce }: { reduce: boolean | null }) {
  return (
    <div className="relative flex items-center justify-center px-1 py-2 lg:px-2 lg:py-0">
      {/* base rail — vertical on mobile, horizontal on desktop */}
      <span className="h-6 w-px bg-line lg:h-px lg:w-full" />
      {!reduce && (
        <motion.span
          aria-hidden
          className="absolute h-1.5 w-1.5 rounded-full bg-data shadow-[0_0_8px_2px_rgba(45,212,191,0.5)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.4, ease: EASE, repeat: Infinity, repeatDelay: 0.6 }}
        />
      )}
      {/* directional chevron */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="absolute h-3.5 w-3.5 rotate-90 text-muted lg:rotate-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export function AgentFlow() {
  const reduce = useReducedMotion();
  return (
    <div className="rounded-3xl border border-line bg-surface p-6 md:p-8">
      <div className="flex flex-col items-stretch lg:flex-row lg:items-center">
        {NODES.map((n, i) => (
          <div key={n.key} className="contents">
            <div
              className={`flex flex-1 flex-col items-center rounded-2xl border px-4 py-5 text-center ${toneRing[n.tone]}`}
            >
              <span className={`display text-base ${toneLabel[n.tone]}`}>{n.label}</span>
              <span className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                {n.sub}
              </span>
            </div>
            {i < NODES.length - 1 && <Connector reduce={reduce} />}
          </div>
        ))}
      </div>
      <p className="mt-5 text-center text-sm text-muted">
        Every ledger operation is proxied through the Silvana gRPC service. The
        agent never touches Canton directly — and the coordination layer
        guarantees DvP completes atomically.
      </p>
    </div>
  );
}
