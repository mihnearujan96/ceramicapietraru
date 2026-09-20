import { Container } from "@/components/ui/container";
import { Logo } from "@/components/brand/logo";
import { footerNavigation } from "@/data/navigation";
import { getDictionary } from "@/data/i18n/ro";
import { CONTACT } from "@/lib/contact";
import Link from "next/link";

const copy = getDictionary();

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo variant="light" height={110} className="max-w-[280px]" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/70">
              {copy.brand.tagline}
            </p>
          </div>

          <FooterColumn title={copy.footer.shop} links={footerNavigation.shop} />
          <FooterColumn
            title={copy.footer.story}
            links={footerNavigation.story}
          />

          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-terracotta">
              {copy.footer.contact}
            </p>
            <ul className="space-y-3 text-sm text-cream/80">
              <li>
                <Link
                  href="/atelier"
                  className="transition-colors hover:text-warm-white"
                >
                  {copy.footer.atelier}
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="transition-colors hover:text-warm-white"
                >
                  {copy.nav.contact}
                </Link>
              </li>
              <li className="pt-2 text-cream/55">
                Instagram: {CONTACT.instagram}
              </li>
              <li className="text-cream/55">Facebook: {CONTACT.facebook}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="text-sm text-cream/70">{copy.brand.footerStatement}</p>
          <p className="mt-2 text-xs text-cream/45">
            © {year} {copy.brand.name}
          </p>
        </div>
      </Container>

      <div className="flex justify-center overflow-hidden border-t border-white/10 px-4 py-10">
        <Logo
          variant="light"
          height={120}
          href={null}
          className="max-w-[min(100%,420px)] opacity-25"
        />
      </div>
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
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-terracotta">
        {title}
      </p>
      <ul className="space-y-3 text-sm text-cream/80">
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
