/**
 * Contact details — replace TODO values with real information before launch.
 * Do not invent address, phone, email, or hours.
 */
export const CONTACT = {
  address: "TODO",
  phone: "TODO",
  email: "TODO",
  hours: "TODO",
  mapUrl: "TODO",
  instagram: "TODO",
  facebook: "TODO",
} as const;

export const SITE = {
  name: "Ceramica Pietraru",
  location: "Horezu, România",
  locale: "ro_RO",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ceramicapietraru.ro",
} as const;
