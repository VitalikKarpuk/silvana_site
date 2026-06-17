"use client";

/* Interactive piece of the Solutions → Who can use Silvana page. The page itself
   is a server component; only this audience grid needs the client, for the
   scroll-reveal stagger and the card hover affordances.

   AudienceGrid renders the ten audiences as a 5x2 grid (2x5 tablet, 1-up
   mobile), each with a role icon and a contextual deep link to the most relevant
   existing route (developers → Build, LPs → Silvana Book, institutions → Trade,
   issuers → Markets, etc.). All motion is reduced-motion safe via <Reveal/>. */

import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/sections/home-v2/shared";

/* ------------------------------------------------------------------- role icons */

// Compact line icons keyed to each role. 24x24, currentColor, 1.6 stroke.
type IconProps = { className?: string };

const Icons = {
  developer: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />
    </svg>
  ),
  marketMaker: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 19V5M4 19h16M8 16l4-6 3 3 4-7" />
    </svg>
  ),
  treasury: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 10 12 4l9 6M5 10v8M19 10v8M9 10v8M15 10v8M3 18h18" />
    </svg>
  ),
  issuer: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v8M9.5 9.5h4a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h4" />
    </svg>
  ),
  institution: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 10 12 4l9 6M5 10v8M19 10v8M9 18v-5M15 18v-5M3 21h18" />
    </svg>
  ),
  corporate: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M8 7h3M8 11h3M8 15h3M15 7h1M15 11h1M15 15h1" />
    </svg>
  ),
  auditor: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5M8 11l2 2 4-4" />
    </svg>
  ),
  accounting: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M8 7h8M8 11h2M14 11h2M8 15h2M14 15h2" />
    </svg>
  ),
  government: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3 3 8h18zM5 8v9M9 8v9M15 8v9M19 8v9M3 21h18" />
    </svg>
  ),
  researcher: (p: IconProps) => (
    <svg viewBox="0 0 24 24" className={p.className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M9 3v6.5L4.5 18a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L15 9.5V3M8 3h8M8 14h8" />
    </svg>
  ),
} satisfies Record<string, (p: IconProps) => ReactNode>;

/* ------------------------------------------------------------------- audiences */

type Audience = {
  title: string;
  body: string;
  cta: string;
  href: string;
  icon: keyof typeof Icons;
};

// Each audience deep-links to the most relevant existing route.
const AUDIENCES: Audience[] = [
  {
    title: "AI developers",
    body: "Build agents that observe, decide, and act on tokenized assets.",
    cta: "Start building",
    href: "/agents",
    icon: "developer",
  },
  {
    title: "Market makers & LPs",
    body: "Run private strategies without exposing inventory, intent, or pricing logic.",
    cta: "Explore Silvana Book",
    href: "/products/silvana-book",
    icon: "marketMaker",
  },
  {
    title: "Treasuries & DAOs",
    body: "Asset management, portfolio rebalancing, and treasury operations.",
    cta: "Open the app",
    href: "/app",
    icon: "treasury",
  },
  {
    title: "Token issuers & RWA platforms",
    body: "Trade tokenized assets and make them accessible to agents from day one.",
    cta: "Explore Trade",
    href: "/solutions/trade",
    icon: "issuer",
  },
  {
    title: "Financial institutions",
    body: "Asset management, compliance checks, audit, and due diligence.",
    cta: "Explore Trade",
    href: "/solutions/trade",
    icon: "institution",
  },
  {
    title: "Corporate finance teams",
    body: "Payments, approvals, reporting, and financial operations.",
    cta: "See the API",
    href: "/products/agentic-api",
    icon: "corporate",
  },
  {
    title: "Auditors",
    body: "Check business activity, balances, and policies for compliance.",
    cta: "Read the docs",
    href: "https://docs.silvana.one",
    icon: "auditor",
  },
  {
    title: "Accounting & operations",
    body: "Reconcile records across business units, wallets, apps, and systems.",
    cta: "See the API",
    href: "/products/agentic-api",
    icon: "accounting",
  },
  {
    title: "Government agencies",
    body: "Streamline official registries, identity systems, and public-sector workflows.",
    cta: "Talk to the team",
    href: "/about",
    icon: "government",
  },
  {
    title: "Researchers",
    body: "Reliable data, technical confidence, insights, asset-flow and activity tracking.",
    cta: "Read the thesis",
    href: "/thesis",
    icon: "researcher",
  },
];

function AudienceCard({ a }: { a: Audience }) {
  const Icon = Icons[a.icon];
  const external = a.href.startsWith("http");
  const arrow = (
    <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-accent">
      {a.cta}
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
  const inner = (
    <>
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface-2 text-accent transition-colors group-hover:border-accent/30 group-hover:bg-accent/10">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className="display mt-5 text-lg text-fg">{a.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{a.body}</p>
      {arrow}
    </>
  );
  const cls =
    "group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent/30";

  if (external) {
    return (
      <a href={a.href} target="_blank" rel="noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={a.href} className={cls}>
      {inner}
    </Link>
  );
}

export function AudienceGrid() {
  return (
    <div className="mt-12 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
      {AUDIENCES.map((a, i) => (
        <Reveal key={a.title} delay={(i % 5) * 0.05}>
          <AudienceCard a={a} />
        </Reveal>
      ))}
    </div>
  );
}
