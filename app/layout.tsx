import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import { CartProvider } from "@/components/cart/cart-provider";
import { CartDrawer } from "@/components/layout/cart-drawer";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { defaultMetadata } from "@/lib/metadata";
import { SITE, CONTACT } from "@/lib/contact";
import { SHOW_WIP } from "@/lib/site-flags";
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
    "Ceramică lucrată manual în Horezu, România — tradiție de cinci generații.",
  url: SITE.url,
  image: `${SITE.url}/images/hero/building-exterior.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Horezu",
    addressCountry: "RO",
    streetAddress: CONTACT.address === "TODO" ? undefined : CONTACT.address,
  },
  telephone: CONTACT.phone === "TODO" ? undefined : CONTACT.phone,
  email: CONTACT.email === "TODO" ? undefined : CONTACT.email,
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
          {SHOW_WIP ? null : <Header />}
          <main id="main-content" className="flex-1">
            {children}
          </main>
          {SHOW_WIP ? null : (
            <>
              <Footer />
              <CartDrawer />
            </>
          )}
        </CartProvider>
      </body>
    </html>
  );
}
