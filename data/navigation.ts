export type NavItem = {
  href: string;
  labelKey: keyof typeof import("@/data/i18n/ro").ro.nav;
};

export const mainNavigation: NavItem[] = [
  { href: "/", labelKey: "home" },
  { href: "/poveste", labelKey: "story" },
  { href: "/colectii", labelKey: "collections" },
  { href: "/atelier", labelKey: "atelier" },
  { href: "/#contact", labelKey: "contact" },
];

export const footerNavigation = {
  shop: [
    { href: "/colectii", label: "Colecții" },
    { href: "/colectii#farfurii", label: "Farfurii" },
    { href: "/colectii#cani", label: "Căni" },
    { href: "/colectii#vase", label: "Vase" },
  ],
  story: [
    { href: "/poveste", label: "Povestea familiei" },
    { href: "/#povestea", label: "Povestea noastră" },
  ],
  atelier: [
    { href: "/atelier", label: "Atelierul" },
    { href: "/#contact", label: "Contact" },
  ],
} as const;
