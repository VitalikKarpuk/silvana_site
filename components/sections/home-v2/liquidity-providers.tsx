"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, SectionHead } from "./shared";

// Liquidity providers (ported from the v1 section). The motif is a two-sided
// private quote ladder: teal bids ↔ spread ↔ magenta asks ("quote both sides"),
// edges fade into the page ("keep your book to yourself"), and the bars breathe
// slowly from the spread outward ("agents keep quotes fresh while you sleep").
const BIDS = [92, 74, 60, 46, 30];
const ASKS = [88, 70, 58, 40, 26];

export function LiquidityProviders() {
  const reduce = useReducedMotion();

  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
        <SectionHead
          center
          eyebrow="For liquidity providers"
          title="Quote both sides. Keep your book to yourself."
          sub="Grid orders and RFQ provision on private rails — your inventory, spreads, and pricing logic stay invisible to the market. Configure depth and risk once; agents keep quotes fresh while you sleep. Every settled fill counts toward EarnHub rewards."
        />

        <Reveal delay={0.1}>
          {/* two-sided private quote ladder */}
          <div
            className="mx-auto mt-12 flex max-w-110 flex-col gap-1.5"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent)",
            }}
          >
            {BIDS.map((bid, i) => (
              <div key={i} className="grid h-3 grid-cols-[1fr_14px_1fr] items-center">
                <motion.span
                  className="h-full justify-self-end rounded-l-sm"
                  style={{
                    width: `${bid}%`,
                    transformOrigin: "right",
                    background:
                      "linear-gradient(90deg, rgba(25,200,176,0.12), rgba(25,200,176,0.55))",
                  }}
                  animate={reduce ? undefined : { scaleX: [1, 0.965, 1] }}
                  transition={{
                    duration: 3 + i * 0.25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.18,
                  }}
                />
                <span className="h-[140%] w-px justify-self-center bg-fg/20" />
                <motion.span
                  className="h-full justify-self-start rounded-r-sm"
                  style={{
                    width: `${ASKS[i]}%`,
                    transformOrigin: "left",
                    background:
                      "linear-gradient(90deg, rgba(214,68,143,0.55), rgba(214,68,143,0.12))",
                  }}
                  animate={reduce ? undefined : { scaleX: [1, 0.965, 1] }}
                  transition={{
                    duration: 3.2 + i * 0.25,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.18 + 0.4,
                  }}
                />
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-center gap-1.5 font-mono text-[11px] tracking-wide text-muted/70">
            <svg
              width="11"
              height="11"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.4}
              aria-hidden
            >
              <rect x="3" y="7" width="10" height="7" rx="1.5" />
              <path d="M5 7V5a3 3 0 016 0v2" />
            </svg>
            Your book · private
          </div>

          <Link
            href="/solutions/who-can-use"
            className="mt-8 inline-block text-sm font-medium text-data hover:text-fg"
          >
            See how liquidity works on Silvana →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
