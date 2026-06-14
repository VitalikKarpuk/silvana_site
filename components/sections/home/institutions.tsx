"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";

// Per HomePage.md: only the expanded Hecto row carries a stat strip + products
// line (stats are [filler], to swap before publish). Supanova and Modo are
// single-line rows — no fabricated stats.
type Case = {
  company: string;
  logo: string;
  line: string;
  stats?: string;
  products?: string;
};

const CASES: Case[] = [
  {
    company: "Hecto",
    logo: "/partners/hecto.svg",
    line: "Hecto builds white-label settlement rails on Silvana.",
    stats: "8 integration areas · 3 regulatory environments · weeks, not quarters, to launch",
    products: "Products used: Silvana Book, Agentic API, proving agents.",
  },
  {
    company: "Supanova",
    logo: "/partners/supanova.svg",
    line: "Supanova embeds agent-driven trading directly in its wallet.",
  },
  {
    company: "Modo",
    logo: "/partners/modo.svg",
    line: "Modo indexes Canton settlement activity in real time on Silvana data.",
  },
];

function Logo({ src, alt, mono = true }: { src: string; alt: string; mono?: boolean }) {
  return (
    // Sized to the sentence's cap-height (~14px) so logo and label read as one
    // line — full-height wordmarks otherwise dwarf the 14px text and the label
    // looks vertically off. block + items-center on the row keeps it centered.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`block h-3.5 w-auto shrink-0 opacity-70 ${mono ? "filter-[brightness(0)_invert(1)]" : ""}`}
    />
  );
}

export function Institutions() {
  const [open, setOpen] = useState(0);

  return (
    <section className="border-b border-line">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:py-24 lg:grid-cols-2">
        <Reveal>
          <div className="text-sm font-medium uppercase tracking-wider text-data">
            Silvana for institutions
          </div>
          <h2 className="display mt-4 text-3xl text-fg sm:text-4xl">
            Trade size without showing your hand.
          </h2>
          <p className="mt-5 text-muted">
            Run OTC and block flows through private RFQ. Settle atomically via DvP on
            Canton — no counterparty risk, no partial states. And when reporting season
            comes, hand over ZK proofs instead of spreadsheets: selective disclosure means
            full accountability with zero exposure.
          </p>
          <p className="mt-4 text-sm text-muted">
            Confidentiality, deterministic execution, and compliance-ready proofs —
            infrastructure that fits how institutions actually operate.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass divide-y divide-line overflow-hidden rounded-3xl">
            {CASES.map((c, i) => {
              // Rows without a stat strip are plain single lines (spec).
              if (!c.stats) {
                return (
                  <a
                    key={c.company}
                    href="/solutions/case-studies"
                    className="group flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface-2"
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <Logo src={c.logo} alt={c.company} mono={c.company !== "Supanova"} />
                      <span className="truncate text-sm text-fg">{c.line}</span>
                    </span>
                    <span className="shrink-0 text-sm text-data">
                      Read the story{" "}
                      <span className="inline-block transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </span>
                  </a>
                );
              }
              const isOpen = open === i;
              const chips = c.stats.split(" · ");
              return (
                <div key={c.company}>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface-2"
                  >
                    <span className="flex min-w-0 items-center gap-2.5">
                      <Logo src={c.logo} alt={c.company} />
                      <span className="truncate text-sm text-fg">{c.line}</span>
                    </span>
                    <motion.svg
                      viewBox="0 0 16 16"
                      className="h-4 w-4 shrink-0 text-muted"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.6}
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5">
                          {/* stat strip → separated chips */}
                          <div className="flex flex-wrap gap-2">
                            {chips.map((chip) => (
                              <span
                                key={chip}
                                className="rounded-lg border border-line bg-surface-2 px-2.5 py-1 text-xs text-data"
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                          {c.products && (
                            <div className="mt-3 text-xs text-muted">{c.products}</div>
                          )}
                          <a
                            href="/solutions/case-studies"
                            className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-fg hover:text-data"
                          >
                            Read the story
                            <span className="transition-transform group-hover:translate-x-0.5">
                              →
                            </span>
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
