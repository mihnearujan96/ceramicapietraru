import { Reveal } from "@/components/animation/reveal";
import { ParallaxImage } from "@/components/animation/parallax-image";
import { FamilyStorySwipe } from "@/components/home/family-story-swipe";
import { Container } from "@/components/ui/container";
import { DecorativeLine } from "@/components/ui/decorative-line";
import { getDictionary } from "@/data/i18n/ro";
import { familyStoryImages as img } from "@/data/story";
import { cn } from "@/lib/utils";
import Image from "next/image";

const copy = getDictionary();

type StoryImageProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  contain?: boolean;
  parallax?: boolean;
};

function StoryImage({
  src,
  alt,
  className,
  imageClassName,
  sizes = "(max-width: 1024px) 100vw, 48vw",
  priority = false,
  contain = false,
  parallax = false,
}: StoryImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[16px] bg-brown/[0.06]",
        contain && "bg-cream",
        className,
      )}
    >
      {parallax ? (
        <ParallaxImage
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full"
          imageClassName={cn(
            contain ? "object-contain p-5 md:p-8" : "object-cover",
            imageClassName,
          )}
          intensity={16}
          sizes={sizes}
          priority={priority}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn(
            contain ? "object-contain p-5 md:p-8" : "object-cover",
            imageClassName,
          )}
        />
      )}
    </div>
  );
}

