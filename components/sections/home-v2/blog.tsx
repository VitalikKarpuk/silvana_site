"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLink, Band, Reveal, SectionHead } from "./shared";

type Post = {
  tag: string;
  title: string;
  body: string;
  date: string;
  img: string;
  thumb: string; // gradient shown behind the cover image
};

const POSTS: Post[] = [
  {
    tag: "Product",
    title: "Silvana V2 is here.",
    body: "A redesigned experience across every product — plus the new Trading Terminal.",
    date: "Jun 2026",
    img: "/images/blog/silvana-v2.svg",
    thumb: "from-accent/25 via-surface to-data/15",
  },
  {
    tag: "Developers",
    title: "The Silvana SDK is live.",
    body: "Build agents and applications on Silvana Book with a developer-first interface.",
    date: "May 2026",
    img: "/images/blog/sdk-live.png",
    thumb: "from-data/25 via-surface to-accent/15",
  },
  {
    tag: "Markets",
    title: "cETH markets are open.",
    body: "Trade CC-cETH and cETH-USDC with atomic DvP settlement.",
    date: "May 2026",
    img: "/images/blog/ceth-markets.png",
    thumb: "from-accent/20 via-surface to-accent/5",
  },
  {
    tag: "Community",
    title: "EarnHub Season 6 has started.",
    body: "New challenges, new leaderboard, new rewards for settled activity.",
    date: "Apr 2026",
    img: "/images/blog/earnhub-s6.svg",
    thumb: "from-data/20 via-surface to-data/5",
  },
];

function ArrowButton({
  dir,
  onClick,
}: {
  dir: "prev" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "prev" ? "Previous" : "Next"}
      className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-accent/40 hover:text-accent"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        {dir === "prev" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  );
}

export function Blog() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const amount = card ? card.offsetWidth + 24 : el.clientWidth * 0.8; // +gap-6
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <Band>
      <SectionHead center eyebrow="What's happening" title="The latest from Silvana." />

      <Reveal delay={0.06}>
        <div
          ref={trackRef}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {POSTS.map((p) => (
            <div
              key={p.title}
              className="shrink-0 basis-[85%] snap-start sm:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)]"
            >
              <Link
                href="/blog"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface"
              >
                {/* cover image (gradient sits behind in case the art is transparent) */}
                <div className={`relative aspect-16/10 overflow-hidden bg-linear-to-br ${p.thumb}`}>
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* text wrapper */}
                <div className="relative z-10 flex h-fit flex-col gap-3 p-6">
                  {/* meta — category + date; reversed stack on mobile, inline row on desktop */}
                  <div className="flex flex-col-reverse gap-3 md:flex-row md:items-center">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-data">
                      {p.tag}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted md:ml-auto">
                      {p.date}
                    </span>
                  </div>
                  <h3 className="display text-lg text-fg transition-colors group-hover:text-accent">
                    {p.title}
                  </h3>
                  <p className="min-h-20 text-base leading-normal text-muted md:text-lg">
                    {p.body}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mt-8 flex items-center justify-center gap-3">
        <ArrowButton dir="prev" onClick={() => scrollByCard(-1)} />
        <ArrowButton dir="next" onClick={() => scrollByCard(1)} />
      </Reveal>
    </Band>
  );
}
