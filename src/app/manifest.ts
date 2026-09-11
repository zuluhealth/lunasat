import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Lunasat",
    short_name: "Lunasat",
    description:
      "Mission-critical communications, security, telecom, and airspace systems integration.",
    start_url: "/",
    display: "standalone",
    background_color: "#07020D",
    theme_color: "#07020D",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icons/lunasat-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/lunasat-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
