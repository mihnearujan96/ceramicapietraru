import { Atelier } from "@/components/home/atelier";
import { Reveal } from "@/components/animation/reveal";
import { Container } from "@/components/ui/container";
import { DecorativeLine } from "@/components/ui/decorative-line";
import { createPageMetadata } from "@/lib/metadata";
import Image from "next/image";

export const metadata = createPageMetadata({
  title: "Atelier",
  description:
    "Vizitează atelierul și magazinul Ceramica Pietraru din Horezu — un loc care spune povestea ceramicii înainte să intri pe ușă.",
  path: "/atelier",
  image: "/images/workshop/pot-building.jpg",
});

export default function AtelierPage() {
  return (
    <>
      <section className="bg-cream pb-12 pt-32 md:pb-16 md:pt-40">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-clay">
              Atelier · Horezu
            </p>
            <h1 className="heading-display text-[clamp(2.75rem,7vw,5.5rem)]">
              Ne găsești acasă, în Horezu.
            </h1>
            <DecorativeLine
              variant="zigzag"
              color="#B96F4B"
              className="mt-8 max-w-sm"
            />
          </Reveal>

          <Reveal className="mt-12">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[16px]">
              <Image
                src="/images/hero/building-exterior.jpg"
                alt="Fațada atelierului Ceramica Pietraru din Horezu"
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </Container>
      </section>
      <Atelier />
    </>
  );
}
