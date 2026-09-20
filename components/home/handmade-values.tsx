import { Reveal } from "@/components/animation/reveal";
import { Container } from "@/components/ui/container";
import { getDictionary } from "@/data/i18n/ro";

const copy = getDictionary();

export function HandmadeValues() {
  return (
    <section
      className="bg-warm-white py-20 md:py-28"
      aria-labelledby="handmade-title"
    >
      <Container>
        <Reveal className="max-w-4xl">
          <h2
            id="handmade-title"
            className="heading-display whitespace-pre-line text-[clamp(2.5rem,6vw,5rem)]"
          >
            {copy.handmade.title}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 border-t border-border pt-12 md:grid-cols-3 md:gap-10">
          {copy.handmade.values.map((value, index) => (
            <Reveal key={value.title} delay={index * 0.08}>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-clay">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="heading-display mt-4 text-3xl md:text-4xl">
                {value.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {value.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
