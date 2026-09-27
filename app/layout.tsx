import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { CartProvider } from "@/components/cart/cart-provider";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { defaultMetadata } from "@/lib/metadata";
import { SITE, CONTACT } from "@/lib/contact";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  description:
    "Ceramică lucrată manual în Horezu, România — tradiție transmisă din generație în generație.",
  url: SITE.url,
  image: `${SITE.url}/images/hero/building-exterior.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Horezu",
    addressCountry: "RO",
    streetAddress: CONTACT.address,
  },
  telephone: CONTACT.phones.map((phone) => phone.tel),
  email: CONTACT.email === "TODO" ? undefined : CONTACT.email,
  openingHours: "Mo-Su 10:00-19:00",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${fraunces.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <CartProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
