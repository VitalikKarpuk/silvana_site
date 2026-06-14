"use client";

import { useRef } from "react";
import { Reveal } from "@/components/motion/reveal";

const FEATURED = {
  tag: "Product",
  title: "Silvana V2 is here.",
  body: "A redesigned experience across every product — plus the new Trading Terminal.",
};

const POSTS = [
  { tag: "Developers", title: "The Silvana SDK is live.", body: "Build agents and applications on Silvana Book with a developer-first interface." },
  { tag: "Markets", title: "cETH markets are open.", body: "Trade CC-cETH and cETH-USDC with atomic DvP settlement." },
  { tag: "Community", title: "EarnHub Season 6 has started.", body: "New challenges, new leaderboard, new rewards for settled activity." },
];

export function BlogCarousel() {
  const rail = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) =>
    rail.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="flex items-end justify-between">
          <Reveal>
            <h2 className="display text-3xl text-fg sm:text-4xl">What&apos;s happening</h2>
            <p className="mt-2 text-muted">The latest from Silvana.</p>
          </Reveal>
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scroll(-1)}
              aria-label="Previous"
              className="rounded-md border border-line px-3 py-2 text-muted hover:text-fg"
            >
              ←
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Next"
              className="rounded-md border border-line px-3 py-2 text-muted hover:text-fg"
            >
              →
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.4fr_2fr]">
          {/* Featured — double height */}
          <Reveal>
            <a
              href="/blog"
              className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-7 transition-colors hover:border-fg/25"
            >
              <span className="w-fit rounded bg-data/15 px-2 py-0.5 text-xs text-data">
                {FEATURED.tag}
              </span>
              <div className="mt-10">
                <h3 className="display text-2xl text-fg sm:text-3xl">{FEATURED.title}</h3>
                <p className="mt-2 text-sm text-muted">{FEATURED.body}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-data">
                  Read the post
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </a>
          </Reveal>

          {/* Rail */}
          <div
            ref={rail}
            className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {POSTS.map((p) => (
              <a
                key={p.title}
                href="/blog"
                className="group flex h-full w-72 shrink-0 flex-col rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-fg/25"
              >
                <span className="w-fit rounded bg-surface-2 px-2 py-0.5 text-xs text-muted">
                  {p.tag}
                </span>
                <h3 className="display mt-6 text-lg text-fg">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.body}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-data">
                  Read the post
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
