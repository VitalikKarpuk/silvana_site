import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Hero } from "@/components/sections/hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal, SectionHead, ArrowLink } from "@/components/sections/home-v2/shared";
import { StatRow, type Stat } from "@/components/sections/solutions/case-studies";

export const metadata: Metadata = {
  title: "Case studies — built with Silvana",
  description:
    "How Modo, Loop Wallet, Supanova, and Hecto build on Silvana's execution, settlement, and proving layers.",
};

/* ------------------------------------------------------------------ case data */

type CaseStudy = {
  /* one or more partner marks shown monochrome above the headline */
  partners: { name: string; icon?: string }[];
  title: ReactNode;
  /* narrative paragraphs */
  body: ReactNode;
  /* optional secondary "key areas" line under the narrative */
  areas?: { label: string; items: string[] };
  stats: Stat[];
  quote: { text: string; who: string };
  href: string;
  /* alternate the band background for editorial rhythm */
  surface?: boolean;
};

const CASES: CaseStudy[] = [
  {
    partners: [{ name: "Modo", icon: "/partners/modo-icon.svg" }],
    title: "Modo brings multichain visibility to Silvana data",
    body: "Modo is a comprehensive multichain explorer and explorer-as-a-service platform: a robust multichain search engine, white-labeled explorers tailored to customer needs, cross-chain explorer services, and a versatile multichain API platform.",
    stats: [
      { value: 12, label: "chains indexed" },
      { value: 4, label: "white-label deployments" },
      { display: "1.2M", label: "monthly queries" },
    ],
    quote: {
      text: "Silvana's canonical settlement references make indexing Canton activity dramatically simpler — every transaction reconciles on the first pass.",
      who: "CTO, Modo",
    },
    href: "/about",
  },
  {
    partners: [
      { name: "Loop Wallet" },
      { name: "Supanova", icon: "/partners/supanova-icon.svg" },
    ],
    title: "The wallet layer for non-custodial DvP",
    body: "Loop Wallet and Supanova provide wallet infrastructure for Silvana Book users and applications — secure asset holding, DvP settlement participation, and interaction with agent-driven apps, all while users keep direct control of funds. Assets remain under user control until settlement finalizes.",
    areas: {
      label: "Key areas",
      items: [
        "Canton-compatible wallet infrastructure",
        "DvP settlement support",
        "non-custodial asset management",
        "onboarding and access",
        "secure transaction signing",
        "tokenized asset interaction",
      ],
    },
    stats: [
      { display: "100%", label: "non-custodial flows" },
      { display: "CIP-56", label: "support end to end" },
      { display: "Thousands", label: "active users" },
    ],
    quote: {
      text: "Silvana gives our users something wallets alone never could: assets that stay under their control while agents do the work.",
      who: "Head of Product, Loop Wallet",
    },
    href: "/products/silvana-book",
    surface: true,
  },
  {
    partners: [{ name: "Hecto", icon: "/partners/hecto-icon.svg" }],
    title: "White-label rails for regulated businesses",
    body: "Silvana works with partners that need custom tokenization, execution, settlement, workflow automation, and agent infrastructure — adapted to their business processes, operational requirements, and regulatory environments. Hecto leverages Silvana's execution, proving, coordination, and settlement layers under its own branding and user experience.",
    areas: {
      label: "Example integration areas",
      items: [
        "tokenization platforms",
        "RWA marketplaces",
        "treasury management systems",
        "institutional trading venues",
        "compliance and reporting solutions",
        "enterprise workflow automation",
        "agent-powered financial applications",
        "custom settlement and reconciliation systems",
      ],
    },
    stats: [
      { value: 8, label: "integration areas" },
      { value: 3, label: "regulatory environments" },
      { display: "Weeks", label: "not quarters, to launch" },
    ],
    quote: {
      text: "We kept our brand and our UX, and swapped in institutional-grade settlement underneath. That's the trade every platform should want.",
      who: "CEO, Hecto",
    },
    href: "/solutions",
  },
];

/* --------------------------------------------------------------- partner mark */

// Monochrome partner mark in a neutral chip. Uses CSS mask so the icon tracks the
// theme foreground (black on light, white in dark). Loop Wallet ships no icon —
// it renders as a clean wordmark chip instead.
function PartnerMark({ name, icon }: { name: string; icon?: string }) {
  if (!icon) {
    return (
      <span className="inline-flex h-9 items-center rounded-lg border border-line bg-surface-2 px-3 text-sm font-semibold text-fg">
        {name}
      </span>
    );
  }
  return (
    <span className="flex h-9 items-center gap-2 rounded-lg border border-line bg-surface-2 px-3">
      <span
        aria-hidden
        className="h-5 w-5 bg-fg"
        style={{
          maskImage: `url(${icon})`,
          WebkitMaskImage: `url(${icon})`,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          maskSize: "contain",
          WebkitMaskSize: "contain",
        }}
      />
      <span className="text-sm font-semibold text-fg">{name}</span>
    </span>
  );
}

/* ----------------------------------------------------------------- case block */

function CaseBlock({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <section
      className={`border-t border-line ${study.surface ? "bg-surface" : ""}`}
    >
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* left rail — partner marks + index */}
          <div className="lg:col-span-4">
            <Reveal>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                Case {String(index + 1).padStart(2, "0")}
              </span>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                {study.partners.map((p) => (
                  <PartnerMark key={p.name} name={p.name} icon={p.icon} />
                ))}
              </div>
            </Reveal>
          </div>

          {/* right column — narrative, stats, quote, link */}
          <div className="lg:col-span-8">
            <SectionHead title={study.title} className="max-w-3xl" />

            <Reveal delay={0.04}>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">
                {study.body}
              </p>
            </Reveal>

            {study.areas && (
              <Reveal delay={0.06}>
                <div className="mt-7">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                    {study.areas.label}
                  </span>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {study.areas.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line bg-bg px-3 py-1.5 text-sm text-fg"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}

            <StatRow stats={study.stats} />

            <Reveal delay={0.08}>
              <figure className="mt-10 border-l-2 border-accent/40 pl-6">
                <blockquote className="display text-xl leading-relaxed text-fg sm:text-2xl">
                  “{study.quote.text}”
                </blockquote>
                <figcaption className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-muted">
                  {study.quote.who}
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8">
                <ArrowLink href={study.href}>Read the story</ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- page */

export default function CaseStudiesPage() {
  return (
    <>
      <Hero
        eyebrow="Case studies"
        headline="Built with the ecosystem."
        subhead="Explorers, wallets, and white-label partners shipping on Silvana's rails."
        primary={{ label: "Talk to the team", href: "/about" }}
        secondary={{ label: "Explore solutions", href: "/solutions" }}
      />

      {CASES.map((study, i) => (
        <CaseBlock key={i} study={study} index={i} />
      ))}

      <CtaBand
        headline="Building something on Silvana?"
        primary={{ label: "Talk to the team", href: "/about" }}
        secondary={{ label: "Go to Build", href: "/app" }}
      />
    </>
  );
}
