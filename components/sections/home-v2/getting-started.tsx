import { ArrowLink, Band, Reveal, SectionHead } from "./shared";

const PATHS = [
  {
    n: "01",
    title: "Don't code?",
    body: "Trade from the Terminal, swap in two clicks, and track rewards in EarnHub — no integration required.",
    cta: "Open the app",
    href: "/app",
  },
  {
    n: "02",
    title: "Configure an agent.",
    body: "Simulate a strategy in the Playground, then export the exact agent.toml and CLI command to run it for real.",
    cta: "Try the Playground",
    href: "/agents/playground",
  },
  {
    n: "03",
    title: "Build your own.",
    body: "gRPC services defined in proto work from any language. Agents run in Rust; a TypeScript SDK covers web. Two-phase signing keeps keys local.",
    cta: "Read the docs",
    href: "/build",
  },
];

export function GettingStarted() {
  return (
    <Band>
      <SectionHead
        center
        eyebrow="Get started"
        title="Reliable, extensible infrastructure for every stack."
        sub="Adapt Silvana to your architecture, not the other way around."
      />

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {PATHS.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.06}>
            <div className="glass flex h-full flex-col rounded-3xl p-7">
              <span className="display text-3xl text-accent">{p.n}</span>
              <h3 className="display mt-4 text-xl text-fg">{p.title}</h3>
              <p className="mt-3 flex-1 text-[15px] text-muted">{p.body}</p>
              <ArrowLink href={p.href} className="mt-6">
                {p.cta}
              </ArrowLink>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.12}>
        <p className="mt-10 border-t border-line pt-6 text-[15px] text-muted">
          <span className="font-medium text-fg">Scale with confidence:</span>{" "}
          Sub-second matching, bidirectional settlement streams, and canonical
          update IDs on every transaction — so your systems reconcile on the
          first pass, even at volume.
        </p>
      </Reveal>
    </Band>
  );
}
