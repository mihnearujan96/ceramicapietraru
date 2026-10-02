"use client";

import { familyStoryImages as img } from "@/data/story";
import { getDictionary } from "@/data/i18n/ro";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";

const copy = getDictionary();

type Slide = {
  id: string;
  label: string;
  title: string;
  caption?: string;
  paragraphs: readonly string[];
  image: { src: string; alt: string; width: number; height: number };
  imageClassName?: string;
};

function buildSlides(): Slide[] {
  const [nicoleta, laurentiu] = copy.family.chapters;
  const { mischiu } = copy.family;

  return [
    {
      id: "pietraru",
      label: "Atelierul nostru",
      title: copy.family.pietraruTitle,
      caption: copy.family.pietraruCaption,
      paragraphs: [copy.family.pietraruIntro],
      image: { ...img.pietraruCostume, width: 768, height: 1024 },
      imageClassName: "object-top",
    },
    {
      id: "nicoleta",
      label: nicoleta.title,
      title: "Păstrătoarea meșteșugului",
      caption: nicoleta.caption,
      paragraphs: nicoleta.paragraphs,
      image: { ...img.nicoletaBowl, width: 819, height: 1024 },
    },
    {
      id: "laurentiu",
      label: laurentiu.title,
      title: "Alături, în atelier",
      caption: laurentiu.caption,
      paragraphs: laurentiu.paragraphs,
      image: { ...img.laurentiuWheel, width: 768, height: 1024 },
    },
    {
      id: "mischiu",
      label: "Generația întâi",
      title: mischiu.title,
      caption: mischiu.caption,
      paragraphs: [mischiu.intro],
      image: { ...img.mischiuCouple, width: 768, height: 1024 },
      imageClassName: "object-[center_30%]",
    },
    {
      id: "dumitru",
      label: "Dumitru Mischiu",
      title: "La roată, din copilărie",
      caption: mischiu.dumitru.caption,
      paragraphs: mischiu.dumitru.quotes,
      image: { ...img.dumitruWheel, width: 768, height: 1024 },
      imageClassName: "object-[center_35%]",
    },
    {
      id: "ioana",
      label: "Ioana Mischiu",
      title: "Ursită pentru meșteșug",
      caption: mischiu.ioana.caption,
      paragraphs: mischiu.ioana.quotes,
      image: { ...img.ioanaPlate, width: 1024, height: 768 },
      imageClassName: "object-right",
    },
  ];
}

const slides = buildSlides();

