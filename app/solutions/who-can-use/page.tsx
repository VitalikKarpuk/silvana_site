import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { CtaBand } from "@/components/sections/cta-band";
import { SectionHead } from "@/components/sections/home-v2/shared";
import { AudienceGrid } from "@/components/sections/solutions/who-can-use";

export const metadata: Metadata = {
  title: "Who can use Silvana",
  description:
    "From AI developers and market makers to auditors, government agencies, and researchers — what Silvana's infrastructure does for each.",
};

/* ------------------------------------------------------------------ audiences */

function Audiences() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          eyebrow="Audiences"
          title={
            <>
              Different mandates, <span className="text-gradient-flow">same infrastructure.</span>
            </>
          }
          sub="Ten roles, one settlement layer — private execution, atomic settlement, and agents that do the work. Find the entry point that fits yours."
        />
        <AudienceGrid />
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- page */

export default function WhoCanUsePage() {
  return (
    <>
      <Hero
        eyebrow="Audiences"
        headline="Built for everyone who operates assets."
        subhead="Different mandates, same infrastructure: private execution, atomic settlement, and agents that do the work."
        primary={{ label: "Open the app", href: "/app" }}
        secondary={{ label: "Talk to the team", href: "/about" }}
      />

      <Audiences />

      <CtaBand
        headline="Find your entry point."
        primary={{ label: "Open the app", href: "/app" }}
        secondary={{ label: "Talk to the team", href: "/about" }}
      />
    </>
  );
}
