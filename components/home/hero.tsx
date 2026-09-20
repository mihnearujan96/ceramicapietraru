"use client";

import { StaggerText } from "@/components/animation/stagger-text";
import { BrandPot } from "@/components/pottery/brand-pot";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getDictionary } from "@/data/i18n/ro";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const copy = getDictionary();

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 60],
  );

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-cream grain"
    >
      <Container className="relative z-10 grid min-h-[100svh] items-center gap-10 pb-16 pt-44 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-20 lg:pt-48">
        <div className="relative">
          <motion.p
            className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-clay"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {copy.hero.eyebrow}
          </motion.p>

          <StaggerText
            text={`${copy.hero.line1}\n${copy.hero.line2}\n${copy.hero.line3}`}
            className="heading-display text-[clamp(3rem,9vw,7.25rem)] text-foreground"
            delay={0.2}
            stagger={0.1}
          />

          <motion.div
            className="pointer-events-none absolute -left-4 top-[42%] -z-10 w-[min(100%,420px)] text-clay/35 md:-left-8"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            aria-hidden
          >
            <DecorativeLineDraw />
          </motion.div>

          <motion.p
            className="mt-7 max-w-md text-base leading-relaxed text-muted md:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            {copy.hero.supporting}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <Button href="/colectii" size="lg" showArrow>
              {copy.hero.ctaPrimary}
            </Button>
            <Button href="/poveste" variant="secondary" size="lg">
              {copy.hero.ctaSecondary}
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
          style={{ y: imageY }}
        >
          <BrandPot
            className="aspect-[4/5] w-full md:aspect-[5/6]"
            spinSpeed={0.38}
            cameraZ={3.1}
          />
        </motion.div>
      </Container>
    </section>
  );
}

function DecorativeLineDraw() {
  return (
    <svg viewBox="0 0 420 80" fill="none" className="h-auto w-full">
      <motion.path
        d="M8 42c36-18 70-18 104 0s70 18 104 0 70-18 104 0 64 16 92 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: "easeInOut", delay: 0.45 }}
      />
      <motion.circle
        cx="112"
        cy="34"
        r="3"
        fill="currentColor"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      />
      <motion.circle
        cx="216"
        cy="50"
        r="3"
        fill="currentColor"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.25 }}
      />
      <motion.circle
        cx="320"
        cy="34"
        r="3"
        fill="currentColor"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      />
    </svg>
  );
}
