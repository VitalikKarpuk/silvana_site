import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

// Closing CTA with two Stripe-style side cards (HomePage.md).
export function ClosingCta() {
  return (
    <section>
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <h2 className="display text-3xl text-fg sm:text-4xl">
            Ready to put agents to work?
          </h2>
          <p className="mt-4 max-w-md text-muted">
            Create an account and trade in minutes, or talk to us about what you&apos;re
            building.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/app">Open the app</Button>
            <Button href="/about" variant="secondary">
              Contact the team
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/app"
              className="glass group rounded-3xl p-6 transition-[border-color] duration-300 [transition-timing-function:var(--ease-out)] hover:border-white/25"
            >
              <div className="display text-lg text-fg">Start trading.</div>
              <p className="mt-2 text-sm text-muted">
                Onboard, connect a wallet, and place your first private order today.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-data">
                Get started
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
            <Link
              href="/build/sdk-guide"
              className="glass group rounded-3xl p-6 transition-[border-color] duration-300 [transition-timing-function:var(--ease-out)] hover:border-white/25"
            >
              <div className="display text-lg text-fg">Start building.</div>
              <p className="mt-2 text-sm text-muted">
                Get up and running with the SDK in as little as one afternoon.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-data">
                Quickstart
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
