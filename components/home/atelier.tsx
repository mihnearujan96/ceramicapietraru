import { Reveal } from "@/components/animation/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DecorativeLine } from "@/components/ui/decorative-line";
import { getDictionary } from "@/data/i18n/ro";
import { CONTACT } from "@/lib/contact";
import Image from "next/image";

const copy = getDictionary();

export function Atelier() {
  return (
    <section
      id="contact"
      className="bg-cream py-20 md:py-28"
      aria-labelledby="atelier-title"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[5/4] overflow-hidden rounded-[16px]">
              <Image
                src="/images/workshop/pot-building.jpg"
                alt="Atelierul Ceramica Pietraru — clădirea în formă de vas din Horezu"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-clay">
                {copy.atelier.eyebrow}
              </p>
              <h2
                id="atelier-title"
                className="heading-display text-[clamp(2.25rem,5vw,4rem)]"
              >
                {copy.atelier.title}
              </h2>
              <DecorativeLine
                variant="wave"
                color="#B96F4B"
                className="mt-6 max-w-xs"
              />
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg">
                {copy.atelier.body}
              </p>
            </Reveal>

            <Reveal className="mt-10 grid gap-5 sm:grid-cols-2">
              <InfoBlock label={copy.atelier.address} value={CONTACT.address} />
              <InfoBlock label={copy.atelier.hours} value={CONTACT.hours} />
              <InfoBlock label={copy.atelier.phone} value={CONTACT.phone} />
              <InfoBlock label="Email" value={CONTACT.email} />
            </Reveal>

            <Reveal className="mt-8 flex flex-wrap gap-3">
              <Button href="/atelier" showArrow>
                {copy.nav.atelier}
              </Button>
              {CONTACT.mapUrl !== "TODO" ? (
                <Button href={CONTACT.mapUrl} variant="secondary">
                  {copy.atelier.map}
                </Button>
              ) : (
                <p className="self-center text-xs text-muted">
                  {copy.atelier.placeholdersNote}
                </p>
              )}
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[12px] border border-border bg-warm-white/60 px-4 py-4">
      <p className="text-xs uppercase tracking-[0.18em] text-clay">{label}</p>
      <p className="mt-2 text-sm text-foreground">{value}</p>
    </div>
  );
}
