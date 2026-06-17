"use client";

/* Interactive pieces of the Products → SDK page:
   - CodeWindow: a window-chrome card (terminal style) holding a tabbed view of
     the agent.toml config and the CLI commands. Teal syntax accents, a copy
     button per panel, and a blinking cursor on the active `run` command — the
     visual anchor of the "From zero to running agent" section.
   All motion is reduced-motion safe. */

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/sections/home-v2/shared";

/* Raw text for the copy button — kept in sync with the rendered panels. */
const AGENT_TOML = `# agent.toml — your strategy, in one file
[market]
pair     = "CC/USDC"
mid      = "orderbook"

[grid]
spread   = 0.0008
levels   = 6
size     = 2_500
rebalance = "on_move"

[signing]
mode     = "local"  # key never leaves the agent`;

const CLI_TEXT = `# 1 · install the CLI
$ npm i -g @silvana/cli

# 2 · onboard with your invite code
$ silvana onboard --invite SLV-7F3A

# 3 · run it
$ silvana run --strategy grid`;

/* ----------------------------------------------------------------- code panels */

type Line = ReactNode;

// agent.toml — strategy config the operator tunes (step 2).
function ConfigPanel() {
  return (
    <pre className="overflow-x-auto px-5 py-4 font-mono text-xs leading-relaxed text-fg sm:text-[13px]">
      <code>
        <span className="text-muted"># agent.toml — your strategy, in one file</span>
        {"\n"}
        <span className="text-data">[market]</span>
        {"\n"}
        pair{"     "}= <span className="text-accent">&quot;CC/USDC&quot;</span>
        {"\n"}
        mid{"      "}= <span className="text-accent">&quot;orderbook&quot;</span>
        {"\n\n"}
        <span className="text-data">[grid]</span>
        {"\n"}
        spread{"   "}= <span className="text-fg">0.0008</span>
        {"\n"}
        levels{"   "}= <span className="text-fg">6</span>
        {"\n"}
        size{"     "}= <span className="text-fg">2_500</span>
        {"\n"}
        rebalance{" "}= <span className="text-accent">&quot;on_move&quot;</span>
        {"\n\n"}
        <span className="text-data">[signing]</span>
        {"\n"}
        mode{"     "}= <span className="text-accent">&quot;local&quot;</span>
        {"  "}
        <span className="text-muted"># key never leaves the agent</span>
      </code>
    </pre>
  );
}

// CLI — install, onboard, run (steps 1 & 3). The final line carries the cursor.
function CliPanel({ blink }: { blink: boolean }) {
  return (
    <pre className="overflow-x-auto px-5 py-4 font-mono text-xs leading-relaxed text-fg sm:text-[13px]">
      <code>
        <span className="text-muted"># 1 · install the CLI</span>
        {"\n"}
        <span className="text-data">$</span> npm i -g{" "}
        <span className="text-accent">@silvana/cli</span>
        {"\n\n"}
        <span className="text-muted"># 2 · onboard with your invite code</span>
        {"\n"}
        <span className="text-data">$</span> silvana onboard{" "}
        <span className="text-accent">--invite</span> SLV-7F3A
        {"\n\n"}
        <span className="text-muted"># 3 · run it</span>
        {"\n"}
        <span className="text-data">$</span> silvana run{" "}
        <span className="text-accent">--strategy</span> grid
        <span
          aria-hidden
          className={`ml-1 inline-block h-3.5 w-2 translate-y-px bg-data align-middle ${
            blink ? "motion-safe:animate-[mock-blink_1s_step-end_infinite]" : ""
          }`}
        />
      </code>
    </pre>
  );
}

/* --------------------------------------------------------------- code window */

const PANELS = [
  { key: "config", label: "agent.toml", copy: AGENT_TOML },
  { key: "cli", label: "CLI", copy: CLI_TEXT },
] as const;

export function CodeWindow() {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(PANELS[active].copy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.4)]">
      {/* window chrome */}
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-accent/30" />
          <span className="h-3 w-3 rounded-full bg-data/30" />
          <span className="h-3 w-3 rounded-full bg-muted/30" />
        </span>
        <div className="ml-2 flex gap-1">
          {PANELS.map((p, i) => (
            <button
              key={p.key}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={`cursor-pointer rounded-md px-3 py-1 font-mono text-xs transition-colors ${
                active === i
                  ? "bg-surface text-fg"
                  : "text-muted hover:text-fg"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="ml-auto inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:text-fg"
        >
          {copied ? (
            <>
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-data" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              Copied
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* panel body — crossfades on tab switch */}
      <div className="relative min-h-76 bg-surface-2">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            {active === 0 ? <ConfigPanel /> : <CliPanel blink={!reduce} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
