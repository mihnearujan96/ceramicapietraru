import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ceramica Pietraru",
    short_name: "Pietraru",
    description:
      "Ceramică lucrată manual în Horezu, România — cinci generații de meșteșug.",
    start_url: "/",
    display: "standalone",
    background_color: "#FBF8F2",
    theme_color: "#B96F4B",
    lang: "ro",
    icons: [
      {
        src: "/images/brand/logo-mark.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/images/brand/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
