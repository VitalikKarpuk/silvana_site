"use client";

import { useState } from "react";

export type CodeTab = { label: string; code: string };

// Tabbed code block — teal syntax accents, copy button, blinking cursor on run.
export function CodeTabs({ tabs }: { tabs: CodeTab[] }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(tabs[active].code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="glass overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-line bg-white/[0.04] px-3">
        <div className="flex">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setActive(i)}
              className={`px-3 py-2.5 text-xs font-medium transition-colors ${
                i === active
                  ? "text-fg"
                  : "text-muted hover:text-fg"
              }`}
            >
              {t.label}
              {i === active && (
                <span className="mt-1.5 block h-px bg-data" />
              )}
            </button>
          ))}
        </div>
        <button
          onClick={copy}
          className="text-xs text-muted transition-colors hover:text-fg"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-fg">
        <code>{tabs[active].code}</code>
        <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-data align-middle" />
      </pre>
    </div>
  );
}
