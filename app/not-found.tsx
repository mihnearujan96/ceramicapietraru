import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="bg-cream py-32 md:py-40">
      <Container className="flex max-w-2xl flex-col items-center text-center">
        <Logo height={72} className="mb-10" />
        <p className="text-xs uppercase tracking-[0.22em] text-clay">404</p>
        <h1 className="heading-display mt-4 text-[clamp(2.5rem,6vw,4.5rem)]">
          Pagina nu a fost găsită.
        </h1>
        <p className="mt-5 text-muted">
          Poate vasul s-a mutat pe altă poliță. Hai înapoi la colecție.
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <Button href="/" showArrow>
            Acasă
          </Button>
          <Button href="/colectii" variant="secondary">
            Colecții
          </Button>
        </div>
      </Container>
    </section>
  );
}
