"use client";

import { Reveal } from "@/components/animation/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { processImages } from "@/data/story";
import { getDictionary } from "@/data/i18n/ro";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

const copy = getDictionary();

export function Process() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="mestesug"
      className="bg-cream py-20 md:py-28"
      aria-labelledby="process-title"
    >
      <Container>
        <SectionHeading
          eyebrow={copy.process.eyebrow}
          title={copy.process.title}
          className="mb-14 md:mb-20"
        />

        <div className="space-y-20 md:space-y-28">
          {copy.process.stages.map((stage, index) => {
            const reversed = index % 2 === 1;
            return (
              <div
                key={stage.number}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
              >
                <Reveal
                  className={reversed ? "lg:order-2" : undefined}
                >
                  <motion.div
                    className="relative aspect-[5/4] overflow-hidden rounded-[16px] bg-brown/10"
                    initial={
                      reduceMotion
                        ? false
                        : { clipPath: "inset(12% 12% 12% 12% round 16px)" }
                    }
                    whileInView={{
                      clipPath: "inset(0% 0% 0% 0% round 16px)",
                    }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Image
                      src={processImages[index]}
                      alt={`Etapa ${stage.title}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 48vw"
                      className="object-cover"
                    />
                  </motion.div>
                </Reveal>

                <Reveal
                  className={reversed ? "lg:order-1" : undefined}
                  delay={0.08}
                >
                  <p
                    className="heading-display text-[clamp(4rem,10vw,7rem)] leading-none text-clay/25"
                    aria-hidden
                  >
                    {stage.number}
                  </p>
                  <h3 className="heading-display mt-2 text-[clamp(2rem,4vw,3.25rem)]">
                    {stage.title}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-muted md:text-lg">
                    {stage.body}
                  </p>
                </Reveal>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