export function FamilyStory() {
  const [nicoleta, laurentiu] = copy.family.chapters;
  const { mischiu } = copy.family;

  return (
    <section
      id="povestea"
      className="scroll-mt-28 bg-cream py-20 md:scroll-mt-36 md:py-28"
      aria-labelledby="family-title"
    >
      <Container>
        {/* Opening */}
        <Reveal className="max-w-3xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-clay">
            {copy.family.eyebrow}
          </p>
          <h2
            id="family-title"
            className="heading-display text-[clamp(2.5rem,6vw,4.75rem)]"
          >
            {copy.family.title}
          </h2>
          <DecorativeLine
            variant="zigzag"
            color="#B96F4B"
            className="mt-6 max-w-xs"
          />
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {copy.family.lead}
          </p>
        </Reveal>

        {/* Mobile: horizontal swipe story */}
        <div className="mt-12 md:hidden">
          <FamilyStorySwipe />
        </div>

        {/* Desktop / tablet: editorial layout */}
        <div className="mt-16 hidden md:block md:mt-20">
          {/* Familia Mischiu */}
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-12 xl:gap-14">
            <div className="mx-auto w-full max-w-[320px] lg:sticky lg:top-28 lg:mx-0 lg:max-w-[360px]">
              <Reveal>
                <StoryImage
                  {...img.mischiuCouple}
                  className="aspect-[4/5] w-full"
                  priority
                  sizes="(max-width: 1024px) 100vw, 360px"
                  imageClassName="object-top"
                />
                <p className="mt-3 text-xs tracking-[0.14em] text-muted">
                  Dumitru &amp; Ioana Mischiu
                </p>
              </Reveal>
            </div>

            <div className="lg:pt-4">
              <Reveal>
                <h3 className="heading-display text-[clamp(1.75rem,3.5vw,2.75rem)]">
                  {mischiu.title}
                </h3>
                <DecorativeLine
                  variant="dots"
                  color="#B96F4B"
                  className="mt-4 max-w-[9rem]"
                />
                <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
                  {mischiu.intro}
                </p>
              </Reveal>

              <blockquote className="mt-8 space-y-5 border-l border-clay/30 pl-5 md:mt-10 md:pl-6">
                {mischiu.dumitru.quotes.slice(0, 1).map((quote) => (
                  <Reveal key={quote.slice(0, 40)}>
                    <p className="text-base leading-relaxed text-muted md:text-lg">
                      {quote}
                    </p>
                  </Reveal>
                ))}
              </blockquote>

              <Reveal className="mt-8 md:mt-10">
                <div className="grid grid-cols-[1fr_auto] items-end gap-4 sm:gap-5">
                  <div>
                    <StoryImage
                      {...img.dumitruWheel}
                      className="aspect-[4/3] max-w-md"
                      sizes="(max-width: 1024px) 70vw, 28vw"
                    />
                    <p className="mt-3 text-sm text-muted">
                      {mischiu.dumitru.caption}
                    </p>
                  </div>
                </div>
              </Reveal>

              <blockquote className="mt-8 space-y-5 border-l border-clay/30 pl-5 md:pl-6">
                {mischiu.dumitru.quotes.slice(1).map((quote) => (
                  <Reveal key={quote.slice(0, 40)}>
                    <p className="text-base leading-relaxed text-muted md:text-lg">
                      {quote}
                    </p>
                  </Reveal>
                ))}
              </blockquote>

              {/* Ioana — same column as Dumitru */}
              <div className="mt-12 md:mt-14">
                <Reveal>
                  <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-clay">
                    Ioana Mischiu
                  </p>
                </Reveal>

                <div className="relative">
                  <div className="mb-4 w-full max-w-[200px] sm:float-left sm:mb-3 sm:mr-6 sm:max-w-[220px] md:mr-8 md:max-w-[240px]">
                    <StoryImage
                      {...img.ioanaPlate}
                      className="aspect-[4/5]"
                      sizes="240px"
                    />
                    <p className="mt-3 text-sm text-muted">
                      {mischiu.ioana.caption}
                    </p>
                  </div>

                  <blockquote className="space-y-4">
                    {mischiu.ioana.quotes.map((quote) => (
                      <p
                        key={quote.slice(0, 40)}
                        className="text-base leading-relaxed text-muted md:text-lg"
                      >
                        {quote}
                      </p>
                    ))}
                  </blockquote>

                  <div className="clear-both" />
                </div>
              </div>
            </div>
          </div>

          {/* Familia Pietraru */}
          <div className="mt-20 md:mt-28">
            <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-12 xl:gap-14">
              <div className="mx-auto w-full max-w-[320px] lg:sticky lg:top-28 lg:mx-0 lg:max-w-[360px]">
                <Reveal>
                  <StoryImage
                    {...img.pietraruCostume}
                    className="aspect-[4/5] w-full"
                    sizes="(max-width: 1024px) 100vw, 360px"
                    imageClassName="object-top"
                  />
                  <p className="mt-3 text-xs tracking-[0.14em] text-muted">
                    {copy.family.pietraruCaption}
                  </p>
                </Reveal>
              </div>

              <div className="lg:pt-4">
                <Reveal>
                  <h3 className="heading-display text-[clamp(1.75rem,3.5vw,2.75rem)]">
                    {copy.family.pietraruTitle}
                  </h3>
                  <DecorativeLine
                    variant="dots"
                    color="#B96F4B"
                    className="mt-4 max-w-[9rem]"
                  />
                  <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
                    {copy.family.pietraruIntro}
                  </p>
                </Reveal>

                {/* Nicoleta */}
                <div className="mt-10 md:mt-12">
                  <Reveal>
                    <h4 className="heading-display text-[clamp(1.5rem,3vw,2.15rem)]">
                      {nicoleta.title}
                    </h4>
                    <DecorativeLine
                      variant="dots"
                      color="#B96F4B"
                      className="mt-3 max-w-[7rem]"
                    />
                  </Reveal>

                  <div className="mt-6">
                    <div className="mb-4 w-full max-w-[220px] sm:float-right sm:mb-3 sm:ml-6 sm:max-w-[240px] md:ml-8">
                      <StoryImage
                        {...img.nicoletaBowl}
                        className="aspect-[4/5]"
                        sizes="240px"
                      />
                      <p className="mt-3 text-sm text-muted">
                        {nicoleta.caption}
                      </p>
                    </div>

                    <blockquote className="space-y-4">
                      {nicoleta.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 48)}
                          className="text-base leading-relaxed text-muted md:text-lg"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </blockquote>

                    <div className="clear-both" />
                  </div>
                </div>

                {/* Laurentiu */}
                <div className="mt-12 md:mt-14">
                  <Reveal>
                    <h4 className="heading-display text-[clamp(1.5rem,3vw,2.15rem)]">
                      {laurentiu.title}
                    </h4>
                    <DecorativeLine
                      variant="dots"
                      color="#B96F4B"
                      className="mt-3 max-w-[7rem]"
                    />
                  </Reveal>

                  <div className="mt-6">
                    <div className="mb-4 w-full max-w-[220px] sm:float-left sm:mb-3 sm:mr-6 sm:max-w-[240px] md:mr-8">
                      <StoryImage
                        {...img.laurentiuWheel}
                        className="aspect-[3/4]"
                        sizes="240px"
                      />
                      <p className="mt-3 text-sm text-muted">
                        {laurentiu.caption}
                      </p>
                    </div>

                    <blockquote className="space-y-4">
                      {laurentiu.paragraphs.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 48)}
                          className="text-base leading-relaxed text-muted md:text-lg"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </blockquote>

                    <div className="clear-both" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
