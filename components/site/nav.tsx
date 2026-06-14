"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_GROUPS, NAV_STANDALONE } from "@/lib/nav";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";

// Near-opaque dark "vibrancy" surface for floating menus. Set inline (not via a
// utility/custom class) so it always paints — page content behind stays fully
// obscured and menu items read clearly over any background.
const MENU_SURFACE: React.CSSProperties = {
  background: "linear-gradient(180deg, rgba(20,20,30,0.98), rgba(11,11,18,0.985))",
  backdropFilter: "blur(24px) saturate(160%)",
  WebkitBackdropFilter: "blur(24px) saturate(160%)",
  boxShadow: "0 22px 56px -16px rgba(0,0,0,0.85)",
};

export function Nav() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-[var(--glass-bg)] backdrop-blur-xl backdrop-saturate-150">
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
                      style={{ ...MENU_SURFACE, border: "1px solid rgba(255,255,255,0.1)" }}
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

        <div className="flex items-center gap-3">
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

      {/* Mobile menu */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ ...MENU_SURFACE, borderTop: "1px solid rgba(255,255,255,0.1)" }}
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
