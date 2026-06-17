"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Eyebrow, Reveal } from "./shared";

// Content ported from the v1 section (components/sections/home/institutions.tsx);
// the background image + scrim are kept from the v2 treatment.
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

// Text-free symbol marks extracted from the partner wordmarks, rendered
// monochrome via CSS mask: the mark uses the theme foreground (black on light,
// white in dark) so it reads as a clean black-and-white icon in a neutral chip.
const ICONS: Record<string, string> = {
  Hecto: "/partners/hecto-icon.svg",
  Supanova: "/partners/supanova-icon.svg",
  Modo: "/partners/modo-icon.svg",
};

function Avatar({ company }: { company: string }) {
  const src = ICONS[company];
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2">
      <span
        aria-hidden
        className="h-5 w-5 bg-fg"
        style={{
          maskImage: `url(${src})`,
          WebkitMaskImage: `url(${src})`,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          maskSize: "contain",
          WebkitMaskSize: "contain",
        }}
      />
    </span>
  );
}

export function Institutions() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative overflow-hidden border-t border-line">
      {/* background image + scrim so the copy stays legible over it */}
      <Image
        src="/images/sections/institutions.png"
        alt=""
        fill
        aria-hidden
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-linear-to-b from-bg/90 via-bg/70 to-bg/85"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:py-24 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>For institutions</Eyebrow>
          <h2 className="display mt-4 text-3xl text-fg sm:text-4xl md:text-5xl">
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
                    className="group flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface-2"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <Avatar company={c.company} />
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
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-surface-2"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <Avatar company={c.company} />
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
                        <div className="px-5 pb-5 pt-2">
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
