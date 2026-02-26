import AboutHero from "@/components/about/AboutHero";
import WhoWeAre from "@/components/about/WhoWeAre";
import StatsStrip from "@/components/about/StatsStrip";
import MissionVision from "@/components/about/MissionVision";


export default function AboutPage() {
  return (
    <main className="bg-background overflow-x-hidden">
      <AboutHero />
      <WhoWeAre />
      <StatsStrip />
      <MissionVision />


    </main>
  );
}
