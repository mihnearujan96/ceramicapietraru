export type NavItem = {
  href: string;
  labelKey: keyof typeof import("@/data/i18n/ro").ro.nav;
};

export const mainNavigation: NavItem[] = [
  { href: "/", labelKey: "home" },
  { href: "/#povestea", labelKey: "story" },
  { href: "/#colectii", labelKey: "collections" },
  { href: "/#atelier", labelKey: "atelier" },
  { href: "/#contact", labelKey: "contact" },
];

export const footerNavigation = {
  story: [
    { href: "/#povestea", label: "Povestea noastră" },
    { href: "/#colectii", label: "Colecții" },
  ],
  atelier: [
    { href: "/#atelier", label: "Atelierul" },
    { href: "/#contact", label: "Contact" },
    { href: "/magazin", label: "Magazin" },
  ],
} as const;
