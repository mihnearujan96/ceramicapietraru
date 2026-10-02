import { CONTACT, SITE } from "@/lib/contact";
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

const description =
  "Ceramica Pietraru — ceramică de Horezu, lucrată manual în atelierul din Horezu, județul Vâlcea. Motive tradiționale, pictate cu cornul.";

export function localBusinessJsonLd() {
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
            name: "România",
          },
        ],
        knowsAbout: [
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
        inLanguage: "ro-RO",
        publisher: { "@id": id },
      },
    ],
  };
}

export function llmsTxt() {
  const home = absoluteUrl("/");
  const shop = absoluteUrl("/magazin");
  const phones = CONTACT.phones.map((phone) => phone.label).join(", ");

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
`;
}
