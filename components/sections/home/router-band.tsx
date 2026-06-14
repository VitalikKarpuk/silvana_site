import Link from "next/link";

// Slim router strip on a lighter surface (HomePage.md).
export function RouterBand() {
  return (
    <section className="border-b border-line px-6 py-10">
      <div className="glass mx-auto flex max-w-7xl flex-col gap-4 rounded-3xl px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="display text-lg text-fg">Not sure where to start?</h2>
          <p className="mt-1 text-sm text-muted">
            Tell us what you operate — a desk, a treasury, a product, a strategy — and
            we&apos;ll point you to the right rails.
          </p>
        </div>
        <Link
          href="/solutions"
          className="shrink-0 text-sm font-medium text-data hover:text-fg"
        >
          Find your fit →
        </Link>
      </div>
    </section>
  );
}
