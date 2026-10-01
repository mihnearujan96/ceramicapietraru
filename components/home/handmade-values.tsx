import { Reveal } from "@/components/animation/reveal";
import { CollectionsSwipe } from "@/components/home/collections-swipe";
import { Container } from "@/components/ui/container";
import { getDictionary } from "@/data/i18n/ro";

const copy = getDictionary();

export function HandmadeValues() {
  return (
    <section
      id="colectii"
      className="scroll-mt-28 bg-warm-white py-20 md:scroll-mt-36 md:pb-28 md:pt-28"
      aria-labelledby="handmade-title"
    >
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <h2
              id="collections-heading"
              className="heading-display text-[clamp(2.5rem,6vw,5rem)]"
            >
              {copy.collections.eyebrow}
            </h2>
            <h3
              id="handmade-title"
              className="heading-display mt-5 whitespace-pre-line text-[clamp(1.75rem,4vw,3rem)] text-brown"
            >
              {copy.handmade.title}
            </h3>
          </Reveal>
        </div>

        <Reveal delay={0.08} className="mt-12 md:mt-16">
          <CollectionsSwipe />
        </Reveal>
      </Container>
    </section>
  );
}
