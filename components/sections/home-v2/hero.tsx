import type { ReactNode } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  WalletsIcon, CantonIcon, DataFeedsIcon,
  MarketMakingIcon, GridIcon, TakerIcon, SettlementIcon, ProvingIcon,
} from "@/components/ui/icons";
import { LogoMark } from "@/components/site/logo";
import { Counter } from "./shared";

/* ---------------------------------------------------------------- hero icons

   All icon nodes and the logo are positioned in percentages of the DIAGRAM
   stage (the tree image's own box), not the section — so they stay locked to
   the tree at every viewport width. The trunk sits at the horizontal centre
   (50%): blue roots fan across the bottom (ecosystems feeding in), pink
   branches arc across the top (agents branching out). */

const HERO_ICONS = [
  { Icon: WalletsIcon,   label: "Wallets",    left: "18%", bottom: "-5%" },
  { Icon: CantonIcon,    label: "Canton",     left: "50%", bottom: "-4%" },
  { Icon: DataFeedsIcon, label: "Data Feeds", left: "82%", bottom: "-5%" },
] as const;

function HeroIcons() {
  return (
    <>
      {HERO_ICONS.map(({ Icon, label, left, bottom }, i) => (
        <div
          key={label}
          className="absolute -translate-x-1/2"
          style={{ left, bottom }}
        >
          <div
            className="flex flex-col items-center gap-2.5"
            style={{
              animation: `icon-in-up 0.6s cubic-bezier(0.16,1,0.3,1) ${1.65 + i * 0.14}s both, icon-float ${3.4 + i * 0.4}s ease-in-out ${2.35 + i * 0.14}s infinite`,
            }}
          >
            <div className="icon-ring flex h-12 w-12 items-center justify-center rounded-full border border-[#1cc5bd]/55 bg-bg text-[#1cc5bd] shadow-[0_4px_16px_rgba(0,0,0,0.15)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_6px_28px_rgba(28,197,189,0.35)]">
              <Icon size={28} className="text-[#1cc5bd]" />
            </div>
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted drop-shadow-sm lg:block">
              {label}
            </span>
          </div>
        </div>
      ))}
    </>
  );
}

const BRANCH_ICONS = [
  { Icon: MarketMakingIcon, label: "Market Making", left: "20%", top: "5%" },
  { Icon: GridIcon,         label: "Grid",          left: "35%", top: "-5%" },
  { Icon: TakerIcon,        label: "Taker",         left: "48.8%", top: "-10%" },
  { Icon: SettlementIcon,   label: "Settlement",    left: "65%", top: "-5%" },
  { Icon: ProvingIcon,      label: "Proving",       left: "80%", top: "5%" },
] as const;

