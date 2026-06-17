import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal, SectionHead, ArrowLink } from "@/components/sections/home-v2/shared";
import { InstallTerminal, QuickstartTabs } from "@/components/sections/build/quickstart";

export const metadata: Metadata = {
  title: "Build — develop and deploy agents on Silvana",
  description:
    "The developer hub: SDK quickstart, full gRPC API surface, agent types, and four hosting models. From install to a running agent in an afternoon.",
};

/* --------------------------------------------------------- three entry points */

type Entry = {
  label: string;
  body: string;
  cta: string;
  href: string;
  tone: "sdk" | "api" | "space";
};

const ENTRIES: Entry[] = [
  {
    label: "SDK guide",
    body: "Install, onboard, configure, run. Zero to live agent.",
    cta: "Start the SDK guide",
    href: "/build/sdk-guide",
    tone: "sdk",
  },
  {
    label: "API reference",
    body: "Four gRPC services, the two-phase flow, and every capability they expose.",
    cta: "Open the API reference",
    href: "/build/api-reference",
    tone: "api",
  },
  {
    label: "Agent Space",
    body: "Agent types and hosting models — where your agent runs and who holds the keys.",
    cta: "Explore Agent Space",
    href: "/build/agent-space",
    tone: "space",
  },
];

function EntryIcon({ tone }: { tone: Entry["tone"] }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-5 w-5",
  };
  if (tone === "sdk") {
    // terminal prompt
    return (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M7 9l3 3-3 3M13 15h4" />
      </svg>
    );
  }
  if (tone === "api") {
    // braces / API surface
    return (
      <svg {...common}>
        <path d="M8 4c-2 0-2 3-2 4s0 2-2 2c2 0 2 1 2 2s0 4 2 4M16 4c2 0 2 3 2 4s0 2 2 2c-2 0-2 1-2 2s0 4-2 4" />
      </svg>
    );
  }
  // agent space — nodes
  return (
    <svg {...common}>
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="18" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M12 7l-6 9M12 7l6 9M7 18h10" />
    </svg>
  );
}

function EntryCard({ entry, i }: { entry: Entry; i: number }) {
  return (
    <Reveal delay={i * 0.06} className="h-full">
      <div className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-accent/40">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface-2 text-accent">
          <EntryIcon tone={entry.tone} />
        </span>
        <h3 className="display mt-5 text-xl text-fg">{entry.label}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{entry.body}</p>
        <div className="mt-6">
          <ArrowLink href={entry.href}>{entry.cta}</ArrowLink>
        </div>
      </div>
    </Reveal>
  );
}

function EntryPoints() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <SectionHead
          eyebrow="Three entry points"
          title="Pick where to start."
          sub="The guide gets you running. The reference gives you the full surface. Agent Space decides where your agent lives and who holds the keys."
        />
        <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
          {ENTRIES.map((entry, i) => (
            <EntryCard key={entry.label} entry={entry} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- quickstart */

function Quickstart() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead
              eyebrow="From install to live"
              title={
                <>
                  A running agent,{" "}
                  <span className="text-gradient-flow">in an afternoon.</span>
                </>
              }
              sub="Install the CLI, authenticate, and scaffold your first agent. Then it's the same two-phase flow everywhere — prepare, then execute."
            />
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <ArrowLink href="/build/sdk-guide">Read the full SDK guide</ArrowLink>
              <ArrowLink href="https://docs.silvana.one">Browse the docs</ArrowLink>
            </div>
          </div>

          <Reveal delay={0.06}>
            <div className="grid gap-5">
              <InstallTerminal />
              <QuickstartTabs />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- page */

export default function BuildPage() {
  return (
    <>
      <Hero
        eyebrow="Build"
        headline="From strategy to running agent."
        subhead="Everything you need to build on Silvana — quickstart, API surface, and the hosting model that fits your security perimeter."
        primary={{ label: "Start the SDK guide", href: "/build/sdk-guide" }}
        secondary={{ label: "Browse the API reference", href: "/build/api-reference" }}
        visual={<InstallTerminal />}
      />

      <EntryPoints />
      <Quickstart />

      <CtaBand
        headline="Install to live agent — start now."
        body="Follow the guide, wire in the API, then choose where your agent runs."
        primary={{ label: "Start the SDK guide", href: "/build/sdk-guide" }}
        secondary={{ label: "Read the docs", href: "https://docs.silvana.one" }}
      />
    </>
  );
}
