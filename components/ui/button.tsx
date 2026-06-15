import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-[background-color,border-color,transform] duration-200 whitespace-nowrap active:scale-[0.98] [transition-timing-function:var(--ease-out)]";

const variants: Record<Variant, string> = {
  // magenta — reserved for primary CTAs only (flat, no glow — Swiss style)
  primary: "bg-accent text-white hover:bg-accent-hover",
  secondary: "border border-fg/25 text-fg hover:bg-fg hover:text-bg",
  ghost: "text-muted hover:text-fg",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const external = href.startsWith("http");
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
