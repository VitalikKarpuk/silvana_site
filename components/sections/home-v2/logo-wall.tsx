// Logo wall (HomePage.md) — partners, monochrome. Ported in full from the v1
// section (components/sections/logo-wall.tsx).
// Desktop: slow marquee that pauses on hover/focus. Mobile: static two-row grid.
// Reduced-motion freezes the marquee (handled globally in globals.css).
//
// Real brand SVGs live in /public/partners. They ship in brand colors, so the
// wordmarks are flattened to a uniform silhouette (`mono`) to satisfy the
// monochrome spec: black on the light theme, inverted to white in dark mode.
// Supanova is already a light mark, so it renders as-is.
type Partner =
  | { src: string; alt: string; mono: boolean; h?: string; label?: string }
  | { text: string };

const PARTNERS: Partner[] = [
  { src: "/partners/canton.svg", alt: "Canton Network", mono: true },
  { src: "/partners/loopWallet.svg", alt: "Loop Wallet", mono: true, h: "h-6", label: "Loop Wallet" },
  { src: "/partners/supanova.svg", alt: "Supanova", mono: false, h: "h-6", label: "Supanova" },
  { src: "/partners/modo.svg", alt: "Modo", mono: true },
  { src: "/partners/hecto.svg", alt: "Hecto", mono: true },
];

function Item({ p }: { p: Partner }) {
  if ("text" in p) {
    return (
      <span className="whitespace-nowrap text-sm font-medium text-muted/70 transition-colors hover:text-fg/80">
        {p.text}
      </span>
    );
  }
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={p.src}
      alt={p.label ? "" : p.alt}
      aria-hidden={p.label ? true : undefined}
      className={`${p.h ?? "h-6"} w-auto ${
        p.mono ? "filter-[brightness(0)] dark:filter-[brightness(0)_invert(1)]" : ""
      }`}
    />
  );
  if (p.label) {
    return (
      <div className="group inline-flex h-8 items-center gap-2 whitespace-nowrap opacity-55 transition-opacity duration-300 hover:opacity-100">
        {img}
        <span className="text-lg font-semibold text-fg mt-1.5">{p.label}</span>
      </div>
    );
  }
  return (
    <span className="inline-flex h-8 items-center opacity-55 transition-opacity duration-300 hover:opacity-100">
      {img}
    </span>
  );
}

export function LogoWall() {
  return (
    <section className="border-t border-line" aria-label="Partners">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-center text-xs uppercase tracking-wider text-muted">
          Building the agent economy with
        </div>

        {/* Desktop: marquee. Edges fade out via a mask so items appear/vanish. */}
        <div
          className="marquee relative mt-7 hidden overflow-hidden md:block"
          style={{
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
            maskImage:
              "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
          }}
        >
          <div className="marquee-track flex w-max items-center gap-x-16">
            {/* two identical halves → -50% translate loops seamlessly */}
            {[0, 1].map((half) => (
              <div
                key={half}
                className="flex items-center gap-x-16"
                aria-hidden={half === 1}
              >
                {PARTNERS.map((p, i) => (
                  <Item key={`${half}-${i}`} p={p} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: static two-row grid */}
        <div className="mt-7 grid grid-cols-2 items-center gap-x-8 gap-y-6 md:hidden">
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <div key={i} className="flex justify-center">
              <Item p={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
