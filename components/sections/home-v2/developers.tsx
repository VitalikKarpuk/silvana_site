import { Button } from "@/components/ui/button";
import { Band, Reveal, SectionHead } from "./shared";

export function Developers() {
  return (
    <Band>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHead
            eyebrow="For developers"
            title="From strategy to running agent in an afternoon."
            sub="A general-purpose SDK, proto interfaces for any language, and four hosting models — from your laptop to a TEE. Onboard with one CLI command, configure your strategy in agent.toml, and run grid, market-making, or taker flows out of the box."
          />
          <Reveal delay={0.12} className="mt-7 flex flex-wrap gap-3">
            <Button href="/build/sdk-guide">5-minute quickstart</Button>
            <Button href="/agents/playground" variant="secondary">
              Try the Playground
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          {/* dark terminal — window chrome + highlighted output */}
          <div className="overflow-hidden rounded-2xl border border-line bg-[#0c0c12] shadow-[0_30px_60px_-30px_rgba(20,22,29,0.5)]">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
              <span className="ml-2 font-mono text-[11px] text-white/40">
                silvana — my-agent
              </span>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed">
              <code>
                <span className="text-white/40">$ </span>
                <span className="text-white/90">silvana onboard </span>
                <span className="text-data">--name</span>
                <span className="text-white/90"> my-agent </span>
                <span className="text-data">--invite</span>
                <span className="text-white/90"> EARLYBIRD</span>
                {"\n"}
                <span className="text-data">✓</span>
                <span className="text-white/55"> Key generated · .env written · agent.toml created</span>
                {"\n\n"}
                <span className="text-white/40">$ </span>
                <span className="text-white/90">silvana agent run</span>
                {"\n"}
                <span className="text-accent">→</span>
                <span className="text-white/55"> Connected to CC/USDC · quoting 6 levels · streaming settlement events…</span>
                <span className="ml-0.5 inline-block h-3.5 w-1.75 translate-y-0.5 bg-white/70 animate-[mock-blink_1.1s_steps(1)_infinite]" />
              </code>
            </pre>
          </div>
        </Reveal>
      </div>
    </Band>
  );
}
