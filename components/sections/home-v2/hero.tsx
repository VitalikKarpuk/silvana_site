import type { ReactNode } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  WalletsIcon, CantonIcon, DataFeedsIcon,
  MarketMakingIcon, GridIcon, TakerIcon, SettlementIcon, ProvingIcon,
} from "@/components/ui/icons";
import { LogoMark } from "@/components/site/logo";
import { Counter } from "./shared";

/* ---------------------------------------------------------------- hero icons */

const HERO_ICONS = [
  { Icon: WalletsIcon,   label: "Wallets",    left: "65%",   bottom: "6%" },
  { Icon: CantonIcon,    label: "Canton",     left: "78.2%", bottom: "6%" },
  { Icon: DataFeedsIcon, label: "Data Feeds", left: "90%",   bottom: "6%" },
] as const;

function HeroIcons() {
  return (
    <>
      {HERO_ICONS.map(({ Icon, label, left, bottom }, i) => (
        <div
          key={label}
          className="absolute hidden -translate-x-1/2 lg:block"
          style={{ left, bottom }}
        >
          <div
            className="flex flex-col items-center gap-2.5"
            style={{
              animation: `icon-in-up 0.6s cubic-bezier(0.16,1,0.3,1) ${1.65 + i * 0.14}s both, icon-float ${3.4 + i * 0.4}s ease-in-out ${2.35 + i * 0.14}s infinite`,
            }}
          >
            <div className="icon-ring flex h-12 w-12 items-center justify-center rounded-full border border-data/40 bg-bg text-data shadow-[0_4px_16px_rgba(0,0,0,0.15)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_6px_28px_rgba(14,138,118,0.35)]">
              <Icon size={28} className="text-data/80" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted drop-shadow-sm">
              {label}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}

const BRANCH_ICONS = [
  { Icon: MarketMakingIcon, label: "Market Making", left: "63%",   top: "20%" },
  { Icon: GridIcon,         label: "Grid",          left: "70.6%", top: "10%" },
  { Icon: TakerIcon,        label: "Taker",         left: "78.2%", top: "7%" },
  { Icon: SettlementIcon,   label: "Settlement",    left: "85.9%", top: "10%" },
  { Icon: ProvingIcon,      label: "Proving",       left: "93.5%", top: "20%" },
] as const;

function HeroBranchIcons() {
  return (
    <>
      {BRANCH_ICONS.map(({ Icon, label, left, top }, i) => (
        <div
          key={label}
          className="absolute hidden -translate-x-1/2 lg:block"
          style={{ left, top }}
        >
          <div
            className="flex flex-col items-center gap-2.5"
            style={{
              animation: `icon-in-down 0.6s cubic-bezier(0.16,1,0.3,1) ${1.65 + i * 0.12}s both, icon-float ${3.1 + i * 0.3}s ease-in-out ${2.35 + i * 0.12}s infinite`,
            }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted drop-shadow-sm">
              {label}
            </span>
            <div className="icon-ring flex h-12 w-12 items-center justify-center rounded-full border border-accent/40 bg-bg text-accent shadow-[0_4px_16px_rgba(0,0,0,0.15)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_6px_28px_rgba(214,68,143,0.35)]">
              <Icon size={28} className="text-accent/80" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

/* --------------------------------------------------------------------- hero */

const SCRIM =
  "linear-gradient(to right, var(--bg) 0%, var(--bg) 28%, color-mix(in srgb, var(--bg) 60%, transparent) 46%, transparent 66%)";

// One hero banner. Desktop (lg+): the diagram is the right-side background with
// the copy overlaid and the labelled icon nodes floating over it. Below lg: the
// copy comes first, then the diagram renders full-width beneath it (the icon
// nodes are desktop-only, so the bare diagram reads as a supporting visual).
function Banner({ dark, content }: { dark?: boolean; content: ReactNode }) {
  const imgBlend = dark ? "opacity-60 mix-blend-screen" : "mix-blend-multiply";
  const logoLeft = "78.2%";
  return (
    <section
      className={`relative overflow-hidden border-b border-line ${dark ? "hidden dark:block" : "dark:hidden"}`}
    >
      {/* desktop diagram — right-side background */}
      <Image
        src="/tree_light2.png"
        alt="The Silvana platform: ecosystems — Wallets, Canton, and data feeds — feed into Silvana, which branches into autonomous agents for market making, grid, taker, settlement, and proving."
        width={1672}
        height={941}
        priority
        sizes="65vw"
        className={`mt-14 ml-auto hidden w-[65%] lg:block ${imgBlend}`}
      />
      {/* scrim so the heading reads cleanly over the diagram (desktop) */}
      <div
        aria-hidden
        className="absolute inset-0 hidden lg:block"
        style={{ background: SCRIM }}
      />
      {/* desktop copy — overlaid, vertically centered */}
      <div className="absolute inset-0 hidden lg:block">
        <div className="mx-auto flex h-full max-w-7xl items-center px-6">{content}</div>
      </div>

      {/* mobile / tablet — copy first, then full-width diagram below */}
      <div className="px-6 pb-12 pt-10 lg:hidden">
        {content}
        <Image
          src="/tree_light2.png"
          alt=""
          aria-hidden
          width={1672}
          height={941}
          sizes="100vw"
          className={`mt-10 block w-full ${imgBlend}`}
        />
      </div>

      <HeroIcons />
      <HeroBranchIcons />
      <div
        aria-hidden
        className="absolute hidden -translate-x-1/2 -translate-y-1/2 lg:block"
        style={{ left: logoLeft, top: "51%" }}
      >
        <div
          className="icon-ring flex h-20 w-20 items-center justify-center rounded-full border border-accent/40 bg-bg text-accent shadow-[0_4px_24px_rgba(0,0,0,0.18)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_8px_36px_rgba(214,68,143,0.4)]"
        >
          <LogoMark className="h-11 w-11" />
        </div>
      </div>
    </section>
  );
}

export function Hero() {
  const content = (
    <div className="max-w-xl">
      <h1 className="display-tight text-5xl text-balance text-fg sm:text-6xl lg:text-7xl">
        The agent interaction layer for{" "}
        <span className="text-gradient-flow flex">tokenized assets</span>
      </h1>
      <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-fg backdrop-blur-sm">
        Live on Canton
        <span className="text-muted">
          ·{" "}
          <span className="text-data tabular-nums">
            <Counter value={4218907} prefix="$" live />
          </span>{" "}
          settled
        </span>
      </div>
      <p className="mt-6 text-lg leading-relaxed text-muted">
        Silvana enables AI agents, applications, and institutions to securely
        operate tokenized assets on Canton — deploy agents that trade, settle,
        and prove.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button href="/app">Open the app</Button>
        <Button href="/build" variant="secondary">
          Start building
        </Button>
      </div>

      <p className="mt-4 text-sm text-muted">
        Trading takes minutes. Your first agent takes an afternoon.
      </p>

      {/* key metrics */}
      <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-5">
        {[
          ["<1s", "Order matching"],
          ["100%", "Atomic settlement"],
          ["1,240+", "Agents running"],
        ].map(([v, l]) => (
          <div key={l}>
            <dt className="display tnum text-xl text-fg">{v}</dt>
            <dd className="mt-0.5 text-[11px] uppercase tracking-wider text-muted">
              {l}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );

  return (
    <>
      <Banner content={content} />
      <Banner dark content={content} />
    </>
  );
}
