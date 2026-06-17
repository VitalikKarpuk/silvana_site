"use client";

/* Shared primitives for the home-v2 sections: scroll reveal, count-up, the
   eyebrow/label kickers, the band wrapper, section heading, and arrow link.
   EASE is the house easing curve reused across motion in every section. */

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";

export const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

// Count-up to `value` on mount (eased), reduced-motion safe. With `live` it
// keeps drifting up afterwards so a running total reads as live.
export function Counter({
  value,
  prefix = "",
  live = false,
}: {
  value: number;
  prefix?: string;
  live?: boolean;
}) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);
  useEffect(() => {
    if (reduce) {
      setN(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1500;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, value]);
  useEffect(() => {
    if (reduce || !live) return;
    const id = setInterval(
      () => setN((v) => v + Math.round(80 + Math.random() * 360)),
      3200,
    );
    return () => clearInterval(id);
  }, [reduce, live]);
  return (
    <>
      {prefix}
      {n.toLocaleString("en-US")}
    </>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
      {children}
    </span>
  );
}

// Small uppercase kicker — sits above section headlines.
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center font-mono text-xs uppercase tracking-[0.2em] text-accent">
      {children}
    </span>
  );
}

// Full-width band with generous vertical rhythm and a hairline top rule.
export function Band({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`border-t border-line ${className}`}>
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  center = false,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="display mt-4 text-3xl text-fg sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {sub && (
        <p className={`mt-4 max-w-xl text-lg text-muted ${center ? "mx-auto" : ""}`}>
          {sub}
        </p>
      )}
    </Reveal>
  );
}

export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group/al inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover ${className}`}
    >
      {children}
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 transition-transform group-hover/al:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}
