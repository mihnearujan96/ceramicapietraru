import { Atelier } from "@/components/home/atelier";
import { FamilyStory } from "@/components/home/family-story";
import { HandmadeValues } from "@/components/home/handmade-values";
import { Hero } from "@/components/home/hero";

export function HomePage() {
  return (
    <>
      <Hero />
      <FamilyStory />
      <HandmadeValues />
      <Atelier />
    </>
  );
}
