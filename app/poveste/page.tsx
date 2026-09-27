import { FamilyStory } from "@/components/home/family-story";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Povestea noastră",
  description:
    "În Horezu, ceramica nu este doar un meșteșug — este tradiția familiilor Mischiu și Pietraru, transmisă din generație în generație.",
  path: "/poveste",
});

export default function StoryPage() {
  return (
    <div className="pt-16 md:pt-20">
      <FamilyStory />
    </div>
  );
}
