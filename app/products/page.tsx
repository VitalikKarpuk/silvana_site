import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { Reveal } from "@/components/sections/home-v2/shared";

export const metadata: Metadata = {
  title: "Products — Silvana",
  description:
    "Everything you need to trade and build on Canton: Silvana Book, the private orderbook; the Agentic API; and the SDK for building agents.",
};

/* ----------------------------------------------------------- product glyphs */
/* Mono-line glyphs — one per product. Drawn with currentColor so they pick up
   the card's accent on hover. */

function BookGlyph() {
  // Stacked orderbook rows — the private orderbook.
  return (
    <svg viewBox="0 0 40 40" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
      <path d="M6 11h28M6 20h28M6 29h28" />
      <path d="M6 11v18M14 11v18M34 11v18" className="opacity-50" />
    </svg>
  );
}

function ApiGlyph() {
  // Hub with branching nodes — one unified interface.
  return (
    <svg viewBox="0 0 40 40" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="20" cy="20" r="4" />
      <path d="M20 16V8M20 24v8M16 20H8M24 20h8" />
      <circle cx="20" cy="7" r="1.6" />
      <circle cx="20" cy="33" r="1.6" />
      <circle cx="7" cy="20" r="1.6" />
      <circle cx="33" cy="20" r="1.6" />
    </svg>
  );
}

function SdkGlyph() {
  // Angle brackets with a slash — developer SDK.
  return (
    <svg viewBox="0 0 40 40" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 13 6 20l8 7M26 13l8 7-8 7M23 9l-6 22" />
    </svg>
  );
}

/* ------------------------------------------------------------- product cards */

type Product = {
  name: string;
  body: string;
  cta: string;
  href: string;
  Glyph: () => React.ReactElement;
};

const PRODUCTS: Product[] = [
  {
    name: "Silvana Book",
    body: "The private orderbook for high-performance agentic trading — off-chain matching, atomic DvP, no pools, no slippage.",
    cta: "Explore Silvana Book",
    href: "/products/silvana-book",
    Glyph: BookGlyph,
  },
  {
    name: "Agentic API",
    body: "One unified gRPC interface for agents and backends on Canton: payments, DvP, transfers, multicall, and more.",
    cta: "Explore the API",
    href: "/products/agentic-api",
    Glyph: ApiGlyph,
  },
  {
    name: "SDK",
    body: "Build agents and applications on Silvana Book with a clean, developer-first interface.",
    cta: "Explore the SDK",
    href: "/products/sdk",
    Glyph: SdkGlyph,
  },
];

function ProductCard({ product, delay }: { product: Product; delay: number }) {
  const { name, body, cta, href, Glyph } = product;
  return (
    <Reveal delay={delay} className="h-full">
      <Link
        href={href}
        className="group relative flex h-full flex-col rounded-3xl border border-line bg-surface p-8 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.4)]"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line bg-surface-2 text-muted transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent">
          <Glyph />
        </span>
        <h3 className="display mt-6 text-2xl text-fg">{name}</h3>
        <p className="mt-3 flex-1 text-base leading-relaxed text-muted">{body}</p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
          {cta}
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </Link>
    </Reveal>
  );
}

function ProductGrid() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.name} product={p} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------------- page */

export default function ProductsPage() {
  return (
    <>
      <Hero
        eyebrow="Products"
        headline="Three products. One execution layer."
        subhead="A private orderbook for trading, a gRPC API for transacting on Canton, and an SDK that turns strategies into agents."
        primary={{ label: "Open the app", href: "/app" }}
        secondary={{ label: "Start building", href: "/build" }}
      />

      <ProductGrid />
    </>
  );
}