export function FamilyStorySwipe() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState(0);
  const [openId, setOpenId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const reduceMotion = useReducedMotion();
  const openSlide = slides.find((slide) => slide.id === openId) ?? null;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-slide]"));
    if (cards.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number(visible.target.getAttribute("data-index"));
        if (!Number.isNaN(index)) setActive(index);
      },
      {
        root,
        threshold: [0.45, 0.6, 0.75],
      },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!openSlide) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openSlide]);

  function scrollTo(index: number) {
    const root = scrollerRef.current;
    if (!root) return;
    const card = root.querySelector<HTMLElement>(`[data-index="${index}"]`);
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollTo(Math.min(active + 1, slides.length - 1));
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollTo(Math.max(active - 1, 0));
    }
  }

  return (
    <div className="lg:hidden">
      <div className="flex items-end justify-between gap-4 px-1">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-clay">
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </p>
        <p className="text-xs tracking-[0.08em] text-muted">
          {active === 0 ? "Glisează pentru poveste →" : slides[active]?.label}
        </p>
      </div>

      <div
        ref={scrollerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={copy.family.title}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="mt-5 -mx-[clamp(1rem,4vw,3.5rem)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(1rem,4vw,3.5rem)] pb-3 [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/40 [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, index) => (
          <article
            key={slide.id}
            data-slide
            data-index={index}
            aria-label={`${index + 1} din ${slides.length}: ${slide.label}`}
            className="flex w-[min(82vw,22rem)] shrink-0 snap-center sm:snap-start"
          >
            <button
              type="button"
              onClick={() => setOpenId(slide.id)}
              className="flex h-full w-full flex-col overflow-hidden rounded-[20px] bg-warm-white text-left shadow-[0_18px_40px_-28px_rgba(68,47,38,0.45)] ring-1 ring-brown/10"
            >
              <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden">
                <Image
                  src={slide.image.src}
                  alt=""
                  fill
                  sizes="82vw"
                  priority={index === 0}
                  className={cn("object-cover", slide.imageClassName)}
                />
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-charcoal/55 to-transparent"
                />
                <p className="absolute bottom-4 left-4 right-4 text-xs font-medium uppercase tracking-[0.18em] text-cream/90">
                  {slide.label}
                </p>
              </div>

              <div className="flex h-[13.5rem] flex-col overflow-hidden px-5 pb-4 pt-4">
                <span className="heading-display line-clamp-2 h-[3.15rem] shrink-0 text-[1.55rem]">
                  {slide.title}
                </span>
                <span className="mt-1.5 line-clamp-1 h-4 shrink-0 text-xs tracking-[0.12em] text-muted">
                  {slide.caption ?? "\u00a0"}
                </span>
                <span className="mt-2 line-clamp-3 h-[4.7rem] shrink-0 text-[0.92rem] leading-[1.55] text-muted">
                  {slide.paragraphs[0]}
                </span>
                <span className="mt-auto shrink-0 pt-2 text-xs font-medium uppercase tracking-[0.16em] text-clay">
                  Citește povestea
                </span>
              </div>
            </button>
          </article>
        ))}
        <div aria-hidden className="w-2 shrink-0" />
      </div>

      <div
        className="mt-5 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Capitole"
      >
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-label={`Mergi la ${slide.label}`}
            onClick={() => scrollTo(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              active === index
                ? "w-7 bg-clay"
                : "w-1.5 bg-brown/20 hover:bg-brown/35",
            )}
          />
        ))}
      </div>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {openSlide ? (
                <motion.div
                  className="fixed inset-0 z-[90] flex items-end justify-center bg-charcoal/45 p-3 backdrop-blur-sm sm:items-center"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpenId(null)}
                >
                  <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="story-popout-title"
                    className="flex max-h-[min(92svh,46rem)] w-full max-w-md flex-col overflow-hidden rounded-[24px] bg-warm-white shadow-[0_24px_80px_rgba(23,21,19,0.22)]"
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div className="relative shrink-0 bg-cream">
                      <div
                        className="relative mx-auto overflow-hidden"
                        style={{
                          aspectRatio: `${openSlide.image.width} / ${openSlide.image.height}`,
                          width: `min(100%, calc(42svh * ${openSlide.image.width} / ${openSlide.image.height}))`,
                          maxHeight: "42svh",
                        }}
                      >
                        <Image
                          src={openSlide.image.src}
                          alt={openSlide.image.alt}
                          fill
                          sizes="92vw"
                          className="object-contain"
                          priority
                        />
                      </div>
                      <button
                        ref={closeRef}
                        type="button"
                        onClick={() => setOpenId(null)}
                        className="absolute right-3 top-3 inline-flex size-11 items-center justify-center rounded-full bg-warm-white/95 text-charcoal shadow-sm"
                        aria-label="Închide povestea"
                      >
                        <X className="size-5" />
                      </button>
                    </div>

                    <div className="overflow-y-auto px-5 pb-6 pt-5">
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-clay">
                        {openSlide.label}
                      </p>
                      <h3
                        id="story-popout-title"
                        className="heading-display mt-2 text-[1.85rem] leading-tight"
                      >
                        {openSlide.title}
                      </h3>
                      {openSlide.caption ? (
                        <p className="mt-2 text-xs tracking-[0.12em] text-muted">
                          {openSlide.caption}
                        </p>
                      ) : null}
                      <div className="mt-4 space-y-4">
                        {openSlide.paragraphs.map((paragraph) => (
                          <p
                            key={paragraph.slice(0, 48)}
                            className="text-[0.95rem] leading-relaxed text-muted"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </div>
  );
}
