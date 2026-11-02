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
    { href: "/#povestea", labelKey: "story" },
    { href: "/#colectii", labelKey: "collections" },
  ],
  atelier: [
    { href: "/#atelier", labelKey: "atelier" },
    { href: "/#contact", labelKey: "contact" },
    { href: "/magazin", labelKey: "shop" },
  ],
} as const;
