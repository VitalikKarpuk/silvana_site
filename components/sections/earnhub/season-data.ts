/* Season config (static placeholder until wired to the live season feed).
   Lives in a plain module — NOT a "use client" file — so it can be imported by
   both the server page (app/earnhub/page.tsx) and the client season components
   below. Exporting it from the "use client" module instead would hand the
   server a client-reference proxy whose fields read as undefined during SSR. */

export const SEASON = {
  number: 3,
  startsISO: "2026-06-01",
  endsISO: "2026-06-30",
  startLabel: "Jun 1",
  endLabel: "Jun 30",
  prizePool: 250000,
  topPrize: "50,000 CC",
} as const;

export function daysRemaining(endISO: string) {
  const end = new Date(`${endISO}T23:59:59Z`).getTime();
  const diff = end - Date.now();
  return Math.max(0, Math.ceil(diff / 86_400_000));
}
