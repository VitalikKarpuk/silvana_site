import type { ReactElement } from "react";
import { Band, Reveal, SectionHead } from "./shared";

/* Mono-line stat glyphs — one per metric, drawn with currentColor so they take
   the parent's color. Used here as oversized, faded corner watermarks. The
   className controls the rendered size/color. */

function SpeedGlyph({ className }: { className?: string }) {
  // Lightning bolt — sub-second order matching.
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 5 13h6l-1 9 9-12h-6l1-8Z" />
    </svg>
  );
}

function SettlementGlyph({ className }: { className?: string }) {
  // Shield with a check — atomic settlement: full or rollback, guaranteed.
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 11.5 2 2 4-4" />
    </svg>
  );
}

function MarketsGlyph({ className }: { className?: string }) {
  // Rising bars on an axis — live markets and growing volume.
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4v16h16" />
      <path d="M9 17v-4M13 17v-7M17 17v-10" />
    </svg>
  );
}

function AgentsGlyph({ className }: { className?: string }) {
  // Bot — autonomous agents deployed and running.
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="8" width="14" height="11" rx="3" />
      <path d="M12 8V5" />
      <circle cx="12" cy="4" r="1" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="13" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="13" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const STATS: { value: string; label: string; Glyph: (p: { className?: string }) => ReactElement }[] = [
  { value: "<1s", label: "order matching, off-chain and optimistic", Glyph: SpeedGlyph },
  { value: "100%", label: "atomic settlement: every trade settles in full or rolls back", Glyph: SettlementGlyph },
  { value: "3", label: "live markets, with more launching every season", Glyph: MarketsGlyph },
  { value: "1,240+", label: "agents deployed and running", Glyph: AgentsGlyph },
];

export function Stats() {
  return (
    <Band>
      <SectionHead center eyebrow="Silvana by the numbers" title="Built for production volume." />
      <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map(({ value, label, Glyph }, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div className="relative flex h-full flex-col overflow-hidden bg-surface p-7">
              {/* oversized corner watermark — bleeds off the top-right edge */}
              <Glyph
                className="pointer-events-none absolute -right-4 -top-4 h-28 w-28 text-accent/10"
              />
              <div className="display tnum relative text-5xl text-fg lg:text-6xl">{value}</div>
              <p className="relative mt-3 max-w-[24ch] text-sm text-muted">{label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Band>
  );
}
