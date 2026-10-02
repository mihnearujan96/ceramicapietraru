"use client";

import { StaggerText } from "@/components/animation/stagger-text";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  horezuWaveDots,
  horezuWavePath,
  horezuWaveViewBox,
} from "@/components/ui/decorative-line";
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

  useEffect(() => {
    if (reduceMotion) {
      setEntered(true);
      return;
    }
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [reduceMotion]);

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    if (window.location.hash) {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }
  }

  return (
    <section ref={ref} className="relative overflow-hidden bg-cream grain">
      {/* ── Mobile ── */}
      <div className="relative flex min-h-[100svh] flex-col xl:hidden phone-landscape:grid phone-landscape:h-[100svh] phone-landscape:min-h-0 phone-landscape:grid-cols-2 phone-landscape:items-stretch">
        {/* Copy band — clear of the pot */}
        <Container className="relative z-20 flex shrink-0 flex-col pt-[6.25rem] pb-1 phone-landscape:h-full phone-landscape:justify-between phone-landscape:self-stretch phone-landscape:pt-16 phone-landscape:pb-5">
          <div>
          <h1>
            <motion.span
              className="mb-2 block text-center text-[0.68rem] font-medium uppercase tracking-[0.22em] text-clay phone-landscape:text-left"
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.5, delay: 0.06 }}
            >
              {copy.hero.eyebrow}
            </motion.span>

            <StaggerText
              as="span"
              text={`${copy.hero.line1}\n${copy.hero.line2}\n${copy.hero.line3}`}
              className="heading-display block text-center text-[clamp(2.35rem,10vw,3.25rem)] text-foreground phone-landscape:text-left phone-landscape:text-[clamp(1.65rem,5.5vh,2.35rem)]"
              delay={0.14}
              stagger={0.1}
            />
          </h1>

          <motion.div
            className="mx-auto mt-3.5 w-[min(100%,20rem)] text-clay phone-landscape:mx-0"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.65, delay: 0.42 }}
            aria-hidden
          >
            <DecorativeLineDraw reduceMotion={reduceMotion} />
          </motion.div>

          <motion.p
            className="mx-auto mt-2.5 max-w-[17.5rem] text-center text-[0.88rem] leading-relaxed text-muted phone-landscape:mx-0 phone-landscape:max-w-xs phone-landscape:text-left"
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
          </div>

          <motion.div
            className="mt-6 hidden w-full max-w-sm grid-cols-2 gap-2 phone-landscape:grid"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.6, delay: 0.65 }}
          >
            <Button
              size="md"
              showArrow
              onClick={() => scrollToSection("colectii")}
              className="w-full whitespace-nowrap rounded-full px-3 text-sm"
            >
              {copy.hero.ctaPrimary}
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={() => scrollToSection("povestea")}
              className="w-full whitespace-nowrap rounded-full px-3 text-sm"
            >
              {copy.hero.ctaSecondary}
            </Button>
          </motion.div>
        </Container>

        {/* Pot fills to the bottom edge; CTAs sit on it */}
        <div className="relative z-10 mt-1 min-h-0 flex-1 overflow-hidden phone-landscape:mt-0 phone-landscape:h-full">
          <motion.div className="absolute inset-0" style={{ y: imageY }}>
            <div
              className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-12 bg-gradient-to-b from-cream to-transparent"
              aria-hidden
            />
            <Image
              src="/images/hero/pot-building.webp"
              alt="Atelierul Ceramica Pietraru — clădirea în formă de vas din Horezu"
              width={1712}
              height={1366}
              priority
              quality={90}
              sizes="100vw"
              className="absolute bottom-0 drop-shadow-[0_16px_32px_rgba(61,40,23,0.14)] portrait:left-1/2 portrait:h-full portrait:min-h-full portrait:w-auto portrait:min-w-[115%] portrait:max-w-none portrait:-translate-x-1/2 portrait:object-cover portrait:object-bottom tall-landscape:left-0 tall-landscape:h-full tall-landscape:min-h-0 tall-landscape:w-full tall-landscape:min-w-0 tall-landscape:max-w-full tall-landscape:translate-x-0 tall-landscape:object-contain tall-landscape:object-bottom phone-landscape:bottom-3 phone-landscape:left-0 phone-landscape:h-auto phone-landscape:max-h-[calc(100%-0.75rem)] phone-landscape:min-h-0 phone-landscape:w-full phone-landscape:min-w-0 phone-landscape:max-w-full phone-landscape:translate-x-0 phone-landscape:object-contain"
            />
          </motion.div>

          <div className="absolute inset-x-0 bottom-0 z-20 phone-landscape:hidden">
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
                  size="md"
                  showArrow
                  onClick={() => scrollToSection("colectii")}
                  className="w-full whitespace-nowrap rounded-full px-3 text-sm shadow-[0_8px_24px_rgba(42,28,20,0.3)]"
                >
                  {copy.hero.ctaPrimary}
                </Button>
                <Button
                  variant="cream"
                  size="md"
                  onClick={() => scrollToSection("povestea")}
                  className="w-full whitespace-nowrap rounded-full px-3 text-sm shadow-[0_8px_24px_rgba(42,28,20,0.22)]"
                >
                  {copy.hero.ctaSecondary}
                </Button>
              </motion.div>
            </Container>
          </div>
        </div>
      </div>

      {/* ── Desktop ── */}
      <Container className="relative z-10 hidden min-h-[100svh] xl:grid xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1.05fr)] xl:items-center xl:gap-4 xl:pb-16 xl:pt-36">
        <div className="relative z-20 min-w-0 shrink-0">
          <h1>
            <motion.span
              className="mb-5 block text-xs font-medium uppercase tracking-[0.24em] text-clay"
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.7, delay: 0.15 }}
            >
              {copy.hero.eyebrow}
            </motion.span>

            <StaggerText
              as="span"
              text={`${copy.hero.line1}\n${copy.hero.line2}\n${copy.hero.line3}`}
              className="heading-display block text-[clamp(2.5rem,5.8vw,5.75rem)] text-foreground"
              delay={0.2}
              stagger={0.1}
            />
          </h1>

          <motion.div
            className="mt-5 w-full max-w-md text-clay"
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.8, delay: 0.45 }}
            aria-hidden
          >
            <DecorativeLineDraw reduceMotion={reduceMotion} />
          </motion.div>

          <motion.p
            className="mt-5 max-w-md text-base leading-relaxed text-muted md:text-lg"
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
            <Button size="lg" showArrow onClick={() => scrollToSection("colectii")}>
              {copy.hero.ctaPrimary}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollToSection("povestea")}
            >
              {copy.hero.ctaSecondary}
            </Button>
          </motion.div>
        </div>

        <motion.div
          className="relative z-10 w-[122%] justify-self-end xl:-mr-[6%] xl:-ml-[5%]"
          style={{ y: imageY }}
        >
          <Image
            src="/images/hero/pot-building.webp"
            alt="Atelierul Ceramica Pietraru — clădirea în formă de vas din Horezu"
            width={1712}
            height={1366}
            priority
            quality={90}
            sizes="(min-width: 1280px) 60vw, 100vw"
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
    <svg viewBox={horezuWaveViewBox} fill="none" className="h-auto w-full overflow-visible">
      <motion.path
        d={horezuWavePath}
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={{ pathLength: 1 }}
        transition={{
          duration: reduceMotion ? 0 : 1.5,
          ease: "easeInOut",
          delay: reduceMotion ? 0 : 0.35,
        }}
      />
      {horezuWaveDots.map((dot, index) => (
        <motion.circle
          key={`${dot.cx}-${dot.cy}`}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          fill="currentColor"
          initial={false}
          animate={{ opacity: 1 }}
          transition={{
            delay: reduceMotion ? 0 : 0.7 + index * 0.14,
            duration: reduceMotion ? 0 : 0.35,
          }}
        />
      ))}
    </svg>
  );
}
