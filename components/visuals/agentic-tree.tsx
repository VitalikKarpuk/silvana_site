"use client";

import { motion, useReducedMotion } from "framer-motion";

/*
  Silvana hub diagram (matches the brand reference): a glossy chip tile with
  the Silvana logo at center; ecosystems on the left (teal) and the flagship
  agents on the right (magenta), each an icon node wired to the chip with
  neon PCB traces. Signals flow in→chip→out. Final frame under reduced-motion.
*/

const ALT =
  "Silvana hub: ecosystems (Wallets, Canton, Data feeds) wire into the Silvana chip, which connects out to its agents — Market making, Grid, Taker, Settlement, Proving.";

// Silvana mark (two leaves) — from the logo.
const MARK1 =
  "M16.5989 28.156C14.9522 29.6877 12.7383 30.5418 10.5308 30.1121C8.54576 29.7257 6.61337 29.1098 4.74981 28.2678C3.95174 27.907 3.16171 27.5019 2.40253 27.0619C-0.69279 25.2707 -0.701772 21.0773 1.82682 18.5483L14.7488 5.62448C15.4086 4.96452 16.3037 4.59375 17.2369 4.59375H38.6204C39.6653 4.59375 40.1886 5.85707 39.4498 6.59592C35.5144 10.5312 22.2451 22.9042 16.5989 28.156Z";
const MARK2 =
  "M5.17513 41.9977L28.0148 20.4832C29.6677 18.9262 31.9031 18.0531 34.1314 18.4901C36.1036 18.8769 38.0238 19.4904 39.8759 20.3273C40.674 20.6881 41.464 21.0931 42.2232 21.5331C45.3184 23.3243 45.3273 27.5177 42.7986 30.0464L29.8756 42.9694C29.2157 43.6293 28.3208 44 27.3876 44H6.00437C4.95941 44 4.43616 42.7365 5.17513 41.9977Z";

const CHIP = { x: 284, y: 119, w: 92, h: 92 };
const CL = CHIP.x; // 284
const CR = CHIP.x + CHIP.w; // 376
const CCX = CHIP.x + CHIP.w / 2; // 330
const CCY = CHIP.y + CHIP.h / 2; // 165

type Node = { cx: number; cy: number; pin: number; icon: string; label: string; d: string };

// Right-angle trace with one vertical jog, from (x1,y1) to node edge.
function route(x1: number, y1: number, midX: number, x2: number, y2: number) {
  return y1 === y2 ? `M${x1} ${y1} H${x2}` : `M${x1} ${y1} H${midX} V${y2} H${x2}`;
}

const INPUTS: Node[] = [
  { cx: 72, cy: 60, pin: 140, icon: "wallet", label: "WALLETS", d: route(CL, 140, 184, 95, 60) },
  { cx: 72, cy: 165, pin: 165, icon: "canton", label: "CANTON", d: route(CL, 165, 184, 95, 165) },
  { cx: 72, cy: 270, pin: 190, icon: "data", label: "DATA FEEDS", d: route(CL, 190, 184, 95, 270) },
];
const OUTPUTS: Node[] = [
  { cx: 560, cy: 50, pin: 130, icon: "chart", label: "MARKET MAKING", d: route(CR, 130, 470, 539, 50) },
  { cx: 560, cy: 108, pin: 148, icon: "grid", label: "GRID", d: route(CR, 148, 488, 539, 108) },
  { cx: 560, cy: 165, pin: 165, icon: "person", label: "TAKER", d: route(CR, 165, 488, 539, 165) },
  { cx: 560, cy: 222, pin: 183, icon: "bank", label: "SETTLEMENT", d: route(CR, 183, 488, 539, 222) },
  { cx: 560, cy: 280, pin: 200, icon: "shield", label: "PROVING", d: route(CR, 200, 470, 539, 280) },
];

