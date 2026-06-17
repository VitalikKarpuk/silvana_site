"use client";

/* Interactive pieces of the Solutions (landing) page. The page itself is a
   server component; only the card grids need the client for the scroll-reveal
   stagger and hover affordances.

   - UseCaseGrid: the use-case routing grid. The Trade card is "Live" and leads
     the grid (spans wider on large screens); every other use case is a roadmap
     item rendered as a non-linking card with a "Coming soon" chip, since those
     detail routes don't exist yet.
   - AudienceGrid: "Who can use Silvana" — a dense responsive grid of audiences,
     each routing to a relevant existing page.
   - CaseStudyRow: three named case studies, all routing to the case-studies hub.

   All motion is reduced-motion safe via <Reveal/>. */

import Link from "next/link";
import { Reveal } from "@/components/sections/home-v2/shared";

/* ------------------------------------------------------------------ use cases */

type UseCase = {
  title: string;
  body: string;
  href?: string; // omitted → roadmap card (Coming soon, non-link)
  live?: boolean; // the lead card
};

// Trade is live and leads the grid. Everything else is roadmap: no detail page
// yet, so these render as non-links with a "Coming soon" chip (per the brief).
const USE_CASES: UseCase[] = [
  {
    title: "Trade",
    body: "Private orderbook with atomic settlement. Match off-chain in milliseconds, settle on Canton with deterministic DvP — strategies never touch a public mempool.",
    href: "/solutions/trade",
    live: true,
  },
  {
    title: "Commerce",
    body: "Agentic checkout and machine-to-machine payments that settle the instant goods or services are delivered.",
  },
  {
    title: "Margin",
    body: "Collateralized positions with rollback-protected settlement — no custodial middleman holding your assets.",
  },
  {
    title: "Payroll",
    body: "Programmatic, multi-asset disbursement that pays out atomically and proves itself without exposing balances.",
  },
  {
    title: "Loans",
    body: "Origination, drawdown, and repayment as atomic obligations — both legs settle together or neither does.",
  },
  {
    title: "Risk compliance check",
    body: "Policy and signing rules enforced at the settlement layer, so every obligation clears its checks before it finalizes.",
  },
  {
    title: "Audit & due diligence",
    body: "Proving agents generate ZK proofs of activity — verify what happened without revealing a single transaction.",
  },
  {
    title: "Account reconciliation",
    body: "Ledgers that agree by construction. Atomic settlement removes the breaks reconciliation exists to chase.",
  },
  {
    title: "Treasury management",
    body: "Move, allocate, and settle treasury positions through autonomous agents under tightly scoped permissions.",
  },
];

function ComingSoonChip() {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-surface-2 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
      Coming soon
    </span>
  );
}

function LiveChip() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-data/40 bg-data/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-data">
      <span className="h-1.5 w-1.5 rounded-full bg-data" />
      Live
    </span>
  );
}

function UseCaseCard({ uc }: { uc: UseCase }) {
  const inner = (
    <div
      className={`flex h-full flex-col rounded-2xl border p-7 transition-colors ${
        uc.live
          ? "border-data/40 bg-data/5"
          : uc.href
            ? "border-line bg-surface hover:border-accent/30"
            : "border-line bg-surface"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="display text-xl text-fg">{uc.title}</h3>
        {uc.live ? <LiveChip /> : <ComingSoonChip />}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted">{uc.body}</p>
      {uc.href && (
        <div className="mt-auto pt-6">
          <span className="group/al inline-flex items-center gap-1.5 text-sm font-medium text-accent">
            Explore {uc.title}
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 transition-transform group-hover/al:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      )}
    </div>
  );

  if (uc.href) {
    return (
      <Link href={uc.href} className="group block h-full">
        {inner}
      </Link>
    );
  }
  return inner;
}

export function UseCaseGrid() {
  const [lead, ...rest] = USE_CASES;
  return (
    <div className="mt-12 grid items-stretch gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {/* The Trade card leads — spans the full width on large screens. */}
      <Reveal className="md:col-span-2 lg:col-span-3">
        <UseCaseCard uc={lead} />
      </Reveal>
      {rest.map((uc, i) => (
        <Reveal key={uc.title} delay={(i % 3) * 0.06}>
          <UseCaseCard uc={uc} />
        </Reveal>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ audiences */

type Audience = { title: string; href: string };

// Every audience routes to a real, existing page that speaks to them.
const AUDIENCES: Audience[] = [
  { title: "AI developers", href: "/agents/use-cases" },
  { title: "Market makers & LPs", href: "/products/silvana-book" },
  { title: "Treasuries & DAOs", href: "/solutions/who-can-use" },
  { title: "Token issuers & RWA platforms", href: "/solutions/who-can-use" },
  { title: "Financial institutions", href: "/solutions/who-can-use" },
  { title: "Corporate finance teams", href: "/solutions/who-can-use" },
  { title: "Auditors", href: "/solutions/who-can-use" },
  { title: "Accounting & operations", href: "/solutions/who-can-use" },
  { title: "Government agencies", href: "/solutions/who-can-use" },
  { title: "Researchers", href: "/thesis" },
];

export function AudienceGrid() {
  return (
    <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {AUDIENCES.map((a, i) => (
        <Reveal key={a.title} delay={(i % 3) * 0.05}>
          <Link
            href={a.href}
            className="group flex h-full items-center justify-between gap-3 bg-surface p-6 transition-colors hover:bg-surface-2"
          >
            <span className="display text-lg text-fg">{a.title}</span>
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:text-accent"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- case studies */

type CaseStudy = { name: string; body: string };

const CASE_STUDIES: CaseStudy[] = [
  {
    name: "Modo",
    body: "How Modo built on Silvana to settle without exposure.",
  },
  {
    name: "Loop Wallet & Supanova",
    body: "Wallet and infrastructure teams composing agentic flows on Canton.",
  },
  {
    name: "Hecto",
    body: "Atomic settlement in production for real-world value transfer.",
  },
];

export function CaseStudyRow() {
  return (
    <div className="mt-12 grid items-stretch gap-4 md:grid-cols-3 lg:gap-6">
      {CASE_STUDIES.map((cs, i) => (
        <Reveal key={cs.name} delay={i * 0.08}>
          <Link
            href="/solutions/case-studies"
            className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-accent/30"
          >
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              Case study
            </span>
            <h3 className="display mt-3 text-xl text-fg">{cs.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{cs.body}</p>
            <div className="mt-auto pt-6">
              <span className="group/al inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                Read the story
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
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
