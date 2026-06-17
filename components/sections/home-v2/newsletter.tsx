"use client";

import { useState, type FormEvent } from "react";
import { Band, Reveal } from "./shared";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "ok" | "err">("idle");

  function submit(e: FormEvent) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setState(valid ? "ok" : "err");
  }

  return (
    <Band>
      <Reveal>
        <div className="glass grid grid-cols-1 items-center gap-x-12 gap-y-8 rounded-3xl p-8 md:p-12 lg:grid-cols-2">
          <div>
            <h2 className="display text-3xl text-fg md:text-4xl">
              The agentic economy, in your inbox.
            </h2>
            <p className="mt-3 max-w-md text-[15px] text-muted">
              Product launches, new markets, and deep dives on agent
              infrastructure. Once or twice a month. No noise.
            </p>
          </div>

          <div>
            {state === "ok" ? (
              <p className="text-[15px] font-medium text-data">
                You&apos;re in. Watch for the next dispatch.
              </p>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state === "err") setState("idle");
                  }}
                  placeholder="you@company.com"
                  aria-label="Email address"
                  className="flex-1 rounded-full border border-line bg-bg px-4 py-2.5 text-sm text-fg placeholder:text-muted focus:border-accent focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover active:scale-[0.98]"
                >
                  Subscribe
                </button>
              </form>
            )}
            {state === "err" && (
              <p className="mt-3 text-sm text-accent">
                That email didn&apos;t go through — mind checking it?
              </p>
            )}
            {state !== "ok" && (
              <p className="mt-3 font-mono text-xs text-muted">
                Unsubscribe anytime. We never share your email.
              </p>
            )}
          </div>
        </div>
      </Reveal>
    </Band>
  );
}
