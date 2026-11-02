import { getDictionary } from "@/data/i18n/ro";
import { CONTACT, SITE } from "@/lib/contact";
import type { Locale } from "@/lib/locale";
import { absoluteUrl } from "@/lib/utils";

const WEEKDAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export function localBusinessJsonLd(locale: Locale = "ro") {
  const copy = getDictionary(locale);
  const description = copy.meta.description;
  const id = `${SITE.url}/#atelier`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "Store"],
        "@id": id,
        name: SITE.name,
        description,
        url: SITE.url,
        image: absoluteUrl("/images/atelier/atelier-fatada.webp"),
        telephone: CONTACT.phones.map((phone) => phone.tel),
        address: {
          "@type": "PostalAddress",
          streetAddress: CONTACT.streetAddress,
          postalCode: CONTACT.postalCode,
          addressLocality: CONTACT.locality,
          addressRegion: CONTACT.region,
          addressCountry: CONTACT.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: CONTACT.latitude,
          longitude: CONTACT.longitude,
        },
        hasMap: CONTACT.mapUrl,
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: WEEKDAYS.map((day) => `https://schema.org/${day}`),
          opens: "10:00",
          closes: "19:00",
        },
        areaServed: [
          {
            "@type": "City",
            name: "Horezu",
            containedInPlace: {
              "@type": "AdministrativeArea",
              name: "Vâlcea",
            },
          },
          {
            "@type": "Country",
            name: locale === "en" ? "Romania" : "România",
          },
        ],
        knowsAbout:
          locale === "en"
            ? [
                "Horezu ceramics",
                "pottery",
                "painting with the horn",
                "handmade ceramics",
              ]
            : [
                "ceramică de Horezu",
                "olărit",
                "pictură cu cornul",
                "ceramică lucrată manual",
              ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        description,
        inLanguage: locale === "en" ? "en" : "ro-RO",
        publisher: { "@id": id },
      },
    ],
  };
}

export function llmsTxt() {
  const home = absoluteUrl("/");
  const shop = absoluteUrl("/magazin");
  const phones = CONTACT.phones.map((phone) => phone.label).join(", ");
  const description = getDictionary("ro").meta.description;

  return `# ${SITE.name}

> ${description}

Ceramica Pietraru este un atelier și magazin de ceramică tradițională în Horezu, județul Vâlcea, România. Piesele sunt modelate la roată și decorate manual, cu cornul, de Nicoleta și Laurențiu Pietraru, în continuitatea familiei Mischiu.

## Locație

- Adresă: ${CONTACT.address}, România
- Coordonate: ${CONTACT.latitude}, ${CONTACT.longitude}
- Hartă: ${CONTACT.mapUrl}
- Program: ${CONTACT.hours}
- Telefon: ${phones}

## Ce se poate cita

- Ceramica este lucrată manual în Horezu, nu turnată în serie.
- Motivele folosite sunt cele ale ceramicii de Horezu: pești, arborele vieții, cocoșul, șarpele casei, spicul de grâu, spirala.
- Decorul se trasează cu cornul, apoi piesa se arde la aproximativ 1.000 °C.
- Atelierul-magazin poate fi vizitat zilnic, între 10:00 și 19:00.
- Magazinul online este în construcție; comenzile se fac deocamdată la atelier.

## Pagini

- [Acasă](${home}): povestea familiilor Mischiu și Pietraru, meșteșugul și atelierul
- [Magazin](${shop}): magazinul online, momentan în construcție

## English

> ${getDictionary("en").meta.description}

Ceramica Pietraru is a workshop and shop for traditional ceramics in Horezu, Vâlcea County, Romania. The pieces are thrown on the wheel and decorated by hand, with the horn, by Nicoleta and Laurențiu Pietraru, continuing the Mischiu family.

- Address: 26 Tudor Vladimirescu Street, 245800 Horezu, Vâlcea, Romania
- Hours: daily, 10:00–19:00
- The ceramics are handmade in Horezu, not cast in series.
- Motifs include fish, the tree of life, the rooster, the house snake, the ear of wheat, and the spiral.
- Decoration is drawn with the horn, then the piece is fired at about 1,000 °C.
- The online shop is under construction; orders are placed at the workshop for now.
- [Home](${home}): the story of the Mischiu and Pietraru families, the craft, and the workshop
- [Shop](${shop}): the online shop, currently under construction
`;
}
