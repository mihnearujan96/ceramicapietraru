import { Reveal } from "@/components/animation/reveal";
import { FamilyStory } from "@/components/home/family-story";
import { Quote } from "@/components/home/quote";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { DecorativeLine } from "@/components/ui/decorative-line";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Povestea noastră",
  description:
    "Cinci generații de ceramiști în Horezu. O poveste care a început înaintea noastră — din mâini, din pământ, din familie.",
  path: "/poveste",
});

export default function StoryPage() {
  return (
    <>
      <section className="bg-cream pb-16 pt-32 md:pb-20 md:pt-40">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.22em] text-clay">
              Povestea noastră
            </p>
            <h1 className="heading-display text-[clamp(2.75rem,7vw,5.5rem)]">
              Din pământ, prin mâini, spre casă.
            </h1>
            <DecorativeLine
              variant="wave"
              color="#B96F4B"
              className="mt-8 max-w-sm"
            />
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              Ideea și tradiția vin de la mama fondatorului. A început să
              modeleze lutul la numai 8 ani. Astăzi, familia reprezintă a cincea
              generație de artiști ceramisti din Horezu.
            </p>
            {/* TODO: Add verified family names, archival dates, and workshop milestones */}
            <div className="mt-10">
              <Button href="/colectii" showArrow>
                Descoperă colecția
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
      <FamilyStory />
      <Quote />
    </>
  );
}
