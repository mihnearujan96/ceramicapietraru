"use client";

import { Reveal } from "@/components/animation/reveal";
import { CollectionsSwipe } from "@/components/home/collections-swipe";
import { Container } from "@/components/ui/container";
import { getDictionary } from "@/data/i18n/ro";
import { motion, useReducedMotion } from "motion/react";

const copy = getDictionary();

function ValueRow({
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
      className="group relative border-t border-border py-10 first:border-t-0 first:pt-0 md:py-12"
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.06,
      }}
    >
      <div className="flex items-baseline gap-4 md:gap-6">
        <motion.p
          className="heading-display shrink-0 text-[clamp(2.75rem,7vw,4.5rem)] leading-none text-clay/35 transition-colors duration-500 group-hover:text-clay/55"
          aria-hidden
          initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.05 + index * 0.06,
          }}
        >
          {number}
        </motion.p>

        <div className="min-w-0 flex-1">
          <motion.h4
            className="heading-display text-[clamp(1.85rem,4vw,2.75rem)] leading-tight"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.12 + index * 0.06,
            }}
          >
            <span className="sr-only">{number}. </span>
            {value.title}
          </motion.h4>
          <motion.span
            aria-hidden
            className="mt-3 block h-px w-14 origin-left bg-clay/55 md:mt-4 md:w-20"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.18 + index * 0.06,
            }}
          />
          <motion.p
            className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.24 + index * 0.06,
            }}
          >
            {value.body}
          </motion.p>
        </div>
      </div>
    </motion.article>
  );
}

export function HandmadeValues() {
  return (
    <section
      id="colectii"
      className="bg-warm-white py-20 md:pb-28 md:pt-28"
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

        <div className="mt-16 border-t border-border pt-4 md:mt-20 md:pt-6">
          {copy.handmade.values.map((value, index) => (
            <ValueRow key={value.title} value={value} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
