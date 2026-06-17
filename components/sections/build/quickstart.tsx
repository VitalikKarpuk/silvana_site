"use client";

/* Interactive pieces of the Build (developer hub) page:
   - InstallTerminal: the hero visual — a window-chrome terminal that shows the
     install/run commands with a copy-to-clipboard button (real interactivity,
     so it lives here as a client module).
   - QuickstartTabs: a small Rust / TypeScript tabbed code block framing the
     install → onboard → run flow, crossfading on tab switch.
   All motion is reduced-motion safe. */

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/sections/home-v2/shared";

/* ----------------------------------------------------------- install terminal */

const INSTALL_LINES = [
  { prompt: true, t: "curl -fsSL https://get.silvana.one | sh" },
  { prompt: false, t: "silvana 0.4.0 installed" },
  { prompt: true, t: "silvana login" },
  { prompt: false, t: "✓ authenticated as you@org" },
  { prompt: true, t: "silvana agent new my-first-agent" },
  { prompt: false, t: "✓ scaffolded · running locally on :7070" },
];

const COPY_TEXT = `curl -fsSL https://get.silvana.one | sh
silvana login
silvana agent new my-first-agent`;

export function InstallTerminal() {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(COPY_TEXT);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.4)]">
      {/* window chrome */}
      <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-line" />
          <span className="h-3 w-3 rounded-full bg-line" />
          <span className="h-3 w-3 rounded-full bg-line" />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          zsh — silvana
        </span>
        <button
          type="button"
          onClick={onCopy}
          aria-label="Copy install commands"
          className="cursor-pointer rounded-md px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:text-fg"
        >
          {copied ? "copied ✓" : "copy"}
        </button>
      </div>

      <pre className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-relaxed">
        <code>
          {INSTALL_LINES.map((l, i) =>
            l.prompt ? (
              <span key={i} className="block text-fg">
                <span className="text-accent">$ </span>
                {l.t}
              </span>
            ) : (
              <span key={i} className="block text-data">
                {l.t}
              </span>
            ),
          )}
        </code>
      </pre>
    </div>
  );
}

/* --------------------------------------------------------------- quickstart */

type CodeLine = { t: string; com?: boolean };
type Lang = { key: string; label: string; lines: CodeLine[] };

const RUST: CodeLine[] = [
  { t: "// Configure the agent and connect to Silvana", com: true },
  { t: "let agent = Agent::new(config).connect().await?;" },
  { t: "" },
  { t: "// Two-phase flow: prepare, then execute", com: true },
  { t: "let prepared = agent.prepare(intent).await?;" },
  { t: "let result = agent.execute(prepared).await?;" },
  { t: "" },
  { t: 'println!("agent live: {}", result.id);', com: false },
];

const TS: CodeLine[] = [
  { t: "// Configure the agent and connect to Silvana", com: true },
  { t: "const agent = await new Agent(config).connect();" },
  { t: "" },
  { t: "// Two-phase flow: prepare, then execute", com: true },
  { t: "const prepared = await agent.prepare(intent);" },
  { t: "const result = await agent.execute(prepared);" },
  { t: "" },
  { t: "console.log(`agent live: ${result.id}`);", com: false },
];

const LANGS: Lang[] = [
  { key: "rust", label: "Rust", lines: RUST },
  { key: "ts", label: "TypeScript", lines: TS },
];

function CodeBody({ lines }: { lines: CodeLine[] }) {
  return (
    <pre className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-relaxed">
      <code>
        {lines.map((l, i) => (
          <span
            key={i}
            className={l.com ? "block text-muted" : l.t === "" ? "block" : "block text-fg"}
          >
            {l.t === "" ? " " : l.t}
          </span>
        ))}
      </code>
    </pre>
  );
}

export function QuickstartTabs() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const lang = LANGS[active];

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between border-b border-line bg-surface px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-line" />
          <span className="h-3 w-3 rounded-full bg-line" />
          <span className="h-3 w-3 rounded-full bg-line" />
        </div>
        <div className="flex gap-1">
          {LANGS.map((l, i) => (
            <button
              key={l.key}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={active === i}
              className={`cursor-pointer rounded-md px-3 py-1 font-mono text-xs transition-colors ${
                active === i ? "bg-accent/10 text-accent" : "text-muted hover:text-fg"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={lang.key}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: EASE }}
        >
          <CodeBody lines={lang.lines} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
