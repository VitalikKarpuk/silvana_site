import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eyebrow, Reveal } from "./shared";

export function ClosingCta() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-24 text-center md:py-32">
        <Reveal>
          <Eyebrow>Get started</Eyebrow>
          <h2 className="display mx-auto mt-5 max-w-[16ch] text-5xl text-fg sm:text-6xl lg:text-7xl">
            Ready to put agents to work?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            Create an account and trade in minutes, or talk to us about what
            you&apos;re building.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button href="/app">Open the app</Button>
            <Button href="/about" variant="secondary">
              Contact sales
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              ["Start trading.", "Onboard, connect a wallet, and place your first private order today.", "Get started", "/app"],
              ["Start building.", "Get up and running with the SDK in as little as one afternoon.", "Quickstart", "/build/sdk-guide"],
            ].map(([title, body, cta, href]) => (
              <Link
                key={title}
                href={href}
                className="glass group rounded-3xl p-7 text-left transition-transform duration-300 hover:-translate-y-0.5"
              >
                <h3 className="display text-xl text-fg">{title}</h3>
                <p className="mt-2 text-[15px] text-muted">{body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  {cta}
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
