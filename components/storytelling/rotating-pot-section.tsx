"use client";

import { BrandPot } from "@/components/pottery/brand-pot";
import { DecorativeLine } from "@/components/ui/decorative-line";
import { Container } from "@/components/ui/container";
import { StoryChapter } from "@/components/storytelling/story-chapter";
import { getDictionary } from "@/data/i18n/ro";
import { cn } from "@/lib/utils";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

const copy = getDictionary();

export function RotatingPotSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const background = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ["#FBF8F2", "#F5EFE5", "#F1E6D8", "#EAD9C6"],
  );

  const decorY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -40],
  );

  return (
    <motion.section
      ref={sectionRef}
      id="poveste-vas"
      aria-labelledby="rotating-story-title"
      className="relative"
      style={{ backgroundColor: background }}
    >
      <div className="grain pointer-events-none absolute inset-0" aria-hidden />

      <Container className="relative py-16 md:py-24">
        <div className="mb-10 max-w-2xl md:mb-16">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-clay">
            {copy.rotatingStory.eyebrow}
          </p>
          <h2
            id="rotating-story-title"
            className="heading-display text-[clamp(2.25rem,5vw,4.25rem)]"
          >
            {copy.rotatingStory.title}
          </h2>
          <DecorativeLine
            variant="wave"
            color="#B96F4B"
            className="mt-6 max-w-xs text-clay"
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
          <div className="relative lg:sticky lg:top-28 lg:self-start">
            <motion.div
              style={{ y: decorY }}
              className="pointer-events-none absolute -left-6 top-8 hidden opacity-40 md:block"
              aria-hidden
            >
              <DecorativeLine variant="circle" color="#B96F4B" />
            </motion.div>

            <div
              className={cn(
                "mx-auto w-[min(100%,320px)] sm:w-[min(100%,380px)] lg:w-full",
              )}
            >
              <BrandPot
                className="aspect-[4/5] w-full"
                spinSpeed={0.55}
                cameraZ={3.35}
              />
            </div>

            <p className="mt-4 text-center text-xs tracking-wide text-muted lg:text-left">
              Vas modelat în cod — se rotește pe axa verticală, cu motive pictate.
            </p>
          </div>

          <div>
            {copy.rotatingStory.chapters.map((chapter, index) => (
              <StoryChapter
                key={chapter.id}
                index={index}
                title={chapter.title}
                body={chapter.body}
              />
            ))}
          </div>
        </div>
      </Container>
    </motion.section>
  );
}
