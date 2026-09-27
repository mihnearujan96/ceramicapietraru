import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { footerNavigation } from "@/data/navigation";
import { getDictionary } from "@/data/i18n/ro";
import Link from "next/link";

const copy = getDictionary();

const contactLinks = [
  { href: "/atelier", label: copy.footer.atelier },
  { href: "/#contact", label: copy.nav.contact },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-charcoal text-cream">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(65%,22rem)] bg-[radial-gradient(110%_70%_at_50%_-8%,color-mix(in_srgb,var(--brown)_88%,transparent)_0%,transparent_68%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-terracotta/30 to-transparent"
      />

      <Container className="relative py-10 md:py-12">
        {/* Motto + logo as one closing mark */}
        <div className="mx-auto max-w-2xl text-center">
          <Logo
            variant="light"
            height={72}
            className="mx-auto max-w-[180px] opacity-95 md:max-w-[200px]"
          />
          <blockquote className="mt-6">
            <p className="heading-display text-balance text-[clamp(1.35rem,3.8vw,2.15rem)] leading-snug text-warm-white">
              „{copy.quote.text}”
            </p>
          </blockquote>
          <p className="mt-5 max-w-sm mx-auto text-xs leading-relaxed tracking-[0.04em] text-cream/55">
            {copy.brand.tagline}
          </p>
        </div>

        {/* Two-column nav on mobile, four on desktop */}
        <nav
          aria-label="Footer"
          className="mt-8 grid grid-cols-2 gap-x-5 gap-y-6 border-t border-white/10 pt-7 md:mt-10 md:grid-cols-4 md:gap-6 md:pt-8"
        >
          <FooterColumn title={copy.footer.shop} links={footerNavigation.shop} />
          <FooterColumn
            title={copy.footer.story}
            links={footerNavigation.story}
          />
          <FooterColumn title={copy.footer.contact} links={contactLinks} />
          <div>
            <p className="mb-2.5 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-terracotta">
              {copy.brand.location}
            </p>
            <p className="text-sm leading-relaxed text-cream/60">
              {copy.brand.footerStatement}
            </p>
          </div>
        </nav>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4 text-[0.7rem] text-cream/35">
          <p>
            © {year} {copy.brand.name}
          </p>
          <p className="tracking-[0.08em]">Horezu · România</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="mb-2.5 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-terracotta">
        {title}
      </p>
      <ul className="space-y-1.5 text-sm text-cream/75">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="transition-colors hover:text-warm-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
