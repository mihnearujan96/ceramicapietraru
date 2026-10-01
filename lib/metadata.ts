import type { Metadata } from "next";
import { CONTACT, SITE } from "@/lib/contact";
import { absoluteUrl } from "@/lib/utils";

const defaultTitle = "Ceramica Pietraru | Ceramică de Horezu";
const defaultDescription =
  "Ceramica Pietraru — ceramică de Horezu, lucrată manual în atelierul din Horezu, județul Vâlcea. Motive tradiționale, pictate cu cornul.";

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
    "ceramică de Horezu",
    "Horezu",
    "Vâlcea",
    "atelier ceramică Horezu",
    "ceramică manuală",
    "olărit",
    "România",
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
        url: "/images/hero/pot-building.png",
        width: 856,
        height: 683,
        alt: "Magazinul Ceramica Pietraru — clădirea în formă de vas din Horezu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/images/hero/pot-building.png"],
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
  const ogImage = image ?? "/images/hero/pot-building.png";

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
