import Link from "next/link";
import { FOOTER_COLUMNS, POSITIONING_LINE } from "@/lib/nav";
import { Logo } from "@/components/site/logo";
import { FooterSubscribe } from "@/components/site/footer-subscribe";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-bg">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Logo className="h-7 w-auto text-fg" />
            <p className="mt-3 max-w-xs text-sm text-muted">
              The agent interaction layer for tokenized assets.
            </p>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <div className="mb-3 text-xs uppercase tracking-wider text-muted">
                {col.title}
              </div>
              <ul className="space-y-2">
                {col.links.map((l) => {
                  const external = l.href.startsWith("http");
                  return (
                    <li key={l.href + l.label}>
                      <Link
                        href={l.href}
                        {...(external && {
                          target: "_blank",
                          rel: "noopener noreferrer",
                        })}
                        className="text-sm text-muted transition-colors hover:text-fg"
                      >
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter mini-form */}
        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted">
            The agentic economy, in your inbox. Once or twice a month.
          </div>
          <FooterSubscribe />
        </div>

        <div className="mt-8 flex flex-col gap-2 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© Silvana</span>
          <span className="font-mono">{POSITIONING_LINE}</span>
        </div>
      </div>
    </footer>
  );
}
