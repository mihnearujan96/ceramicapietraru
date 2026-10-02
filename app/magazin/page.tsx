import { Reveal } from "@/components/animation/reveal";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DecorativeLine } from "@/components/ui/decorative-line";
import { getDictionary } from "@/data/i18n/ro";
import { CONTACT } from "@/lib/contact";
import { createPageMetadata } from "@/lib/metadata";
import Image from "next/image";

const copy = getDictionary();

export const metadata = createPageMetadata({
  title: "Magazin",
  description:
    "Magazinul online Ceramica Pietraru este în construcție. Până atunci, ne găsiți la atelierul din Horezu, județul Vâlcea.",
  path: "/magazin",
  image: "/images/atelier/atelier-fatada.webp",
});

export default function ShopPage() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-cream grain">
      <Container className="relative z-10 grid min-h-[100svh] items-center gap-10 pb-16 pt-32 md:gap-14 md:pb-20 md:pt-36 lg:grid-cols-2 lg:gap-16">
        <Reveal className="max-w-xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-clay">
            {copy.shop.eyebrow}
          </p>
          <h1 className="heading-display text-[clamp(2.5rem,6.5vw,4.75rem)] text-foreground">
            {copy.shop.title}
          </h1>
          <DecorativeLine
            variant="wave"
            color="#B96F4B"
            className="mt-5 max-w-xs"
          />
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted md:text-lg">
            {copy.shop.supporting}
          </p>

          <dl className="mt-8 grid gap-5 border-t border-border pt-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className="text-xs uppercase tracking-[0.18em] text-clay">
                {copy.shop.addressLabel}
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-foreground md:text-base">
                {CONTACT.address}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-clay">
                {copy.shop.hoursLabel}
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-foreground md:text-base">
                {CONTACT.hours}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-clay">
                {copy.shop.phoneLabel}
              </dt>
              <dd className="mt-1.5 flex flex-col gap-0.5 text-sm md:text-base">
                {CONTACT.phones.map((phone) => (
                  <a
                    key={phone.tel}
                    href={`tel:${phone.tel}`}
                    className="text-foreground underline-offset-4 transition-colors hover:text-clay hover:underline"
                  >
                    {phone.label}
                  </a>
                ))}
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={CONTACT.mapUrl} showArrow>
              {copy.shop.map}
            </Button>
            <Button href="/" variant="secondary">
              {copy.shop.backHome}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="overflow-hidden rounded-[16px] border border-border bg-warm-white">
            <Image
              src="/images/atelier/atelier-fatada.webp"
              alt="Atelierul Ceramica Pietraru din Horezu — clădirea în formă de vas"
              width={972}
              height={1024}
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="h-auto w-full"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
