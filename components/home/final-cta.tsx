"use client";

import { Reveal } from "@/components/animation/reveal";
import { BrandPot } from "@/components/pottery/brand-pot";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getDictionary } from "@/data/i18n/ro";

const copy = getDictionary();

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div
        className="pointer-events-none absolute -right-10 top-1/2 h-[360px] w-[280px] -translate-y-1/2 opacity-30 md:h-[480px] md:w-[400px]"
        aria-hidden
      >
        <BrandPot
          className="h-full w-full"
          spinSpeed={0.28}
          cameraZ={3.6}
          framed={false}
          showShadow={false}
        />
      </div>

      <Container className="relative z-10">
        <Reveal className="max-w-2xl">
          <h2 className="heading-display text-[clamp(2.5rem,6vw,5rem)]">
            {copy.finalCta.title}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted md:text-lg">
            {copy.finalCta.supporting}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/#colectii" size="lg" showArrow>
              {copy.finalCta.primary}
            </Button>
            <Button href="/#atelier" variant="secondary" size="lg">
              {copy.finalCta.secondary}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
