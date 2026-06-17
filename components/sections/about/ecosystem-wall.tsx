"use client";

/* Ecosystem logo wall for the About page. Mirrors the home-v2 logo-wall
   treatment (monochrome wordmarks via brightness/invert filter, muted-to-full
   opacity on hover) but renders as a calm, static, evenly-spaced grid rather
   than a marquee — it reads as an ecosystem roster, not a banner.
   Partners without a brand SVG fall back to a styled wordmark.
   Reveals are reduced-motion safe. */

import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/sections/home-v2/shared";

type Partner =
  | { src: string; alt: string; mono: boolean; h?: string; label?: string }
  | { text: string };

// Canton + Digital Asset anchor the institutional base; the rest are wallets,
// explorers, and white-label platforms across the ecosystem.
const PARTNERS: Partner[] = [
  { src: "/partners/canton.svg", alt: "Canton Network", mono: true },
  { text: "Digital Asset" },
  { src: "/partners/loopWallet.svg", alt: "Loop Wallet", mono: true, h: "h-6", label: "Loop Wallet" },
  { src: "/partners/supanova.svg", alt: "Supanova", mono: false, h: "h-6", label: "Supanova" },
  { src: "/partners/modo.svg", alt: "Modo", mono: true },
  { src: "/partners/hecto.svg", alt: "Hecto", mono: true },
];

function Item({ p }: { p: Partner }) {
  if ("text" in p) {
    return (
      <span className="whitespace-nowrap text-lg font-semibold text-fg/55 transition-colors duration-300 hover:text-fg">
        {p.text}
      </span>
    );
  }
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={p.src}
      alt={p.label ? "" : p.alt}
      aria-hidden={p.label ? true : undefined}
      className={`${p.h ?? "h-6"} w-auto ${
        p.mono ? "filter-[brightness(0)] dark:filter-[brightness(0)_invert(1)]" : ""
      }`}
    />
  );
  if (p.label) {
    return (
      <div className="group inline-flex h-8 items-center gap-2 whitespace-nowrap opacity-55 transition-opacity duration-300 hover:opacity-100">
        {img}
        <span className="mt-1.5 text-lg font-semibold text-fg">{p.label}</span>
      </div>
    );
  }
  return (
    <span className="inline-flex h-8 items-center opacity-55 transition-opacity duration-300 hover:opacity-100">
      {img}
    </span>
  );
}

export function EcosystemWall() {
  const reduce = useReducedMotion();
  return (
    <div className="mt-12 grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-10 sm:grid-cols-3">
      {PARTNERS.map((p, i) => (
        <motion.div
          key={i}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE, delay: (i % 3) * 0.06 }}
          className="flex justify-center"
        >
          <Item p={p} />
        </motion.div>
      ))}
    </div>
  );
}
