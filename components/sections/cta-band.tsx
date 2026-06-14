import { Button } from "@/components/ui/button";

export function CtaBand({
  headline,
  body,
  primary,
  secondary,
}: {
  headline: string;
  body?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-20 text-center md:py-28">
        <h2 className="display mx-auto max-w-2xl text-3xl text-fg sm:text-4xl">
          {headline}
        </h2>
        {body && <p className="mx-auto mt-4 max-w-xl text-muted">{body}</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href={primary.href}>{primary.label}</Button>
          {secondary && (
            <Button href={secondary.href} variant="secondary">
              {secondary.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
