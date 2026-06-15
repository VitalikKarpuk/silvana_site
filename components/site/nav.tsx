"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { NAV_GROUPS, NAV_STANDALONE } from "@/lib/nav";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";

// Near-opaque light "paper" surface for floating menus. Set inline (not via a
// utility/custom class) so it always paints — page content behind stays fully
// obscured and menu items read clearly over any background.
const MENU_SURFACE: React.CSSProperties = {
  background: "rgba(255,255,255,0.98)",
  backdropFilter: "blur(24px) saturate(140%)",
  WebkitBackdropFilter: "blur(24px) saturate(140%)",
  boxShadow: "0 22px 56px -20px rgba(23,21,15,0.22)",
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
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center text-fg" aria-label="Silvana home">
          <Logo className="h-6 w-auto" />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
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
                          className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-2"
                        >
                          <div className="text-sm font-medium text-fg">{it.label}</div>
                          {it.desc && (
                            <div className="mt-0.5 text-xs text-muted">{it.desc}</div>
                          )}
                        </Link>
                      ))}
                      <Link
                        href={g.featured.href}
                        className="mt-1 block border-t border-line px-3 py-2.5 text-sm font-medium text-data hover:text-fg"
                      >
                        {g.featured.label} →
                      </Link>
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
                      className="block py-1.5 text-sm text-fg"
                      onClick={() => setMobile(false)}
                    >
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
