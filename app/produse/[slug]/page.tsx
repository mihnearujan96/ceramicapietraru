import { ProductGallery } from "@/components/products/product-gallery";
import { ProductPurchase } from "@/components/products/product-purchase";
import { Container } from "@/components/ui/container";
import { getProductBySlug, products } from "@/data/products";
import { getDictionary } from "@/data/i18n/ro";
import { createPageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/contact";
import { absoluteUrl } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

const copy = getDictionary();

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return createPageMetadata({
    title: product.name,
    description: product.description,
    path: `/produse/${product.slug}`,
    image: product.images[0],
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((image) => absoluteUrl(image)),
    brand: {
      "@type": "Brand",
      name: SITE.name,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: product.currency,
      price: product.price,
      availability:
        product.availability === "sold"
          ? "https://schema.org/SoldOut"
          : product.availability === "made-to-order"
            ? "https://schema.org/PreOrder"
            : "https://schema.org/InStock",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Acasă",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Colecții",
        item: absoluteUrl("/colectii"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: absoluteUrl(`/produse/${product.slug}`),
      },
    ],
  };

  return (
    <section className="bg-warm-white pb-24 pt-28 md:pt-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Container>
        <Link
          href="/colectii"
          className="text-sm text-muted transition-colors hover:text-clay"
        >
          ← {copy.product.backToCollections}
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ProductGallery product={product} />
          <ProductPurchase product={product} />
        </div>

        <div className="mt-20 max-w-2xl border-t border-border pt-12">
          <h2 className="heading-display text-3xl md:text-4xl">
            {copy.product.storyTitle}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
            {copy.product.storyBody}
          </p>
        </div>
      </Container>
    </section>
  );
}
