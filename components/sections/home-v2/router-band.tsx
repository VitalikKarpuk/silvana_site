import { Button } from "@/components/ui/button";
import { Reveal } from "./shared";

// Slim router strip on a surface one shade lighter — copy left, single CTA
// right. Sits between the bento grid and the stats band.
export function RouterBand() {
  return (
    <section className="border-t border-line bg-surface-2/50">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-6 py-10 md:flex-row md:items-center">
        <Reveal>
          <h2 className="display text-2xl text-fg sm:text-3xl">
            Not sure where to start?
          </h2>
          <p className="mt-2 max-w-xl text-[15px] text-muted">
            Tell us what you operate — a desk, a treasury, a product, a strategy
            — and we&rsquo;ll point you to the right rails.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <Button href="/solutions" className="shrink-0">
            Find your fit
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
