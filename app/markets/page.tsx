import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal, SectionHead, ArrowLink } from "@/components/sections/home-v2/shared";
import { MarketsTable, MarketsBoard } from "@/components/sections/markets/markets-table";

export const metadata: Metadata = {
  title: "Markets — live trading pairs on Silvana",
  description:
    "Trade CC-USDC, CC-cETH, and cETH-USDC with private matching and atomic DvP settlement. New markets ship every season.",
};

/* ------------------------------------------------------------ markets section */

function Markets() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          eyebrow="Live markets"
          title={
            <>
              One board. <span className="text-gradient-flow">Every pair private.</span>
            </>
          }
          sub="Last price, 24h change, and volume across active pairs — each settling through the same private rails. Built to grow without a redesign."
        />
        <div className="mt-12">
          <MarketsTable />
        </div>
        <Reveal delay={0.12}>
          <p className="mt-6 text-sm text-muted">
            Trading here counts toward seasonal rewards.{" "}
            <ArrowLink href="/earnhub" className="align-baseline">
              See how EarnHub works
            </ArrowLink>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- page */

export default function MarketsPage() {
  return (
    <>
      <Hero
        eyebrow="Markets"
        headline="Live pairs. Private rails."
        subhead="Every market on Silvana runs on the same guarantees: sub-second private matching and atomic DvP settlement on Canton."
        primary={{ label: "Open the app", href: "/app" }}
        secondary={{ label: "How Silvana Book works", href: "/products/silvana-book" }}
        visual={<MarketsBoard />}
      />

      <Markets />

      <CtaBand
        headline="Pick a pair. Keep your edge."
        primary={{ label: "Open the app", href: "/app" }}
        secondary={{ label: "Read the docs", href: "https://docs.silvana.one" }}
      />
    </>
  );
}
