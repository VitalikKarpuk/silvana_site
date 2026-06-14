import { Reveal } from "@/components/motion/reveal";
import { CodeTabs } from "@/components/ui/code-tabs";

// Code block is canon (HomePage.md). Commands are flagged illustrative there;
// the TS tab mirrors the same flow via npx. Last line kept on one line with the
// "·" separators exactly as written in canon.
const RUST = `$ silvana onboard --name my-agent --invite EARLYBIRD
✓ Key generated · .env written · agent.toml created
$ silvana agent run
→ Connected to CC/USDC · quoting 6 levels · streaming settlement events…`;

const TS = `$ npx silvana onboard --name my-agent --invite EARLYBIRD
✓ Key generated · .env written · agent.toml created
$ npx silvana agent run
→ Connected to CC/USDC · quoting 6 levels · streaming settlement events…`;

// Story cards (HomePage.md). [filler] in canon is a placeholder for a stat to
// add before publish — not literal copy — so nothing is fabricated here.
const STORIES: { logo: string; name: string; mono: boolean; line: string }[] = [
  {
    logo: "/partners/modo.svg",
    name: "Modo",
    mono: true,
    line: "Modo ships explorer infrastructure on Silvana data.",
  },
  {
    logo: "/partners/loopWallet.svg",
    name: "Loop Wallet",
    mono: true,
    line: "Loop Wallet powers non-custodial DvP for thousands of users.",
  },
  {
    logo: "/partners/supanova.svg",
    name: "Supanova",
    mono: false,
    line: "Supanova brings agent-driven apps to Canton wallets.",
  },
];

export function Developers() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="text-sm font-medium uppercase tracking-wider text-data">
              Silvana for developers
            </div>
            <h2 className="display mt-4 text-3xl text-fg sm:text-4xl">
              From strategy to running agent in an afternoon.
            </h2>
            <p className="mt-5 text-muted">
              Onboard with one CLI command. Configure your strategy in agent.toml. Run grid,
              market-making, or taker flows out of the box — or compose your own logic on the
              core crates. Want to feel it first? The Playground simulates your strategy on a
              mock feed and exports the exact config to go live.
            </p>
            <p className="mt-4 text-sm text-muted">
              A general-purpose SDK, proto interfaces for any language, and four hosting
              models — from your laptop to a TEE.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <CodeTabs
              tabs={[
                { label: "Rust", code: RUST },
                { label: "TypeScript", code: TS },
              ]}
            />
            <p className="mt-3 font-mono text-xs text-muted/70">
              [command names illustrative — sync with docs before publish]
            </p>
          </Reveal>
        </div>

        {/* Story cards — horizontal scroll on mobile, even row on desktop. */}
        <Reveal delay={0.15}>
          <div className="scrollbar-none mt-16 flex snap-x gap-4 overflow-x-auto pb-2 sm:mt-20 [&::-webkit-scrollbar]:hidden">
            {STORIES.map((s) => (
              <a
                key={s.name}
                href="/solutions/case-studies"
                className="group flex min-w-65 flex-1 snap-start flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-fg/25"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.logo}
                  alt={s.name}
                  className={`block h-4 w-auto self-start opacity-70 ${
                    s.mono ? "filter-[brightness(0)_invert(1)]" : ""
                  }`}
                />
                <p className="mt-6 text-sm text-fg">{s.line}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-data">
                  Story
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
