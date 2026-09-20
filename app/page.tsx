import { HomePage } from "@/components/home/home-page";
import { ComingSoon } from "@/components/wip/coming-soon";
import { SHOW_WIP } from "@/lib/site-flags";
import type { Metadata } from "next";

export const metadata: Metadata = SHOW_WIP
  ? {
      title: "În curând | Ceramica Pietraru",
      description:
        "Lucrăm la noul site Ceramica Pietraru. Revenim curând cu povestea ceramicii din Horezu.",
      robots: { index: true, follow: true },
    }
  : {};

export default function Page() {
  if (SHOW_WIP) {
    return <ComingSoon />;
  }

  return <HomePage />;
}
