"use client";

import { StaggerText } from "@/components/animation/stagger-text";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getDictionary } from "@/data/i18n/ro";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const copy = getDictionary();

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() === true;
  const [entered, setEntered] = useState(reduceMotion);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 40],
  );
  const leavesY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 16],
  );

  useEffect(() => {
    if (reduceMotion) {
      setEntered(true);
      return;
    }
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [reduceMotion]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-cream grain">
      {/* ── Mobile ── */}
      <div className="relative flex min-h-[100svh] flex-col lg:hidden">
        {/* Copy band — clear of the pot */}
        <Container className="relative z-20 shrink-0 pt-[6.25rem] pb-1">
          <motion.p
            className="mb-2 text-center text-[0.68rem] font-medium uppercase tracking-[0.22em] text-clay"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, delay: 0.06 }}
          >
            {copy.hero.eyebrow}
          </motion.p>

          <StaggerText
            text={`${copy.hero.line1}\n${copy.hero.line2}\n${copy.hero.line3}`}
            className="heading-display text-center text-[clamp(2.35rem,10vw,3.25rem)] text-foreground"
            delay={0.14}
            stagger={0.1}
          />

          <motion.div
            className="mx-auto mt-2 w-[min(100%,10.5rem)] text-clay/50"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.65, delay: 0.42 }}
            aria-hidden
          >
            <DecorativeLineDraw reduceMotion={reduceMotion} />
          </motion.div>

          <motion.p
            className="mx-auto mt-2.5 max-w-[17.5rem] text-center text-[0.88rem] leading-relaxed text-muted"
            initial={false}
            animate={
              entered
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 8, filter: "blur(8px)" }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.85,
              delay: reduceMotion ? 0 : 0.48,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {copy.hero.supporting}
          </motion.p>
        </Container>

        {/* Pot fills to the bottom edge; CTAs sit on it */}
        <div className="relative z-10 mt-1 min-h-0 flex-1 overflow-hidden">
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{ y: leavesY }}
            aria-hidden
          >
            <Image
              src="/images/hero/leaves-left.png"
              alt=""
              width={640}
              height={1920}
              priority
              unoptimized
              className="absolute -left-[26%] bottom-0 h-[120%] w-auto max-w-none object-contain object-left-bottom opacity-50"
            />
            <Image
              src="/images/hero/leaves-right.png"
              alt=""
              width={640}
              height={1920}
              priority
              unoptimized
              className="absolute -right-[24%] bottom-0 h-[118%] w-auto max-w-none object-contain object-right-bottom opacity-45"
            />
          </motion.div>

          <motion.div className="absolute inset-0" style={{ y: imageY }}>
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-12 bg-gradient-to-b from-cream to-transparent"
              aria-hidden
            />
            <Image
              src="/images/hero/pot-building.png"
              alt="Atelierul Ceramica Pietraru — clădirea în formă de vas din Horezu"
              width={1146}
              height={750}
              priority
              unoptimized
              sizes="100vw"
              className="absolute bottom-0 left-1/2 h-full min-h-full w-auto min-w-[115%] max-w-none -translate-x-1/2 object-cover object-bottom drop-shadow-[0_16px_32px_rgba(61,40,23,0.14)]"
            />
          </motion.div>

          <div className="absolute inset-x-0 bottom-0 z-20">
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#2a1c14]/45 via-[#2a1c14]/12 to-transparent"
              aria-hidden
            />
            <Container className="relative pb-[max(1.35rem,env(safe-area-inset-bottom))] pt-8">
              <motion.div
                className="mx-auto grid w-full max-w-sm grid-cols-2 gap-2"
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.6, delay: 0.65 }}
              >
                <Button
                  href="/colectii"
                  size="md"
                  showArrow
                  className="w-full rounded-full px-3 text-sm shadow-[0_8px_24px_rgba(42,28,20,0.3)]"
                >
                  {copy.hero.ctaPrimary}
                </Button>
                <Button
                  href="/poveste"
                  variant="cream"
                  size="md"
                  className="w-full rounded-full px-3 text-sm shadow-[0_8px_24px_rgba(42,28,20,0.22)]"
                >
                  {copy.hero.ctaSecondary}
                </Button>
              </motion.div>
            </Container>
          </div>
        </div>
      </div>

      {/* ── Desktop ── */}
      <Container className="relative z-10 hidden min-h-[100svh] lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.05fr)] lg:items-center lg:gap-3 lg:pb-16 lg:pt-36 xl:gap-4">
        <div className="relative z-20 min-w-0 shrink-0">
          <motion.p
            className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-clay"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, delay: 0.15 }}
          >
            {copy.hero.eyebrow}
          </motion.p>

          <StaggerText
            text={`${copy.hero.line1}\n${copy.hero.line2}\n${copy.hero.line3}`}
            className="heading-display text-[clamp(2.5rem,5.8vw,5.75rem)] text-foreground"
            delay={0.2}
            stagger={0.1}
          />

          <motion.div
            className="pointer-events-none absolute -left-4 top-[40%] -z-10 w-[min(100%,420px)] text-clay/35 md:-left-8"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 1.2, delay: 0.5 }}
            aria-hidden
          >
            <DecorativeLineDraw reduceMotion={reduceMotion} />
          </motion.div>

          <motion.p
            className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, delay: 0.55 }}
          >
            {copy.hero.supporting}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, delay: 0.7 }}
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
          className="relative z-10 w-[116%] justify-self-end lg:-mr-[4%] lg:-ml-[4%] xl:w-[122%] xl:-mr-[6%] xl:-ml-[5%]"
          style={{ y: imageY }}
        >
          <Image
            src="/images/hero/pot-building.png"
            alt="Atelierul Ceramica Pietraru — clădirea în formă de vas din Horezu"
            width={856}
            height={683}
            priority
            unoptimized
            sizes="52vw"
            className="h-auto w-full object-contain object-bottom drop-shadow-[0_20px_36px_rgba(61,40,23,0.14)]"
          />
        </motion.div>
      </Container>
    </section>
  );
}

function DecorativeLineDraw({
  reduceMotion = false,
}: {
  reduceMotion?: boolean;
}) {
  return (
    <svg viewBox="0 0 420 80" fill="none" className="h-auto w-full">
      <motion.path
        d="M8 42c36-18 70-18 104 0s70 18 104 0 70-18 104 0 64 16 92 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 1.4,
          ease: "easeInOut",
          delay: reduceMotion ? 0 : 0.35,
        }}
      />
      <motion.circle
        cx="112"
        cy="34"
        r="3"
        fill="currentColor"
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ delay: reduceMotion ? 0 : 1 }}
      />
      <motion.circle
        cx="216"
        cy="50"
        r="3"
        fill="currentColor"
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ delay: reduceMotion ? 0 : 1.15 }}
      />
      <motion.circle
        cx="320"
        cy="34"
        r="3"
        fill="currentColor"
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ delay: reduceMotion ? 0 : 1.3 }}
      />
    </svg>
  );
}
