import { Reveal } from "@/components/animation/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DecorativeLine } from "@/components/ui/decorative-line";
import { getDictionary } from "@/data/i18n/ro";
import { CONTACT } from "@/lib/contact";
import Image from "next/image";
import type { ReactNode } from "react";

const copy = getDictionary();

const eyebrowClassName =
  "mb-4 text-xs font-medium uppercase tracking-[0.22em] text-clay";

export function Atelier() {
  return (
    <section
      id="atelier"
      className="scroll-mt-28 bg-cream py-20 md:scroll-mt-36 md:py-28"
      aria-labelledby="atelier-title"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className={`${eyebrowClassName} lg:hidden`}>
              {copy.atelier.eyebrow}
            </p>
            <div className="overflow-hidden rounded-[16px] border border-border bg-warm-white">
              <Image
                src="/images/atelier/atelier-fatada.webp"
                alt="Atelierul Ceramica Pietraru din Horezu — clădirea în formă de vas"
                width={972}
                height={1024}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className={`${eyebrowClassName} hidden lg:block`}>
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

            <div id="contact" className="mt-10 scroll-mt-28 md:scroll-mt-36">
              <Reveal className="grid gap-5 sm:grid-cols-2">
                <InfoBlock label={copy.atelier.address} value={CONTACT.address} />
                <InfoBlock label={copy.atelier.hours} value={CONTACT.hours} />
                {CONTACT.phones.map((phone) => (
                  <InfoBlock key={phone.tel} label={copy.atelier.phone}>
                    <a
                      href={`tel:${phone.tel}`}
                      className="mt-2 inline-block text-sm text-foreground underline-offset-4 transition-colors hover:text-clay hover:underline"
                    >
                      {phone.label}
                    </a>
                  </InfoBlock>
                ))}
                {CONTACT.email !== "TODO" ? (
                  <InfoBlock label="Email" value={CONTACT.email} />
                ) : null}
              </Reveal>
            </div>

            <Reveal className="mt-8 flex flex-wrap gap-3">
              <Button href={CONTACT.mapUrl} showArrow>
                {copy.atelier.map}
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

function InfoBlock({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: ReactNode;
}) {
  return (
    <div className="rounded-[12px] border border-border bg-warm-white/60 px-4 py-4">
      <p className="text-xs uppercase tracking-[0.18em] text-clay">{label}</p>
      {children ?? <p className="mt-2 text-sm text-foreground">{value}</p>}
    </div>
  );
}
