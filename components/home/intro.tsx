import { Reveal } from "@/components/animation/reveal";
import { Container } from "@/components/ui/container";
import { DecorativeLine } from "@/components/ui/decorative-line";
import { getDictionary } from "@/data/i18n/ro";

const copy = getDictionary();

export function Intro() {
  return (
    <section className="bg-warm-white py-20 md:py-28" aria-labelledby="intro-title">
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-clay">
            {copy.intro.eyebrow}
          </p>
          <h2
            id="intro-title"
            className="heading-display text-balance text-[clamp(2.25rem,5vw,4rem)]"
          >
            {copy.intro.title}
          </h2>
          <DecorativeLine
            variant="dots"
            color="#B96F4B"
            className="mx-auto mt-6 max-w-[200px]"
          />
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {copy.intro.body}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
