"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import {
  LiveOrderbook,
  AgentRunning,
  ApiFlow,
  SwapPreview,
  ProofCard,
  LiveLeaderboard,
} from "@/components/sections/home/live-previews";

// Bento product grid (HomePage.md). Cards 1–2 span 2x2, cards 3–6 are 1x1.
// Mini-UIs are coded embeds, never illustration. Numeric content is [filler].

function Card({
  title,
  body,
  href,
  linkLabel,
  index = 0,
  className = "",
  interactive = false,
  children,
}: {
  title: string;
  body: string;
  href: string;
  linkLabel: string;
  index?: number;
  className?: string;
  // when true the whole card is NOT a link — its body is an inline playground
  // and navigation happens only through the footer link
  interactive?: boolean;
  children: ReactNode;
}) {
  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const spotlight = (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background:
          "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.10), transparent 45%)",
      }}
    />
  );

  const inner = (
    <div className="relative flex h-full flex-col">
      <h3 className="display text-xl text-fg">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted">{body}</p>
      <div className="mt-5 flex-1">{children}</div>
      <Link
        href={href}
        className="group/link mt-5 inline-flex w-fit items-center gap-1 text-sm font-medium text-data"
      >
        {linkLabel}
        <span className="transition-transform group-hover/link:translate-x-0.5">→</span>
      </Link>
    </div>
  );

  const shell =
    "glass group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-[border-color,box-shadow] duration-300 [transition-timing-function:var(--ease-out)] hover:border-white/25";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
      className={`block w-full ${className}`}
    >
      {interactive ? (
        <div className={shell} onMouseMove={onMouseMove}>
          {spotlight}
          {inner}
        </div>
      ) : (
        <Link href={href} className={shell} onMouseMove={onMouseMove}>
          {spotlight}
          <div className="relative flex h-full flex-col">
            <h3 className="display text-xl text-fg">{title}</h3>
            <p className="mt-2 max-w-md text-sm text-muted">{body}</p>
            <div className="mt-5 flex-1">{children}</div>
            <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-data">
              {linkLabel}
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </span>
          </div>
        </Link>
      )}
    </motion.div>
  );
}

export function Bento() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="max-w-2xl">
          <h2 className="display text-3xl text-fg sm:text-4xl">
            One platform, every agentic workflow.
          </h2>
          <p className="mt-3 text-muted">
            A complete set of trading and agent infrastructure — designed to work
            individually or together.
          </p>
        </div>

        {/* Two balanced columns. Each is anchored by an interactive playground
            (Terminal / Swap) with ambient cards stacked beneath — 3 + 3. */}
        <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-stretch">
          {/* Left column */}
          <div className="flex flex-1 flex-col gap-4">
            <Card
              index={0}
              interactive
              title="Trade privately on a high-performance orderbook."
              body="Off-chain matching in under a second. Zero information leakage, zero slippage, zero pools. Your orders never touch a public mempool."
              href="/products/silvana-book"
              linkLabel="Explore Silvana Book"
            >
              <LiveOrderbook />
            </Card>

            <Card
              index={2}
              title="Build on the Agentic API."
              body="One gRPC interface for everything on Canton: payments, DvP, transfers, multicall workflows."
              href="/products/agentic-api"
              linkLabel="Read the API reference"
            >
              <ApiFlow />
            </Card>

            <Card
              index={4}
              className="grow"
              title="Prove without revealing."
              body="Hand auditors ZK proofs of trading activity — without exposing a single order."
              href="/products/silvana-book"
              linkLabel="How proving works"
            >
              <ProofCard />
            </Card>
          </div>

          {/* Right column */}
          <div className="flex flex-1 flex-col gap-4">
            <Card
              index={1}
              interactive
              title="Swap with atomic settlement."
              body="Assets and payment move simultaneously — or not at all. No pools, no custody handoffs, rollback-protected."
              href="/products/silvana-book"
              linkLabel="Try Swap"
            >
              <SwapPreview />
            </Card>

            <Card
              index={3}
              title="Put agents on the flow."
              body="Market making, grid, RFQ, settlement, proving — configure an agent once and let it run around the clock."
              href="/agents/catalog"
              linkLabel="Browse the agent catalog"
            >
              <AgentRunning />
            </Card>

            <Card
              index={5}
              className="grow"
              title="Earn as you trade."
              body="Every settled transaction counts toward seasonal rewards in EarnHub."
              href="/earnhub"
              linkLabel="Open EarnHub"
            >
              <LiveLeaderboard />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
