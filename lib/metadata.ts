import type { Metadata } from "next";
import { getDictionary } from "@/data/i18n/ro";
import { CONTACT, SITE } from "@/lib/contact";
import type { Locale } from "@/lib/locale";
import { absoluteUrl } from "@/lib/utils";

export function buildMetadata(locale: Locale): Metadata {
  const copy = getDictionary(locale);

  return {
  metadataBase: new URL(SITE.url),
  title: {
    default: copy.meta.title,
    template: `%s | ${SITE.name}`,
  },
  description: copy.meta.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  keywords: [...copy.meta.keywords],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: locale === "en" ? "en_US" : "ro_RO",
    url: absoluteUrl("/"),
    siteName: SITE.name,
    title: copy.meta.title,
    description: copy.meta.description,
    images: [
      {
        url: "/images/hero/pot-building-og.jpg",
        width: 1200,
        height: 957,
        alt: copy.meta.ogAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: copy.meta.title,
    description: copy.meta.description,
    images: ["/images/hero/pot-building-og.jpg"],
  },
  other: {
    "geo.region": CONTACT.regionCode,
    "geo.placename": CONTACT.locality,
    "geo.position": `${CONTACT.latitude};${CONTACT.longitude}`,
    ICBM: `${CONTACT.latitude}, ${CONTACT.longitude}`,
  },
  verification: {
    google: "xnh1hZ5q9d69LPHMe3gahrdIvJqkg3xIkRcytDAg5Oc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/images/brand/logo-mark.svg", type: "image/svg+xml" }],
    apple: [{ url: "/images/brand/logo.png", type: "image/png" }],
  },
  };
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  image,
  locale = "ro",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  locale?: Locale;
}): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? "/images/hero/pot-building-og.jpg";

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      locale: locale === "en" ? "en_US" : "ro_RO",
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      title,
      description,
      images: [ogImage],
    },
  };
}
