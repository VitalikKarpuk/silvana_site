"use client";

/* Interactive piece of the Products → Agentic API page:
   - CodeTabs: a small Rust / TypeScript tabbed code block showing the
     prepare → execute two-phase flow in ~10 lines, framed like a terminal
     window-chrome card. The active tab crossfades on switch.
   All motion is reduced-motion safe. */

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/sections/home-v2/shared";

/* ------------------------------------------------------------------- snippets */

type Lang = { key: string; label: string; lines: CodeLine[] };
type CodeLine = { t: string; c?: "kw" | "fn" | "str" | "com" | "var" };

// Each line is split into a few tone-tagged spans so the code reads as code
// without pulling in a syntax-highlighter dependency.
const RUST: CodeLine[] = [
  { t: "// 1. Prepare — the API builds the tx and returns payload + hash", c: "com" },
  { t: "let prepared = ledger.prepare_transfer(req).await?;" },
  { t: "" },
  { t: "// 2. Sign locally — private keys never leave the client", c: "com" },
  { t: "let sig = signer.sign(&prepared.hash);" },
  { t: "" },
  { t: "// 3. Execute — submit the signature, get the update id", c: "com" },
  { t: "let res = ledger.execute(prepared.payload, sig).await?;" },
  { t: 'println!("settled: {}", res.update_id);' },
];

const TS: CodeLine[] = [
  { t: "// 1. Prepare — the API builds the tx and returns payload + hash", c: "com" },
  { t: "const prepared = await ledger.prepareTransfer(req);" },
  { t: "" },
  { t: "// 2. Sign locally — private keys never leave the client", c: "com" },
  { t: "const sig = signer.sign(prepared.hash);" },
  { t: "" },
  { t: "// 3. Execute — submit the signature, get the update id", c: "com" },
  { t: "const res = await ledger.execute(prepared.payload, sig);" },
  { t: "console.log(`settled: ${res.updateId}`);" },
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
            className={
              l.c === "com"
                ? "block text-muted"
                : l.t === ""
                  ? "block"
                  : "block text-fg"
            }
          >
            {l.t === "" ? " " : l.t}
          </span>
        ))}
      </code>
    </pre>
  );
}

export function CodeTabs() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const lang = LANGS[active];

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.4)]">
      {/* window chrome + tab triggers */}
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
                active === i
                  ? "bg-accent/10 text-accent"
                  : "text-muted hover:text-fg"
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
