import { Reveal } from "@/components/motion/reveal";

// Oversized centered pull quote (HomePage.md). A decorative serif quote mark in
// soft brand magenta opens it (contrast to the sans display face); an optional
// partner logo turns the attribution into a real testimonial. No carousel.
export function PullQuote({
  quote,
  attribution,
  href,
  logo,
  logoAlt,
}: {
  quote: string;
  attribution: string;
  href?: string;
  logo?: string;
  logoAlt?: string;
}) {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-4xl px-6 py-24 text-center">
        <Reveal>
          <span
            aria-hidden
            className="block select-none font-serif text-[5.5rem] leading-[0.4] text-accent/60"
          >
            &ldquo;
          </span>
          <blockquote className="display mt-2 text-balance text-3xl text-fg sm:text-4xl md:text-5xl">
            {quote}
          </blockquote>

          <div className="mt-9 flex items-center justify-center gap-3">
            {logo && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo}
                  alt={logoAlt ?? ""}
                  className="h-4 w-auto opacity-80 filter-[brightness(0)_invert(1)]"
                />
                <span className="h-3.5 w-px bg-white/20" />
              </>
            )}
            <span className="text-sm text-muted">{attribution}</span>
          </div>

          {href && (
            <a
              href={href}
              className="mt-3 inline-block text-sm font-medium text-data hover:text-fg"
            >
              Read the story →
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}
