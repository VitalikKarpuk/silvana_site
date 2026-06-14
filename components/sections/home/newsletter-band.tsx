"use client";

import { useState } from "react";

// Full-width newsletter band above the closing CTA. Inline success/error states.
export function NewsletterBand() {
  const [state, setState] = useState<"idle" | "done" | "error">("idle");
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    setState(ok ? "done" : "error");
  };

  return (
    <section className="border-b border-line px-6 py-12">
      <div className="glass mx-auto flex max-w-7xl flex-col gap-6 rounded-3xl px-8 py-10 md:flex-row md:items-center md:justify-between">
        <div className="max-w-md">
          <h2 className="display text-2xl text-fg sm:text-3xl">
            The agentic economy, in your inbox.
          </h2>
          <p className="mt-2 text-sm text-muted">
            Product launches, new markets, and deep dives on agent infrastructure. Once or
            twice a month. No noise.
          </p>
        </div>
        <div className="w-full max-w-md">
          {state === "done" ? (
            <div
              role="status"
              aria-live="polite"
              className="flex items-center gap-2.5 rounded-lg border border-data/40 bg-data/10 px-4 py-3 text-sm text-fg"
            >
              <span className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-data text-bg">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
              You&apos;re in. Watch for the next dispatch.
            </div>
          ) : (
            <form onSubmit={submit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                aria-label="Email address"
                autoComplete="email"
                required
                className="min-w-0 flex-1 rounded-lg border border-line bg-white/5 px-3 py-2.5 text-sm text-fg placeholder:text-muted focus:border-data focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover"
              >
                Subscribe
              </button>
            </form>
          )}
          {state === "error" && (
            <p role="alert" className="mt-2 text-sm text-accent">
              That email didn&apos;t go through — mind checking it?
            </p>
          )}
          {state !== "done" && (
            <p className="mt-2 text-xs text-muted">
              Unsubscribe anytime. We never share your email.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
