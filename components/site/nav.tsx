"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { NAV_GROUPS, NAV_STANDALONE } from "@/lib/nav";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";

// Near-opaque "paper" surface for floating menus. Uses the theme surface token
// so it adapts to light/dark (white paper in light, near-black in dark); set
// inline so it always paints and fully obscures the page content behind it.
const MENU_SURFACE: React.CSSProperties = {
  background: "color-mix(in srgb, var(--surface) 98%, transparent)",
  backdropFilter: "blur(24px) saturate(140%)",
  WebkitBackdropFilter: "blur(24px) saturate(140%)",
  boxShadow: "0 22px 56px -20px rgba(0,0,0,0.32)",
};

export function Nav() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-line bg-[var(--glass-bg)] backdrop-blur-xl backdrop-saturate-150 transition-shadow duration-300 ${
        scrolled ? "shadow-[0_10px_30px_-18px_rgba(20,22,29,0.35)]" : ""
      }`}
    >
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center text-fg" aria-label="Silvana home">
          <Logo className="h-6 w-auto" />
        </Link>

        {/* Desktop links — absolutely centered in the bar, independent of the
            logo / actions widths on either side */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 whitespace-nowrap lg:flex">
          {NAV_GROUPS.map((g) => (
            <div
              key={g.label}
              className="relative"
              onMouseEnter={() => setOpen(g.label)}
              onMouseLeave={() => setOpen(null)}
              onFocus={() => setOpen(g.label)}
              onBlur={(e) => {
                // close only when focus leaves the whole group (keyboard tab-out)
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpen(null);
              }}
            >
              <Link
                href={g.href}
                aria-haspopup="menu"
                aria-expanded={open === g.label}
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-fg"
              >
                {g.label}
                <Chevron />
              </Link>
              <AnimatePresence>
                {open === g.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                    className="absolute left-0 top-full w-80 pt-2"
                  >
                    <div
                      className="overflow-hidden rounded-2xl p-2"
                      style={{ ...MENU_SURFACE, border: "1px solid var(--line)" }}
                    >
                      {g.items.map((it) => (
                        <Link
                          key={it.href + it.label}
                          href={it.href}
                          className="group/item flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-2"
                        >
                          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-2 text-accent transition-colors group-hover/item:border-accent/30">
                            <NavIcon name={it.icon} />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-medium text-fg">{it.label}</span>
                            {it.desc && (
                              <span className="mt-0.5 block text-xs text-muted">{it.desc}</span>
                            )}
                          </span>
                        </Link>
                      ))}
                      {g.featured && (
                        <Link
                          href={g.featured.href}
                          className="mt-1 block border-t border-line px-3 py-2.5 text-sm font-medium text-data hover:text-fg"
                        >
                          {g.featured.label} →
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          {NAV_STANDALONE.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-fg"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Button href="/app" variant="primary" className="hidden sm:inline-flex">
            Open the app
          </Button>
          <button
            aria-label="Menu"
            className="lg:hidden text-fg"
            onClick={() => setMobile((v) => !v)}
          >
            <Burger open={mobile} />
          </button>
        </div>
      </nav>

      {/* reading progress */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent"
        style={{ scaleX: progress }}
      />

      {/* Mobile menu */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ ...MENU_SURFACE, borderTop: "1px solid var(--line)" }}
            className="overflow-hidden lg:hidden"
          >
            <div className="space-y-4 px-6 py-6">
              {NAV_GROUPS.map((g) => (
                <div key={g.label}>
                  <div className="mb-1 text-xs uppercase tracking-wider text-muted">
                    {g.label}
                  </div>
                  {g.items.map((it) => (
                    <Link
                      key={it.href + it.label}
                      href={it.href}
                      className="flex items-center gap-2.5 py-1.5 text-sm text-fg"
                      onClick={() => setMobile(false)}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-line bg-surface-2 text-accent">
                        <NavIcon name={it.icon} />
                      </span>
                      {it.label}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-4">
                {NAV_STANDALONE.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="py-1 text-sm text-fg"
                    onClick={() => setMobile(false)}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
              <Button href="/app" className="w-full">
                Open the app
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-fg"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {dark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
          </>
        ) : (
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        )}
      </svg>
    </button>
  );
}

// Submenu icons — one per nav item, meaning-matched. Geometry follows the
// Lucide grid (24px box, 1.75 stroke, round caps/joins) so each glyph stays
// crisp and balanced at the 16px render size. Color inherits via currentColor.
function NavIcon({ name }: { name?: string }) {
  const p = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-4 w-4",
    "aria-hidden": true,
  };
  switch (name) {
    case "book": // Silvana Book — open book
      return <svg {...p}><path d="M2 4h6a3 3 0 0 1 3 3v13a2.5 2.5 0 0 0-2.5-2.5H2z" /><path d="M22 4h-6a3 3 0 0 0-3 3v13a2.5 2.5 0 0 1 2.5-2.5H22z" /></svg>;
    case "api": // Agentic API — gRPC braces
      return <svg {...p}><path d="M8 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1" /><path d="M16 3h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-1" /></svg>;
    case "sdk": // SDK — package
      return <svg {...p}><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /><path d="m7.5 4.3 9 5.1" /></svg>;
    case "agent": // autonomous bot
      return <svg {...p}><path d="M12 8V4H8" /><rect x="4" y="8" width="16" height="12" rx="2" /><path d="M2 14h2M20 14h2M9 13v2M15 13v2" /></svg>;
    case "catalog": // grid of agents
      return <svg {...p}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>;
    case "play": // use cases in action — play circle
      return <svg {...p}><circle cx="12" cy="12" r="9" /><path d="M10 8.5v7l5.5-3.5z" /></svg>;
    case "playground": // sliders / controls
      return <svg {...p}><path d="M4 6h7M15 6h5M4 12h3M11 12h9M4 18h9M17 18h3" /><path d="M13 4v4M9 10v4M15 16v4" /></svg>;
    case "guide": // SDK guide — graduation cap
      return <svg {...p}><path d="M21.4 10.1 12.4 6a1 1 0 0 0-.8 0L2.6 10.1a.5.5 0 0 0 0 .92l9 4.05a1 1 0 0 0 .8 0l9-4.05a.5.5 0 0 0 0-.92Z" /><path d="M22 10.5V16" /><path d="M6 12.5V16c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-3.5" /></svg>;
    case "code": // api reference — </>
      return <svg {...p}><path d="m16 18 6-6-6-6M8 6l-6 6 6 6" /></svg>;
    case "layers": // hosting models — stacked
      return <svg {...p}><path d="M12.4 2.5a1 1 0 0 0-.8 0l-8.6 3.9a.5.5 0 0 0 0 .9l8.6 3.9a1 1 0 0 0 .8 0l8.6-3.9a.5.5 0 0 0 0-.9z" /><path d="m3 12 8.6 3.9a1 1 0 0 0 .8 0L21 12" /><path d="m3 17 8.6 3.9a1 1 0 0 0 .8 0L21 17" /></svg>;
    case "sparkles": // use cases — possibilities
      return <svg {...p}><path d="M11.5 3.5 13 8.2a2 2 0 0 0 1.3 1.3l4.7 1.5-4.7 1.5A2 2 0 0 0 13 13.8l-1.5 4.7-1.5-4.7a2 2 0 0 0-1.3-1.3L4 11l4.7-1.5A2 2 0 0 0 10 8.2z" /><path d="M19 4v3M20.5 5.5h-3" /></svg>;
    case "users": // who can use
      return <svg {...p}><path d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20" /><circle cx="9.5" cy="7" r="3.5" /><path d="M16 3.8a3.5 3.5 0 0 1 0 6.7M21 20v-1.5a4 4 0 0 0-3-3.85" /></svg>;
    case "chart": // case studies — results
      return <svg {...p}><path d="M4 4v15a1 1 0 0 0 1 1h15" /><path d="M8 16v-3M13 16V9M18 16v-5" /></svg>;
    default:
      return <svg {...p}><circle cx="12" cy="12" r="8" /><path d="M12 8v4l2.5 2.5" /></svg>;
  }
}

function Chevron() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Burger({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      )}
    </svg>
  );
}
