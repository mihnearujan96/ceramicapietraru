import { Reveal } from "@/components/animation/reveal";
import { Container } from "@/components/ui/container";
import { DecorativeLine } from "@/components/ui/decorative-line";
import { getDictionary } from "@/data/i18n/ro";

const copy = getDictionary();

export function Quote() {
  return (
    <section className="bg-brown py-24 md:py-32" aria-label="Citat">
      <Container>
        <Reveal className="mx-auto max-w-4xl text-center">
          <DecorativeLine
            variant="circle"
            color="#C9825D"
            className="mx-auto mb-10 text-terracotta"
          />
          <blockquote>
            <p className="heading-display text-balance text-[clamp(2rem,5vw,4.25rem)] text-warm-white">
              „{copy.quote.text}”
            </p>
          </blockquote>
        </Reveal>
      </Container>
    </section>
  );
}
