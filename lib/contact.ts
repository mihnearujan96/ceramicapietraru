/**
 * Contact details — replace TODO values with real information before launch.
 * Do not invent address, phone, email, or hours.
 */
export const CONTACT = {
  address: "Strada Tudor Vladimirescu 26, 245800 Horezu",
  phones: [
    { label: "+40 730 602 177", tel: "+40730602177" },
    { label: "+40 722 774 335", tel: "+40722774335" },
  ],
  email: "TODO",
  hours: "Zilnic, 10:00 – 19:00",
  mapUrl: "https://maps.app.goo.gl/WgG9k46w2HYgqkMv5",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2905.708588962619!2d24.000249911751215!3d45.14449665459249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474d728f7bbd1945%3A0x3bd81356380dd80c!2sCeramica%20Pietraru!5e1!3m2!1sro!2sro!4v1790513652912!5m2!1sro!2sro",
  instagram: "TODO",
  facebook: "TODO",
} as const;

export const SITE = {
  name: "Ceramica Pietraru",
  location: "Horezu, România",
  locale: "ro_RO",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ceramicapietraru.ro",
} as const;
