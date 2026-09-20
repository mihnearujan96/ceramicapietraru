import { Reveal } from "@/components/animation/reveal";
import { ParallaxImage } from "@/components/animation/parallax-image";
import { Container } from "@/components/ui/container";
import { DecorativeLine } from "@/components/ui/decorative-line";
import { getDictionary } from "@/data/i18n/ro";

const copy = getDictionary();

export function FamilyStory() {
  return (
    <section
      id="generatii"
      className="bg-cream py-20 md:py-28"
      aria-labelledby="family-title"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[16px] bg-brown/10">
              <ParallaxImage
                src="/images/family/archive-01.svg"
                alt="Loc rezervat pentru o fotografie de familie din arhivă"
                className="absolute inset-0 h-full w-full"
                intensity={18}
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
            <p className="mt-3 text-xs text-muted">
              {/* TODO: Replace with real archival family photograph */}
              Loc rezervat — fotografie de familie
            </p>
          </Reveal>

          <div>
            <Reveal>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-clay">
                {copy.family.eyebrow}
              </p>
              <h2
                id="family-title"
                className="heading-display text-[clamp(2.25rem,5vw,4.25rem)]"
              >
                {copy.family.title}
              </h2>
              <DecorativeLine
                variant="zigzag"
                color="#B96F4B"
                className="mt-6 max-w-xs"
              />
            </Reveal>

            <div className="mt-8 space-y-5">
              {copy.family.body.map((paragraph) => (
                <Reveal key={paragraph}>
                  <p className="max-w-xl text-base leading-relaxed text-muted md:text-lg">
                    {paragraph}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* TODO: Add names / milestones when confirmed — do not invent years */}
            <Reveal className="mt-12">
              <ol className="flex flex-col gap-0 border-l border-clay/30 pl-6">
                {copy.family.generations.map((generation, index) => (
                  <li key={generation} className="relative pb-8 last:pb-0">
                    <span className="absolute -left-[1.9rem] top-1 size-3 rounded-full bg-clay" />
                    <p className="heading-display text-2xl md:text-3xl">
                      {generation}
                    </p>
                    {index < copy.family.generations.length - 1 ? (
                      <span className="mt-2 block text-clay/60" aria-hidden>
                        ↓
                      </span>
                    ) : (
                      <p className="mt-2 text-sm text-muted">
                        Continuă astăzi, în atelier.
                      </p>
                    )}
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
