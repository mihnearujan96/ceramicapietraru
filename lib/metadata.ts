import type { Metadata } from "next";
import { SITE } from "@/lib/contact";
import { absoluteUrl } from "@/lib/utils";

const defaultTitle =
  "Ceramica Pietraru | Ceramică lucrată manual în Horezu";
const defaultDescription =
  "Descoperă Ceramica Pietraru, ceramică lucrată manual în Horezu, România, continuând tradiția unei familii de ceramiști de cinci generații.";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: defaultTitle,
    template: `%s | ${SITE.name}`,
  },
  description: defaultDescription,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  keywords: [
    "Ceramica Pietraru",
    "Horezu",
    "ceramică manuală",
    "olărit",
    "România",
    "meșteșug tradițional",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: absoluteUrl("/"),
    siteName: SITE.name,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/images/hero/building-exterior.jpg",
        width: 1024,
        height: 758,
        alt: "Clădirea în formă de vas Ceramica Pietraru din Horezu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/images/hero/building-exterior.jpg"],
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

export function createPageMetadata({
  title,
  description,
  path = "/",
  image,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? "/images/hero/building-exterior.jpg";

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: ogImage, alt: title }],
    },
    twitter: {
      title,
      description,
      images: [ogImage],
    },
  };
}
