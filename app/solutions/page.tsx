import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { CtaBand } from "@/components/sections/cta-band";
import { SectionHead, ArrowLink } from "@/components/sections/home-v2/shared";
import {
  UseCaseGrid,
  AudienceGrid,
  CaseStudyRow,
} from "@/components/sections/solutions/solutions-grid";

export const metadata: Metadata = {
  title: "Solutions — use cases and audiences",
  description:
    "Same mechanism, many stories: autonomous trading today, agentic commerce, payroll, lending, compliance, and treasury next. Find your entry point.",
};

/* ----------------------------------------------------------------- use cases */

function UseCases() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          eyebrow="Use cases"
          title={
            <>
              One mechanism, <span className="text-gradient-flow">four stories</span> and counting.
            </>
          }
          sub="Trade is live today. The rest of the roadmap reuses the same primitives — private execution, atomic settlement, agentic automation — applied to a new workflow."
        />
        <UseCaseGrid />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ audiences */

function Audiences() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          eyebrow="Who can use Silvana"
          title="Built for whoever moves value."
          sub="The same settlement layer serves traders, treasuries, issuers, auditors, and the agents acting on their behalf. Find the entry point that fits you."
        />
        <AudienceGrid />
        <div className="mt-8">
          <ArrowLink href="/solutions/who-can-use">See every audience in detail</ArrowLink>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- case studies */

function CaseStudies() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          eyebrow="Case studies"
          title="Already running in production."
          sub="Teams building real products on Silvana — settling without exposure, composing agentic flows, and moving real-world value atomically."
        />
        <CaseStudyRow />
        <div className="mt-8">
          <ArrowLink href="/solutions/case-studies">Browse all case studies</ArrowLink>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- page */

export default function SolutionsPage() {
  return (
    <>
      <Hero
        eyebrow="Solutions"
        headline="Same mechanism. Many stories."
        subhead="Private execution, atomic settlement, and agentic automation apply far beyond trading. Here's what runs today, what ships next, and who it's for."
        primary={{ label: "Explore Trade", href: "/solutions/trade" }}
        secondary={{ label: "Talk to the team", href: "/about" }}
      />

      <UseCases />
      <Audiences />
      <CaseStudies />

      <CtaBand
        headline="Find your entry point."
        body="Start with what's live today, or tell us which story is yours."
        primary={{ label: "Try Silvana Book", href: "/products/silvana-book" }}
        secondary={{ label: "Read the docs", href: "https://docs.silvana.one" }}
      />
    </>
  );
}
