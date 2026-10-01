"use client";

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

const plates = [
  {
    id: "brand",
    title: "Ceramica Pietraru",
    image: "/images/collections/plate-ceramica-pietraru.png?v=3",
    alt: "Farfurie Ceramica Pietraru cu cocosul de Horezu",
  },
  ...copy.collections.motifs.map((motif, index) => ({
    id: `motif-${index}`,
    title: motif.title,
    image: motif.image,
    alt: motif.alt,
  })),
];

export function CollectionsSwipe() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-plate]"));
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
    card?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollTo(Math.min(active + 1, plates.length - 1));
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollTo(Math.max(active - 1, 0));
    }
  }

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-clay">
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(plates.length).padStart(2, "0")}
        </p>
        <p className="max-w-[70%] truncate text-right text-xs tracking-[0.08em] text-muted">
          {active === 0 ? "Glisează farfuriile →" : plates[active]?.title}
        </p>
      </div>

      <div
        ref={scrollerRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={copy.collections.eyebrow}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="mt-5 -mx-[clamp(1rem,4vw,3.5rem)] flex snap-x snap-mandatory gap-6 overflow-x-auto px-[clamp(1rem,4vw,3.5rem)] pb-4 [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/40 [&::-webkit-scrollbar]:hidden md:gap-10"
      >
        {plates.map((plate, index) => (
          <figure
            key={plate.id}
            data-plate
            data-index={index}
            aria-label={`${index + 1} din ${plates.length}: ${plate.title}`}
            className="w-[min(72vw,20rem)] shrink-0 snap-center sm:w-[min(48vw,22rem)] md:w-[min(38vw,24rem)]"
          >
            <div className="group relative mx-auto aspect-square w-full">
              <div
                aria-hidden
                className="absolute left-1/2 top-[58%] h-[18%] w-[72%] -translate-x-1/2 rounded-[100%] bg-brown/20 blur-2xl transition-transform duration-500 group-hover:scale-110 group-hover:bg-brown/25"
              />
              <div
                aria-hidden
                className="absolute left-1/2 top-[62%] h-[10%] w-[55%] -translate-x-1/2 rounded-[100%] bg-charcoal/25 blur-md"
              />
              <Image
                src={plate.image}
                alt={plate.alt}
                fill
                sizes="(max-width: 640px) 72vw, (max-width: 1024px) 48vw, 384px"
                priority={index === 0}
                unoptimized
                className="relative z-10 object-contain drop-shadow-[0_18px_28px_rgba(45,38,34,0.28)] transition-transform duration-500 group-hover:-translate-y-1"
              />
            </div>
            <figcaption className="mt-5 text-center">
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
                {copy.collections.handmade}
              </p>
              <h3 className="mt-2 font-medium text-foreground">{plate.title}</h3>
            </figcaption>
          </figure>
        ))}
        <div aria-hidden className="w-2 shrink-0" />
      </div>

      <div
        className="mt-4 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Farfurii din colecție"
      >
        {plates.map((plate, index) => (
          <button
            key={plate.id}
            type="button"
            role="tab"
            aria-selected={active === index}
            aria-label={`Mergi la ${plate.title}`}
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
