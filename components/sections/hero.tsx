"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

const EASE = [0.16, 1, 0.3, 1] as const;

// Soft blur-in rise for secondary elements.
const blurUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE, delay: 0.15 + i * 0.09 },
  }),
};

export function Hero({
  eyebrow,
  headline,
  subhead,
  primary,
  secondary,
  microcopy,
  ticker,
  visual,
}: {
  eyebrow?: string;
  headline: string;
  subhead: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  microcopy?: string;
  ticker?: ReactNode;
  visual?: ReactNode;
}) {
  const reduce = useReducedMotion();
  const words = headline.split(" ");

  // Headline: words rise from behind a mask, staggered (kinetic reveal).
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.055, delayChildren: 0.35 } },
  };
  const word = {
    hidden: { y: "120%" },
    show: { y: "0%", transition: { duration: 0.8, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* Flat editorial margin ticks — structural depth via lines. */}
      <div aria-hidden className="pointer-events-none absolute left-6 top-0 hidden h-56 w-px bg-line md:block" />
      <div aria-hidden className="pointer-events-none absolute left-[22px] top-24 hidden h-px w-2.5 bg-accent/50 md:block" />
      <div aria-hidden className="pointer-events-none absolute left-[22px] top-40 hidden h-px w-2.5 bg-line md:block" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:py-32 lg:grid-cols-[1fr_45%]">
        <div>
          {ticker && (
            <motion.div variants={blurUp} custom={0} initial="hidden" animate="show" className="mb-6">
              {ticker}
            </motion.div>
          )}
          {eyebrow && (
            <motion.div
              variants={blurUp}
              custom={0.5}
              initial="hidden"
              animate="show"
              className="mb-4 text-sm font-medium uppercase tracking-wider text-data"
            >
              {eyebrow}
            </motion.div>
          )}

          <h1 className="display text-4xl text-fg sm:text-5xl lg:text-6xl">
            {reduce ? (
              headline
            ) : (
              <motion.span variants={container} initial="hidden" animate="show" className="inline">
                {words.map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                    <motion.span variants={word} className="inline-block">
                      {w}
                      {i < words.length - 1 ? " " : ""}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            )}
          </h1>

          <motion.p
            variants={blurUp}
            custom={3}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-xl text-lg text-muted"
          >
            {subhead}
          </motion.p>

          {(primary || secondary) && (
            <motion.div
              variants={blurUp}
              custom={4}
              initial="hidden"
              animate="show"
              className="mt-8 flex flex-wrap gap-3"
            >
              {primary && <Button href={primary.href}>{primary.label}</Button>}
              {secondary && (
                <Button href={secondary.href} variant="secondary">
                  {secondary.label}
                </Button>
              )}
            </motion.div>
          )}

          {microcopy && (
            <motion.p
              variants={blurUp}
              custom={5}
              initial="hidden"
              animate="show"
              className="mt-4 text-sm text-muted"
            >
              {microcopy}
            </motion.p>
          )}
        </div>

        {visual && <div className="relative hidden lg:block">{visual}</div>}
      </div>
    </section>
  );
}