function HeroBranchIcons() {
  return (
    <>
      {BRANCH_ICONS.map(({ Icon, label, left, top }, i) => (
        <div
          key={label}
          className="absolute -translate-x-1/2"
          style={{ left, top }}
        >
          <div
            className="flex flex-col items-center gap-2.5"
            style={{
              animation: `icon-in-down 0.6s cubic-bezier(0.16,1,0.3,1) ${1.65 + i * 0.12}s both, icon-float ${3.1 + i * 0.3}s ease-in-out ${2.35 + i * 0.12}s infinite`,
            }}
          >
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted drop-shadow-sm lg:block">
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

/* ---------------------------------------------------------------- diagram */

// The tree diagram + its floating icon nodes, locked together. The <Image> is
// `block w-full`, so its intrinsic aspect ratio drives this box's height and
// every node (positioned in % of this box) scales with it as one unit. The box
// never dictates the banner height — it just fills the visual column / stacks
// under the copy on mobile.
function Diagram({ imgBlend }: { imgBlend: string }) {
  return (
    // The image is `block w-full`, so its intrinsic (near-square) aspect ratio
    // drives this box's height. No crop — the tree is full-bleed (branches and
    // roots reach the edges), so the whole diagram always stays visible. Icon
    // nodes are positioned in % of this box and scale with it as one unit.
    <div className="relative w-full">
      <Image
        src="/tree_light1.png"
        alt="The Silvana platform: ecosystems — Wallets, Canton, and data feeds — feed into Silvana, which branches into autonomous agents for market making, grid, taker, settlement, and proving."
        width={822}
        height={826}
        priority
        sizes="(min-width: 1024px) 52vw, 100vw"
        className={`block w-full ${imgBlend}`}
      />

      <HeroIcons />
      <HeroBranchIcons />

      {/* Silvana mark on the trunk (centre of the diagram) */}
      <div
        aria-hidden
        className="absolute left-[48.8%] top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="icon-ring flex h-20 w-20 items-center justify-center rounded-full border border-accent/40 bg-bg text-accent shadow-[0_4px_24px_rgba(0,0,0,0.18)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_8px_36px_rgba(214,68,143,0.4)]">
          <LogoMark className="h-11 w-11" />
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- hero */

// Left→right scrim that fades the page colour into the diagram, so the copy
// stays legible where it overlaps the right-side background on lg+.
const SCRIM =
  "linear-gradient(to right, var(--bg) 0%, var(--bg) 26%, color-mix(in srgb, var(--bg) 55%, transparent) 46%, transparent 68%)";

// One hero banner. The copy always sits in normal flow and drives the banner
// height. The diagram is responsive:
//   · below md  — shown stacked beneath the copy (capped + centred);
//   · md → <lg  — hidden entirely (copy only);
//   · lg+       — a right-side background the copy overlaps, softened by a scrim.
// Two banners are rendered (light / dark) and toggled by theme — identical
// except for how the diagram blends into the background.
function Banner({ dark, content }: { dark?: boolean; content: ReactNode }) {
  const imgBlend = dark ? "opacity-60 mix-blend-screen" : "mix-blend-multiply";
  return (
    <section
      className={`relative overflow-x-clip border-b border-line ${dark ? "hidden dark:block" : "dark:hidden"}`}
    >
      {/* sm → <lg : fixed-size diagram pinned to the right edge. Its size does
          not change across this range; it's free to bleed past the top/bottom
          of the banner (section clips only the x-axis, so the y-overflow shows). */}
      <div className="pointer-events-none absolute right-0 top-1/2 hidden w-136 -translate-y-1/2 sm:block lg:hidden">
        <Diagram imgBlend={imgBlend} />
      </div>

      {/* lg+ : responsive right-side background within the content container */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="relative mx-auto h-full max-w-7xl px-6">
          <div className="absolute right-6 top-1/2 w-[56%] -translate-y-1/2">
            <Diagram imgBlend={imgBlend} />
          </div>
        </div>
      </div>

      {/* scrim keeps the copy readable where it overlaps the diagram */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden sm:block"
        style={{ background: SCRIM }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20 lg:py-28">
        {/* copy — in flow, defines the banner height; overlaps the diagram on lg.
            Below sm there is no diagram, so the copy is centred; from sm up it
            aligns left beside the diagram. */}
        <div className="mx-auto max-w-xl text-center sm:mx-0 sm:text-left">{content}</div>
      </div>
    </section>
  );
}

export function Hero() {
  const content = (
    <div className="max-w-xl">
      <h1 className="display-tight text-5xl text-balance text-fg sm:text-6xl lg:text-7xl">
        The agent interaction layer for{" "}
        <span className="text-gradient-flow flex justify-center sm:justify-start">tokenized assets</span>
      </h1>
      <div className="mt-6 inline-flex max-w-full flex-wrap items-center justify-center gap-x-2.5 gap-y-0.5 rounded-2xl border border-line bg-surface/70 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-fg backdrop-blur-sm sm:justify-start sm:rounded-full sm:tracking-[0.18em]">
        <span className="whitespace-nowrap">Live on Canton</span>
        <span className="whitespace-nowrap text-muted">
          <span aria-hidden className="hidden sm:inline">· </span>
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

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
        <Button href="/app">Open the app</Button>
        <Button href="/build" variant="secondary">
          Start building
        </Button>
      </div>

      <p className="mt-4 text-sm text-muted">
        Trading takes minutes. Your first agent takes an afternoon.
      </p>

      {/* key metrics */}
      <dl className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-4 border-t border-line pt-5 sm:justify-start">
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
