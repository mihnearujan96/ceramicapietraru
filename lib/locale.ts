export const LOCALES = ["ro", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const LOCALE_COOKIE = "locale";

export function parseLocale(value: string | undefined | null): Locale {
  return value === "en" ? "en" : "ro";
}
