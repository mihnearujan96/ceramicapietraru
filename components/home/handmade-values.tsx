"use client";

import { Reveal } from "@/components/animation/reveal";
import { CollectionsSwipe } from "@/components/home/collections-swipe";
import { Container } from "@/components/ui/container";
import { getDictionary } from "@/data/i18n/ro";
import { motion, useReducedMotion } from "motion/react";

const copy = getDictionary();

function ValueItem({
  value,
  index,
}: {
  value: (typeof copy.handmade.values)[number];
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      className="group min-w-0 text-center"
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.06,
      }}
    >
      <div className="flex items-baseline justify-center gap-2.5">
        <p
          className="heading-display shrink-0 text-xl leading-none text-clay/40 transition-colors duration-300 group-hover:text-clay/60 sm:text-2xl"
          aria-hidden
        >
          {number}
        </p>
        <h4 className="heading-display text-lg leading-tight sm:text-xl">
          <span className="sr-only">{number}. </span>
          {value.title}
        </h4>
      </div>
      <span
        aria-hidden
        className="mx-auto mt-2.5 block h-px w-10 bg-clay/45 transition-all duration-300 group-hover:w-14"
      />
      <p className="mx-auto mt-2.5 max-w-[18rem] text-sm leading-relaxed text-muted">
        {value.body}
      </p>
    </motion.article>
  );
}

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

        <div className="mt-12 grid gap-8 border-t border-border pt-10 sm:grid-cols-3 sm:gap-6 md:mt-16 md:gap-10 md:pt-12">
          {copy.handmade.values.map((value, index) => (
            <ValueItem key={value.title} value={value} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
