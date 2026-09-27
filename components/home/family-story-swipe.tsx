"use client";

import { familyStoryImages as img } from "@/data/story";
import { getDictionary } from "@/data/i18n/ro";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

const copy = getDictionary();

type Slide = {
  id: string;
  label: string;
  title: string;
  caption?: string;
  body: string;
  image: { src: string; alt: string };
  imageClassName?: string;
};

function buildSlides(): Slide[] {
  const [nicoleta, laurentiu] = copy.family.chapters;
  const { mischiu } = copy.family;

  return [
    {
      id: "mischiu",
      label: "Generația întâi",
      title: mischiu.title,
      caption: "Dumitru & Ioana Mischiu",
      body: mischiu.intro,
      image: img.mischiuCouple,
      imageClassName: "object-top",
    },
    {
      id: "dumitru",
      label: "Dumitru Mischiu",
      title: "La roată, din copilărie",
      caption: mischiu.dumitru.caption,
      body: mischiu.dumitru.quotes[0],
      image: img.dumitruWheel,
    },
    {
      id: "ioana",
      label: "Ioana Mischiu",
      title: "Ursită pentru meșteșug",
      caption: mischiu.ioana.caption,
      body: mischiu.ioana.quotes[0],
      image: img.ioanaPlate,
      imageClassName: "object-[center_20%]",
    },
    {
      id: "pietraru",
      label: "Generația următoare",
      title: copy.family.pietraruTitle,
      caption: copy.family.pietraruCaption,
      body: copy.family.pietraruIntro,
      image: img.pietraruCostume,
      imageClassName: "object-top",
    },
    {
      id: "nicoleta",
      label: nicoleta.title,
      title: "Păstrătoarea meșteșugului",
      caption: nicoleta.caption,
      body: nicoleta.paragraphs[0],
      image: img.nicoletaBowl,
    },
    {
      id: "laurentiu",
      label: laurentiu.title,
      title: "Alături, în atelier",
      caption: laurentiu.caption,
      body: laurentiu.paragraphs[0],
      image: img.laurentiuWheel,
    },
  ];
}

const slides = buildSlides();

export function FamilyStorySwipe() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

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
    <div className="md:hidden">
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
        className="mt-5 -mx-[clamp(1rem,4vw,3.5rem)] flex items-stretch snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(1rem,4vw,3.5rem)] pb-3 [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/40 [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, index) => {
          const isOpen = expanded[slide.id];
          const needsClamp = slide.body.length > 220;

          return (
            <article
              key={slide.id}
              data-slide
              data-index={index}
              aria-label={`${index + 1} din ${slides.length}: ${slide.label}`}
              className="flex w-[min(82vw,22rem)] shrink-0 snap-center self-stretch sm:snap-start"
            >
              <div className="flex h-full w-full flex-col overflow-hidden rounded-[20px] bg-warm-white shadow-[0_18px_40px_-28px_rgba(68,47,38,0.45)] ring-1 ring-brown/10">
                <div className="relative aspect-[4/5] shrink-0 overflow-hidden">
                  <Image
                    src={slide.image.src}
                    alt={slide.image.alt}
                    fill
                    sizes="86vw"
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

                <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
                  <h3 className="heading-display min-h-[3.3rem] text-[1.65rem] leading-tight">
                    {slide.title}
                  </h3>
                  <p className="mt-2 min-h-[1.125rem] text-xs tracking-[0.12em] text-muted">
                    {slide.caption ?? "\u00a0"}
                  </p>
                  <p
                    className={cn(
                      "mt-4 flex-1 text-[0.95rem] leading-relaxed text-muted",
                      !isOpen && "line-clamp-5",
                    )}
                  >
                    {slide.body}
                  </p>
                  <div className="mt-3 min-h-[1.25rem]">
                    {needsClamp ? (
                      <button
                        type="button"
                        onClick={() =>
                          setExpanded((prev) => ({
                            ...prev,
                            [slide.id]: !prev[slide.id],
                          }))
                        }
                        className="text-xs font-medium uppercase tracking-[0.16em] text-clay"
                      >
                        {isOpen ? "Mai puțin" : "Citește tot"}
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
        {/* Trailing space so the last card can snap with breathing room */}
        <div aria-hidden className="w-2 shrink-0" />
      </div>

      <div className="mt-5 flex items-center justify-center gap-2" role="tablist" aria-label="Capitole">
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
    </div>
  );
}
