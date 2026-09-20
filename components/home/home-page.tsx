import { Atelier } from "@/components/home/atelier";
import { Collections } from "@/components/home/collections";
import { FamilyStory } from "@/components/home/family-story";
import { FinalCta } from "@/components/home/final-cta";
import { HandmadeValues } from "@/components/home/handmade-values";
import { Hero } from "@/components/home/hero";
import { Intro } from "@/components/home/intro";
import { Process } from "@/components/home/process";
import { Quote } from "@/components/home/quote";
import { RotatingPotSection } from "@/components/storytelling/rotating-pot-section";

export function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <RotatingPotSection />
      <FamilyStory />
      <Collections />
      <Process />
      <HandmadeValues />
      <Atelier />
      <Quote />
      <FinalCta />
    </>
  );
}
