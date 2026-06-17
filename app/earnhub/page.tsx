import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal, SectionHead, ArrowLink } from "@/components/sections/home-v2/shared";
import {
  SeasonBanner,
  PrizePool,
  Leaderboard,
} from "@/components/sections/earnhub/season";
import { SEASON } from "@/components/sections/earnhub/season-data";

export const metadata: Metadata = {
  title: "EarnHub — turn activity into rewards",
  description:
    "Every trade, settled transaction, achievement, and milestone moves you up the leaderboard. Seasonal rewards for the most active traders on Silvana.",
};

/* ------------------------------------------------------------- how it works */

const STEPS: { n: string; title: string; body: string }[] = [
  {
    n: "1",
    title: "Trade",
    body: "Activity on Silvana Book counts automatically — progress follows settled transactions, not screenshots.",
  },
  {
    n: "2",
    title: "Track",
    body: "One dashboard records everything: performance, challenges, achievements, and your standing against other traders.",
  },
  {
    n: "3",
    title: "Earn",
    body: "Each season brings new tasks, competitions, and rewards for active participants.",
  },
];

function HowItWorks() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead center eyebrow="How it works" title="Three steps to the leaderboard" />
        <div className="mt-12 grid items-stretch gap-4 md:grid-cols-3 md:gap-6">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-2xl border border-line bg-surface p-7">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 font-mono text-sm text-accent">
                  {s.n}
                </span>
                <h3 className="display mt-4 text-xl text-fg">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        {/* Differentiator pull-line (spec: "Rewards follow settlement.") */}
        <Reveal delay={0.12}>
          <p className="display mx-auto mt-12 max-w-3xl text-center text-2xl leading-tight text-fg sm:text-3xl">
            Rewards follow <span className="text-gradient-flow">settlement.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------ leaderboard teaser */

// Leaderboard teaser. On lg+ the leaderboard already shows as the hero visual,
// so this section only renders below lg — keeping the live component visible on
// mobile/tablet (where the hero visual is hidden) without duplicating it.
function LeaderboardTeaser() {
  return (
    <section className="border-t border-line bg-surface lg:hidden">
      <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <SectionHead
          center
          eyebrow="This season"
          title="The climb, live"
          sub={`Top traders this season — anonymized handles, ranked by settled activity. Season ${SEASON.number} runs ${SEASON.startLabel} – ${SEASON.endLabel}.`}
        />
        <Reveal delay={0.06} className="mt-12">
          <Leaderboard />
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-6 flex justify-center">
            <ArrowLink href="/app">See the full leaderboard in the app</ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- seasons */

function Seasons() {
  return (
    <section id="seasons" className="scroll-mt-24 border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SectionHead
            eyebrow="Seasons"
            title="A fresh race every season"
            sub="Rewards run in seasons. Each one introduces new tasks, achievements, and competitions — and resets the leaderboard so everyone starts the climb again. As the ecosystem grows, new reward programs create even more ways to earn recognition and benefits in the Silvana community."
          />
          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-line bg-surface p-8 text-center md:p-10">
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                Season {SEASON.number} prize pool
              </div>
              <div className="mt-4 text-5xl sm:text-6xl">
                <PrizePool />
              </div>
              <div className="mt-2 font-mono text-sm text-muted">CC in seasonal rewards</div>
              <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
                <div className="bg-surface p-5">
                  <div className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    Top prize
                  </div>
                  <div className="mt-2 font-mono text-xl tabular-nums text-accent">
                    {SEASON.topPrize}
                  </div>
                </div>
                <div className="bg-surface p-5">
                  <div className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                    Window
                  </div>
                  <div className="mt-2 font-mono text-xl tabular-nums text-data">
                    {SEASON.startLabel} – {SEASON.endLabel}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- page */

export default function EarnHubPage() {
  return (
    <>
      <Hero
        eyebrow="EarnHub"
        headline="Trade. Climb. Earn."
        subhead="EarnHub is Silvana Book's rewards center. Every trade, successfully settled transaction, completed achievement, and milestone builds your seasonal progress — climb the leaderboard and unlock rewards."
        primary={{ label: "Open EarnHub", href: "/app" }}
        secondary={{ label: "See this season", href: "#seasons" }}
        visual={<Leaderboard />}
      />

      {/* slim season banner directly under the hero (spec) */}
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl justify-center px-6 py-5">
          <SeasonBanner />
        </div>
      </div>

      <HowItWorks />
      <LeaderboardTeaser />
      <Seasons />

      <CtaBand
        headline={`Season ${SEASON.number} is live now. The climb is open until ${SEASON.endLabel}.`}
        body={`Top prize ${SEASON.topPrize} from a ${SEASON.prizePool.toLocaleString("en-US")} CC seasonal pool. Every settled trade counts.`}
        primary={{ label: "Open EarnHub", href: "/app" }}
        secondary={{ label: "Explore Silvana Book", href: "/products/silvana-book" }}
      />
    </>
  );
}
