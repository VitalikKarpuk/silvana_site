"use client";

/* Client visuals for the Our Thesis page:
   - AgenticTree: the full agentic tree — roots (ecosystems & corporate systems),
     trunk (Silvana), branches (agents & use cases). Slow draw-on, no loop
     (spec: "Slow draw-on, no loop").
   - ChainRail: a horizontal rail — Canton and Sui solid, further networks as
     faded nodes (spec: "Beyond-one-chain: a simple horizontal rail visual").
   All motion is reduced-motion safe. */

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/sections/home-v2/shared";

/* ----------------------------------------------------------------- agentic tree */

const ROOTS = ["Ecosystems", "Corporate systems"];
const BRANCHES = ["Agents", "Trading", "RWAs", "Corporations", "Use cases"];

export function AgenticTree() {
  const reduce = useReducedMotion();

  // Draw paths in: roots first (bottom-up), then trunk, then branches.
  const draw = (delay: number) =>
    reduce
      ? { pathLength: 1, opacity: 1 }
      : {
          pathLength: [0, 1],
          opacity: [0, 1],
          transition: { duration: 1.6, ease: EASE, delay },
        };

  const fade = (delay: number) =>
    reduce
      ? { opacity: 1 }
      : { opacity: [0, 1], transition: { duration: 0.6, ease: EASE, delay } };

  return (
    <div className="mx-auto max-w-3xl">
      <svg
        viewBox="0 0 360 320"
        className="h-auto w-full"
        role="img"
        aria-label="The agentic tree: roots are ecosystems and corporate systems, the trunk is Silvana, and the branches are agents and use cases."
      >
        {/* roots — fan out from the trunk base downward */}
        {[-1, -0.4, 0.4, 1].map((dir, i) => (
          <motion.path
            key={`root-${i}`}
            d={`M180 230 C ${180 + dir * 40} 260, ${180 + dir * 70} 280, ${180 + dir * 95} 300`}
            fill="none"
            stroke="var(--color-data)"
            strokeOpacity={0.55}
            strokeWidth={1.5}
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            whileInView={draw(0.1 + i * 0.08)}
            viewport={{ once: true, margin: "-80px" }}
          />
        ))}

        {/* trunk */}
        <motion.path
          d="M180 230 L180 120"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={2.5}
          strokeLinecap="round"
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          whileInView={draw(0.5)}
          viewport={{ once: true, margin: "-80px" }}
        />

        {/* branches — fan out from the trunk top */}
        {[-1, -0.5, 0, 0.5, 1].map((dir, i) => (
          <motion.path
            key={`branch-${i}`}
            d={`M180 120 C ${180 + dir * 35} 95, ${180 + dir * 70} 75, ${180 + dir * 110} 45`}
            fill="none"
            stroke="var(--color-accent)"
            strokeOpacity={0.5}
            strokeWidth={1.5}
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            whileInView={draw(0.9 + i * 0.08)}
            viewport={{ once: true, margin: "-80px" }}
          />
        ))}

        {/* trunk node — Silvana */}
        <motion.circle
          cx={180}
          cy={175}
          r={6}
          fill="var(--color-accent)"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={fade(0.6)}
          viewport={{ once: true, margin: "-80px" }}
        />
      </svg>

      {/* labels mirror the structure: branches above, trunk middle, roots below */}
      <div className="mt-6 space-y-6 text-center">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Branches — agents &amp; use cases
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {BRANCHES.map((b) => (
              <span
                key={b}
                className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs text-accent"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Trunk
          </p>
          <p className="display mt-1 text-xl text-fg">Silvana</p>
        </div>
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Roots — ecosystems &amp; corporate systems
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {ROOTS.map((r) => (
              <span
                key={r}
                className="rounded-full border border-data/30 bg-data/5 px-3 py-1 text-xs text-data"
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ chain rail */

type Node = { label: string; solid: boolean };

const CHAIN_NODES: Node[] = [
  { label: "Canton", solid: true },
  { label: "Sui", solid: true },
  { label: "More networks", solid: false },
  { label: "Corporate systems", solid: false },
];

export function ChainRail() {
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto max-w-4xl">
      <div className="relative">
        {/* the rail */}
        <span
          aria-hidden
          className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-line"
        />
        <div className="relative grid grid-cols-2 gap-y-10 sm:grid-cols-4">
          {CHAIN_NODES.map((n, i) => (
            <motion.div
              key={n.label}
              className="flex flex-col items-center text-center"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.1 }}
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-full border ${
                  n.solid
                    ? "border-accent/50 bg-accent/10 text-accent"
                    : "border-dashed border-line bg-surface text-muted"
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    n.solid ? "bg-accent" : "bg-muted/50"
                  }`}
                />
              </span>
              <span
                className={`mt-3 font-mono text-xs uppercase tracking-[0.14em] ${
                  n.solid ? "text-fg" : "text-muted"
                }`}
              >
                {n.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
