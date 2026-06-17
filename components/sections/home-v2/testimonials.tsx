import Image from "next/image";
import { ArrowLink, Band, Reveal } from "./shared";

// Pull quote — a single oversized, centered quote (no carousel). The partner
// story cards now live in the Developers section.
export function Testimonials() {
  return (
    <Band>
      <Reveal className="mx-auto max-w-3xl text-center">
        <Image
          src="/partners/loopWallet.svg"
          alt="Loop Wallet"
          width={120}
          height={26}
          className="mx-auto h-6 w-auto opacity-70 grayscale"
        />
        <blockquote className="display mx-auto mt-8 max-w-[20ch] text-3xl leading-[1.12] text-fg sm:text-4xl md:text-5xl">
          &ldquo;Silvana gives our users something wallets alone never could:
          assets that stay under their control while agents do the work.&rdquo;
        </blockquote>
        <figcaption className="mt-8 text-sm text-muted">
          Head of Product, Loop Wallet
        </figcaption>
        <ArrowLink
          href="/solutions/case-studies"
          className="mt-6 justify-center"
        >
          Read the story
        </ArrowLink>
      </Reveal>
    </Band>
  );
}
