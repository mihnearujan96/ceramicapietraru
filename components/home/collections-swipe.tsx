"use client";

import { getDictionary } from "@/data/i18n/ro";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";

const copy = getDictionary();

const plates = [
  {
    id: "brand",
    title: "Ceramica Pietraru",
    image: "/images/collections/plate-ceramica-pietraru.webp",
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
  const frameRef = useRef(0);
  const [active, setActive] = useState(0);

  function updateActive() {
    const root = scrollerRef.current;
    if (!root) return;

    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const cards = scroller.querySelectorAll<HTMLElement>("[data-plate]");
      if (cards.length === 0) return;

      const maxScroll = scroller.scrollWidth - scroller.clientWidth;
      let best = 0;

      if (scroller.scrollLeft <= 1) {
        best = 0;
      } else if (maxScroll - scroller.scrollLeft <= 8) {
        best = cards.length - 1;
      } else {
        const origin =
          scroller.getBoundingClientRect().left +
          (Number.parseFloat(getComputedStyle(scroller).paddingLeft) || 0);
        let bestDist = Infinity;
        cards.forEach((card, index) => {
          const dist = Math.abs(card.getBoundingClientRect().left - origin);
          if (dist < bestDist) {
            bestDist = dist;
            best = index;
          }
        });
      }

      setActive((current) => (current === best ? current : best));
    });
  }

  function scrollTo(index: number) {
    const root = scrollerRef.current;
    if (!root) return;
    const card = root.querySelector<HTMLElement>(`[data-index="${index}"]`);
    if (!card) return;
    const padLeft = Number.parseFloat(getComputedStyle(root).paddingLeft) || 0;
    const delta =
      card.getBoundingClientRect().left - root.getBoundingClientRect().left - padLeft;
    const max = Math.max(0, root.scrollWidth - root.clientWidth);
    const next = Math.min(Math.max(0, root.scrollLeft + delta), max);
    root.scrollTo({ left: next, behavior: "smooth" });
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
        onScroll={updateActive}
        className="mt-5 -mx-[clamp(1rem,4vw,3.5rem)] flex snap-x snap-mandatory scroll-pl-[clamp(1rem,4vw,3.5rem)] scroll-pe-[clamp(1rem,4vw,3.5rem)] gap-6 overflow-x-auto px-[clamp(1rem,4vw,3.5rem)] pb-4 [-ms-overflow-style:none] [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay/40 [&::-webkit-scrollbar]:hidden md:gap-10"
      >
        {plates.map((plate, index) => (
          <figure
            key={plate.id}
            data-plate
            data-index={index}
            aria-label={`${index + 1} din ${plates.length}: ${plate.title}`}
            className={cn(
              "w-[min(72vw,20rem)] shrink-0 snap-start sm:w-[min(48vw,22rem)] md:w-[min(38vw,24rem)]",
              index === plates.length - 1 && "snap-end",
            )}
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
