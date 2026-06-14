import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";

// Three escalating paths (HomePage.md): no-code → configure → build. Each card
// is a single link to that path; a teal icon tile signals the level of hands-on
// involvement. Copy + the "Scale with confidence" sub-band are canon verbatim.
const PATHS: {
  title: string;
  body: string;
  link: { label: string; href: string };
  icon: ReactNode;
}[] = [
  {
    title: "Don't code?",
    body: "Trade from the Terminal, swap in two clicks, and track rewards in EarnHub — no integration required.",
    link: { label: "Open the app", href: "/app" },
    // cursor / point-and-click
    icon: (
      <path d="M5 3l15 8-6.5 1.5L11 19z" strokeLinejoin="round" strokeLinecap="round" />
    ),
  },
  {
    title: "Configure an agent.",
    body: "Simulate a strategy in the Playground, then export the exact agent.toml and CLI command to run it for real.",
    link: { label: "Try the Playground", href: "/agents/playground" },
    // sliders / configuration
    icon: (
      <>
        <line x1="4" y1="7" x2="20" y2="7" strokeLinecap="round" />
        <line x1="4" y1="12" x2="20" y2="12" strokeLinecap="round" />
        <line x1="4" y1="17" x2="20" y2="17" strokeLinecap="round" />
        <circle cx="9" cy="7" r="2" fill="currentColor" stroke="none" />
        <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
        <circle cx="8" cy="17" r="2" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    title: "Build your own.",
    body: "gRPC services defined in proto work from any language. Agents run in Rust; a TypeScript SDK covers web. Two-phase signing keeps keys local.",
    link: { label: "Read the docs", href: "/build" },
    // code brackets
    icon: (
      <>
        <path d="M8 7l-5 5 5 5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 7l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
      </>
    ),
  },
];

export function IntegrationPaths() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <Reveal>
          <h2 className="display max-w-2xl text-3xl text-fg sm:text-4xl">
            Reliable, extensible infrastructure for every stack.
          </h2>
          <p className="mt-3 text-muted">
            Adapt Silvana to your architecture, not the other way around.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {PATHS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <Link
                href={p.link.href}
                className="glass group flex h-full flex-col rounded-3xl p-6 transition-[border-color] duration-300 [transition-timing-function:var(--ease-out)] hover:border-white/25"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-data/25 bg-data/10 text-data">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.7}
                    aria-hidden
                  >
                    {p.icon}
                  </svg>
                </span>
                <h3 className="display mt-5 text-lg text-fg">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.body}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-data">
                  {p.link.label}
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* scale sub-band */}
        <Reveal delay={0.1}>
          <div className="glass mt-4 flex items-center gap-4 rounded-3xl px-6 py-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-accent/25 bg-accent/10 text-accent">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.7}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M13 2L3 14h7l-1 8 10-12h-7z" />
              </svg>
            </span>
            <p className="text-sm text-muted">
              <span className="font-medium text-fg">Scale with confidence:</span> Sub-second
              matching, bidirectional settlement streams, and canonical update IDs on every
              transaction — so your systems reconcile on the first pass, even at volume.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