function Icon({ name, cx, cy, color }: { name: string; cx: number; cy: number; color: string }) {
  const p = { stroke: color, strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, fill: "none" };
  switch (name) {
    case "wallet":
      return (
        <g {...p}>
          <rect x={cx - 8} y={cy - 6} width="16" height="12" rx="2.5" />
          <path d={`M${cx + 2} ${cy} h6`} />
          <circle cx={cx + 4.5} cy={cy} r="0.2" />
        </g>
      );
    case "canton":
      return <path {...p} d={`M${cx + 5} ${cy - 5.5} A 6.5 6.5 0 1 0 ${cx + 5} ${cy + 5.5}`} />;
    case "data":
      return (
        <g {...p}>
          <ellipse cx={cx} cy={cy - 5} rx="7" ry="2.6" />
          <path d={`M${cx - 7} ${cy - 5} V${cy + 5} A7 2.6 0 0 0 ${cx + 7} ${cy + 5} V${cy - 5}`} />
          <path d={`M${cx - 7} ${cy} A7 2.6 0 0 0 ${cx + 7} ${cy}`} />
        </g>
      );
    case "chart":
      return (
        <g {...p}>
          <path d={`M${cx - 7} ${cy + 6} H${cx + 7}`} />
          <path d={`M${cx - 5} ${cy + 6} V${cy + 1} M${cx} ${cy + 6} V${cy - 3} M${cx + 5} ${cy + 6} V${cy - 6}`} />
        </g>
      );
    case "grid":
      return (
        <g fill={color}>
          {[-5, 0, 5].map((dx) => [-5, 0, 5].map((dy) => <rect key={`${dx},${dy}`} x={cx + dx - 1.4} y={cy + dy - 1.4} width="2.8" height="2.8" rx="0.6" />))}
        </g>
      );
    case "person":
      return (
        <g {...p}>
          <circle cx={cx} cy={cy - 3.5} r="3" />
          <path d={`M${cx - 6} ${cy + 7} a6 6 0 0 1 12 0`} />
        </g>
      );
    case "bank":
      return (
        <g {...p}>
          <path d={`M${cx - 8} ${cy - 2} L${cx} ${cy - 8} L${cx + 8} ${cy - 2}`} />
          <path d={`M${cx - 6} ${cy - 1} V${cy + 5} M${cx} ${cy - 1} V${cy + 5} M${cx + 6} ${cy - 1} V${cy + 5}`} />
          <path d={`M${cx - 8} ${cy + 6} H${cx + 8}`} />
        </g>
      );
    case "shield":
      return (
        <g {...p}>
          <path d={`M${cx} ${cy - 8} L${cx + 7} ${cy - 4.5} V${cy} Q${cx + 7} ${cy + 6} ${cx} ${cy + 8.5} Q${cx - 7} ${cy + 6} ${cx - 7} ${cy} V${cy - 4.5} Z`} />
          <path d={`M${cx - 3} ${cy} l2.2 2.4 L${cx + 3.5} ${cy - 2.5}`} />
        </g>
      );
    default:
      return null;
  }
}

