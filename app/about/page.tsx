import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal, SectionHead, ArrowLink } from "@/components/sections/home-v2/shared";
import { AgentTreeVisual } from "@/components/sections/agents/agents-landing";
import { EcosystemWall } from "@/components/sections/about/ecosystem-wall";

export const metadata: Metadata = {
  title: "About — Silvana",
  description:
    "We're building the agent interaction layer for tokenized assets — the team, the mission, and the ecosystem behind Silvana.",
};

/* ------------------------------------------------------------------- the story */

function Story() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <SectionHead eyebrow="The story" title="Why we're building this" />
        <Reveal delay={0.06}>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted">
            <p>
              Silvana was founded by a team of engineers and builders with deep
              backgrounds in zero-knowledge systems, distributed infrastructure,
              and institutional finance.
            </p>
            <p>
              We watched tokenization arrive on Canton with real institutional
              weight behind it — and watched agents struggle to operate there.
              The gap was obvious.
            </p>
            <p>
              So we built the execution platform we wished existed:{" "}
              <span className="text-gradient-flow">
                private, atomic, provable, and open to any agent.
              </span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- the values */

const VALUES: { lead: string; body: string }[] = [
  {
    lead: "Mechanism over marketing.",
    body: "We'd rather show you the architecture than tell you an adjective.",
  },
  {
    lead: "Credibility compounds.",
    body: "We label what's live and what's next — and we ship fast enough that the list keeps moving.",
  },
  {
    lead: "Agents need rails, not hype.",
    body: "Infrastructure wins by working.",
  },
];

function Values() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead center eyebrow="What we value" title="How we work" />
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.lead} delay={i * 0.06}>
              <div className="flex h-full flex-col bg-surface p-7">
                <span className="font-mono text-xs text-data">0{i + 1}</span>
                <h3 className="display mt-3 text-lg text-fg">{v.lead}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- the ecosystem */

function Ecosystem() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
        <SectionHead
          center
          eyebrow="The ecosystem"
          title="Better together"
          sub="Silvana is built on Canton Network — institutional-grade privacy, control, and governance — with a coordination layer on Sui and a growing partner ecosystem across wallets, explorers, and white-label platforms."
        />
        <EcosystemWall />
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- work with us */

function Careers() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <SectionHead
              eyebrow="Work with us"
              title="Join the team"
              sub="We're hiring across engineering, developer relations, and partnerships. If you want to build the rails of the agent economy, we want to hear from you."
            />
          </div>
          <Reveal delay={0.06} className="flex flex-col gap-3 lg:items-end">
            <ArrowLink href="https://docs.silvana.one">View open roles</ArrowLink>
            <ArrowLink href="mailto:hello@silvana.one">Contact the team</ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- page */

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About"
        headline="Infrastructure for the agent economy."
        subhead="We believe every financial asset will be tokenized — and that agents, not humans, will do most of the operating. Silvana is the layer that makes that future work."
        primary={{ label: "Explore the platform", href: "/build" }}
        secondary={{ label: "Read the thesis", href: "/thesis" }}
        visual={<AgentTreeVisual />}
      />

      <Story />
      <Values />
      <Ecosystem />
      <Careers />

      <CtaBand
        headline="Say hello."
        primary={{ label: "Contact the team", href: "mailto:hello@silvana.one" }}
        secondary={{ label: "Follow on X", href: "https://x.com/silvana" }}
      />
    </>
  );
}
