"use client";

/* Interactive pieces of the Solutions → Case studies page.
   - StatRow: the three-up stat strip under each case. Numeric stats count up on
     scroll-in via the shared Counter (reduced-motion safe); the rest render as
     static display figures with a mono label beneath. Accent is reserved for the
     numbers, per the spec ("accent reserved for stats and CTAs").
   The case narrative, quote, and link are plain server markup on the page. */

import { Counter, Reveal } from "@/components/sections/home-v2/shared";

export type Stat =
  | { value: number; prefix?: string; suffix?: string; label: string }
  | { display: string; label: string };

export function StatRow({ stats }: { stats: Stat[] }) {
  return (
    <Reveal delay={0.06}>
      <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
        {stats.map((s, i) => (
          <div key={i} className="flex flex-col bg-surface px-6 py-7">
            <dt className="display text-3xl text-accent sm:text-4xl">
              {"display" in s ? (
                s.display
              ) : (
                <>
                  <Counter value={s.value} prefix={s.prefix} />
                  {s.suffix}
                </>
              )}
            </dt>
            <dd className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-muted">
              {s.label}
            </dd>
          </div>
        ))}
      </dl>
    </Reveal>
  );
}