export function AgenticTree({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  const line = {
    hidden: { pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 },
    show: { pathLength: 1, opacity: 1, transition: { pathLength: { duration: 1.6, ease: "easeOut" as const }, opacity: { duration: 0.3 } } },
  };
  const appear = {
    hidden: { opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.7 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: reduce ? 0 : 1.2 } },
  };
  const label = { hidden: { opacity: reduce ? 1 : 0 }, show: { opacity: 1, transition: { duration: 0.5, delay: reduce ? 0 : 1.45 } } };

  const renderNode = (n: Node, side: "in" | "out") => {
    const color = side === "in" ? "var(--data)" : "var(--accent)";
    return (
      <motion.g key={`${side}${n.label}`} variants={appear} initial="hidden" animate="show">
        <circle cx={n.cx} cy={n.cy} r="22" fill="rgba(255,255,255,0.04)" stroke={color} strokeWidth="1.5" filter="url(#glow)" />
        <circle cx={n.cx} cy={n.cy} r="21" fill="url(#nodeHi)" />
        <Icon name={n.icon} cx={n.cx} cy={n.cy} color={color} />
        <motion.text
          x={side === "in" ? n.cx + 32 : n.cx + 32}
          y={side === "in" ? n.cy - 7 : n.cy + 4}
          fill={color}
          fontSize="9.5"
          letterSpacing="0.1em"
          style={{ fontFamily: "var(--font-whyte), sans-serif" }}
          variants={label}
          initial="hidden"
          animate="show"
        >
          {n.label}
        </motion.text>
      </motion.g>
    );
  };

  return (
    <svg viewBox="0 0 680 330" className={className} fill="none" role="img" aria-label={ALT}>
      <defs>
        <linearGradient id="chipFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#23232c" />
          <stop offset="1" stopColor="#0e0e15" />
        </linearGradient>
        <radialGradient id="chipGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#d6448f" stopOpacity="0.5" />
          <stop offset="1" stopColor="#d6448f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="chipGloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="0.45" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="0.55" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="nodeHi" cx="38%" cy="30%" r="75%">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.28" />
          <stop offset="0.6" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="2.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* chip glow halo + faint circuit field */}
      <circle cx={CCX} cy={CCY} r="120" fill="url(#chipGlow)" opacity="0.6" />
      <g stroke="var(--data)" strokeOpacity="0.12" strokeWidth="1">
        {[300, 312, 348, 360].map((x) => (
          <path key={x} d={`M${x} 95 V235`} />
        ))}
      </g>

      {/* traces */}
      {INPUTS.map((n, i) => (
        <motion.path key={`it${i}`} d={n.d} stroke="var(--data)" strokeOpacity="0.65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" variants={line} initial="hidden" animate="show" />
      ))}
      {OUTPUTS.map((n, i) => (
        <motion.path key={`ot${i}`} d={n.d} stroke="var(--accent)" strokeOpacity="0.65" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" variants={line} initial="hidden" animate="show" />
      ))}

      {/* connection pads at chip edge */}
      {INPUTS.map((n, i) => (
        <motion.rect key={`ip${i}`} x={CL - 3} y={n.pin - 3} width="6" height="6" rx="1.5" fill="var(--data)" variants={appear} initial="hidden" animate="show" />
      ))}
      {OUTPUTS.map((n, i) => (
        <motion.rect key={`op${i}`} x={CR - 3} y={n.pin - 3} width="6" height="6" rx="1.5" fill="var(--accent)" variants={appear} initial="hidden" animate="show" />
      ))}

      {/* signal flow */}
      {!reduce &&
        INPUTS.map((n, i) => (
          <motion.path key={`if${i}`} d={n.d} pathLength={1} stroke="var(--data)" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="0.09 1" initial={{ strokeDashoffset: 0, opacity: 0 }} animate={{ strokeDashoffset: [0, 1], opacity: [0, 1, 1, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 1.8 + i * 0.35, repeatDelay: 1 }} />
        ))}
      {!reduce &&
        OUTPUTS.map((n, i) => (
          <motion.path key={`of${i}`} d={n.d} pathLength={1} stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="0.09 1" initial={{ strokeDashoffset: 1, opacity: 0 }} animate={{ strokeDashoffset: [1, 0], opacity: [0, 1, 1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 2.6 + i * 0.22, repeatDelay: 1.2 }} />
        ))}

      {/* endpoint nodes */}
      {INPUTS.map((n) => renderNode(n, "in"))}
      {OUTPUTS.map((n) => renderNode(n, "out"))}

      {/* chip */}
      <motion.g variants={appear} initial="hidden" animate="show">
        <rect x={CHIP.x} y={CHIP.y} width={CHIP.w} height={CHIP.h} rx="18" fill="url(#chipFill)" stroke="var(--accent)" strokeOpacity="0.6" strokeWidth="1.5" filter="url(#glow)" />
        {/* glossy top sheen + edge highlight for volume */}
        <rect x={CHIP.x} y={CHIP.y} width={CHIP.w} height={CHIP.h} rx="18" fill="url(#chipGloss)" />
        <rect x={CHIP.x + 1.5} y={CHIP.y + 1.5} width={CHIP.w - 3} height={CHIP.h - 3} rx="16.5" fill="none" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1" />
        {/* logo: mark + wordmark */}
        <svg x={CCX - 16} y={CCY - 26} width="32" height="22" viewBox="0 0 45 46" fill="none" overflow="visible">
          <path d={MARK1} fill="var(--accent)" />
          <path d={MARK2} fill="var(--accent)" />
        </svg>
        <text x={CCX} y={CCY + 18} textAnchor="middle" fill="#f5f6f8" fontSize="15" fontWeight="700" style={{ fontFamily: "var(--font-whyte), sans-serif", letterSpacing: "-0.01em" }}>
          silvana
        </text>
      </motion.g>
    </svg>
  );
}
