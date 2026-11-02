"use client";

import { getDictionary } from "@/data/i18n/ro";
import type { Locale } from "@/lib/locale";
import { createContext, useContext, useMemo, type ReactNode } from "react";

const LocaleContext = createContext<Locale>("ro");

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}

export function useDictionary() {
  const locale = useLocale();
  return useMemo(() => getDictionary(locale), [locale]);
}
