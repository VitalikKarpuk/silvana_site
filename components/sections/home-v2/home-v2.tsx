/*
  Home — variant 2, restructured to a Mercury-style flow.
  Cool near-white theme, soft white cards on a tinted page, generous whitespace.
  Section order mirrors content/HomePage.md:
  hero → logo wall → bento grid → router band → stats → institutions →
  developers → liquidity providers → pull quote → integration paths →
  blog → newsletter → closing CTA. Brand accents: magenta = CTA/live,
  teal = data. Motion is reduced-motion gated.

  Each section lives in its own file alongside this composer; shared primitives
  (Reveal, Counter, Band, SectionHead, Eyebrow, Label, ArrowLink) are in shared.tsx.
*/

import { Hero } from "./hero";
import { LogoWall } from "./logo-wall";
import { FeatureShowcase } from "./feature-showcase";
import { RouterBand } from "./router-band";
import { Stats } from "./stats";
import { Institutions } from "./institutions";
import { Developers } from "./developers";
import { LiquidityProviders } from "./liquidity-providers";
import { Testimonials } from "./testimonials";
import { GettingStarted } from "./getting-started";
import { Blog } from "./blog";
import { Newsletter } from "./newsletter";
import { ClosingCta } from "./closing-cta";

export function HomeV2() {
  return (
    <>
      <Hero />
      <LogoWall />
      <FeatureShowcase />
      <RouterBand />
      <Stats />
      <Institutions />
      <Developers />
      <LiquidityProviders />
      <Testimonials />
      <GettingStarted />
      <Blog />
      <Newsletter />
      <ClosingCta />
    </>
  );
}
