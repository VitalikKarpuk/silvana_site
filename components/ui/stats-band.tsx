"use client";

import { CountUp } from "@/components/ui/count-up";
import { motion } from "framer-motion";

export type Stat = {
  // Either a numeric value (count-up) or a static display string.
  value?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  display?: string;
  label: string;
};

export function StatsBand({
  stats,
  note,
  srHeading,
}: {
  stats: Stat[];
  note?: string;
  srHeading?: string;
}) {
  const cols =
    stats.length === 3
      ? "sm:grid-cols-3"
      : stats.length === 2
        ? "sm:grid-cols-2"
        : "grid-cols-2 md:grid-cols-4";

  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-7xl px-6 py-20">
        {srHeading && <h2 className="sr-only">{srHeading}</h2>}

        <div className={`grid grid-cols-1 gap-y-10 ${cols} sm:divide-x sm:divide-line`}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="group sm:px-8 sm:first:pl-0"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              {/* short accent rule above each metric; widens on hover */}
              <motion.span
                className="block h-px w-8 origin-left rounded-full transition-[width] duration-300 [transition-timing-function:var(--ease-out)] group-hover:w-12"
                style={{
                  background: "linear-gradient(90deg, var(--accent), var(--data))",
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 + 0.15 }}
              />

              {/* metallic-sheen number — soft top→bottom sheen, never fades out
                  so glyphs read fully. Generous line-height + padding so the
                  bg-clip-text box fully contains the glyphs (no top/bottom clip) */}
              <div
                className="display tnum mt-6 bg-clip-text py-1 text-[2.75rem] leading-[1.3] text-transparent sm:text-6xl"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg, #ffffff 45%, rgba(233,235,240,0.78))",
                }}
              >
                {s.display ?? (
                  <CountUp
                    value={s.value ?? 0}
                    prefix={s.prefix}
                    suffix={s.suffix}
                    decimals={s.decimals}
                  />
                )}
              </div>

              <div className="mt-4 text-sm leading-relaxed text-balance text-muted">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {note && (
          <p className="mt-12 flex items-center gap-2 text-xs text-muted">
            <motion.span
              className="inline-block h-1.5 w-1.5 rounded-full bg-data"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
            {note}
          </p>
        )}
      </div>
    </section>
  );
}
