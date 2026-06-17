"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowLink, EASE, Eyebrow, SectionHead } from "./shared";
import { PRODUCT_MOCK } from "./product-mocks";

const PRODUCTS = [
  {
    tag: "Silvana Book",
    title: "Trade privately on a high-performance orderbook.",
    body: "Off-chain matching in under a second. Zero information leakage, zero slippage, zero pools. Your orders never touch a public mempool.",
    cta: "Explore Silvana Book",
    href: "/products/silvana-book",
  },
  {
    tag: "Agents",
    title: "Put agents on the flow.",
    body: "Market making, grid, RFQ, settlement, proving — configure an agent once and let it run around the clock.",
    cta: "Browse the agent catalog",
    href: "/agents/catalog",
  },
  {
    tag: "Swap",
    title: "Swap with atomic settlement.",
    body: "Assets and payment move simultaneously — or not at all. No pools, no custody handoffs, rollback-protected.",
    cta: "Try Swap",
    href: "/products/silvana-book",
  },
  {
    tag: "Agentic API",
    title: "Build on the Agentic API.",
    body: "One gRPC interface for everything on Canton: payments, DvP, transfers, multicall workflows.",
    cta: "Read the API reference",
    href: "/build/api-reference",
  },
  {
    tag: "Proving",
    title: "Prove without revealing.",
    body: "Hand auditors ZK proofs of trading activity — without exposing a single order.",
    cta: "How proving works",
    href: "/products/agentic-api",
  },
  {
    tag: "EarnHub",
    title: "Earn as you trade.",
    body: "Every settled transaction counts toward seasonal rewards in EarnHub.",
    cta: "Open EarnHub",
    href: "/earnhub",
  },
];

// One product subsection — a full-width band. On enter, the two columns slide in
// from opposite sides and converge to center: the copy enters from its own outer
// edge, the preview from the other, reinforcing the zigzag as you scroll down.
// One-shot on view (not scroll-linked); disabled under reduced motion.
function ProductRow({ product, index }: { product: (typeof PRODUCTS)[number]; index: number }) {
  const Mock = PRODUCT_MOCK[index];
  const flip = index % 2 === 1; // odd rows: tinted band + visual on the left
  const reduce = useReducedMotion();

  // Each column starts offset toward its own outer side, then slides to 0.
  const copyX = flip ? 56 : -56;
  const mockX = flip ? -56 : 56;

  const slide = (from: number) => ({
    initial: reduce ? false : { opacity: 0, x: from },
    whileInView: { opacity: 1, x: 0 },
    // fire only once the row is well into the viewport (shrinks the trigger
    // zone from the bottom), so it doesn't animate while still near the edge
    viewport: { once: true, margin: "0px 0px -35% 0px" },
    transition: { duration: 1.25, ease: EASE },
  });

  return (
    <div className={`relative overflow-hidden ${flip ? "bg-surface" : ""}`}>
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:gap-12 md:py-20 lg:gap-20">
        {/* copy — slides in from its outer side */}
        <motion.div className={flip ? "md:order-2" : ""} {...slide(copyX)}>
          <Eyebrow>{product.tag}</Eyebrow>
          <h3 className="display mt-3 text-2xl text-fg sm:text-3xl md:text-4xl">
            {product.title}
          </h3>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
            {product.body}
          </p>
          <ArrowLink href={product.href} className="mt-6">
            {product.cta}
          </ArrowLink>
        </motion.div>

        {/* live preview — slides in from the opposite side */}
        <motion.div className={flip ? "md:order-1" : ""} {...slide(mockX)}>
          <div className="relative flex min-h-80 items-center justify-center overflow-hidden rounded-3xl border border-line bg-linear-to-br from-accent/6 via-transparent to-data/6 p-6 sm:p-10 md:min-h-88">
            {/* static soft brand glow behind the mock */}
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-8 bg-[radial-gradient(60%_60%_at_50%_42%,rgba(214,68,143,0.10),transparent_70%)]"
            />
            <div className="relative w-full max-w-sm">
              <Mock />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Alchemy-style product narrative: alternating full-width rows — copy on one
// side, the live product preview on the other — flipping sides down the page.
// Each product is a full-bleed band; alternate bands carry a soft surface tint
// so products read as distinct blocks.
export function FeatureShowcase() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 pt-20 md:pt-28">
        <SectionHead
          center
          eyebrow="Products"
          title="One platform, every agentic workflow."
          sub="A complete set of trading and agent infrastructure — explore each on its own, or compose them together."
        />
      </div>

      <div className="mt-12 md:mt-16">
        {PRODUCTS.map((p, i) => (
          <ProductRow key={p.tag} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}
