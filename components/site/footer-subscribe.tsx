"use client";

import { useState } from "react";

// Compact footer repeat of the newsletter form (HomePage.md). Mirrors the main
// band's inline validation so the footer Subscribe never reloads the page.
export function FooterSubscribe() {
  const [state, setState] = useState<"idle" | "done" | "error">("idle");
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
    setState(ok ? "done" : "error");
  };

  if (state === "done") {
    return (
      <p role="status" aria-live="polite" className="text-sm text-data">
        You&apos;re in. Watch for the next dispatch.
      </p>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <form onSubmit={submit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Email address"
          autoComplete="email"
          required
          className="min-w-0 flex-1 rounded-lg border border-line bg-white/5 px-3 py-2 text-sm text-fg placeholder:text-muted focus:border-data focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-hover"
        >
          Subscribe
        </button>
      </form>
      {state === "error" && (
        <p role="alert" className="mt-2 text-xs text-accent">
          That email didn&apos;t go through — mind checking it?
        </p>
      )}
    </div>
  );
}
