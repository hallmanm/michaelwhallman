import { Hero } from "@/components/home/Hero";
import { ImpactStrip } from "@/components/home/ImpactStrip";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Timeline } from "@/components/home/Timeline";
import { Testimonials } from "@/components/home/Testimonials";
import { Recognition } from "@/components/home/Recognition";
import { ContactCta } from "@/components/home/ContactCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ImpactStrip />
      <FeaturedWork />
      <Timeline />
      <Testimonials />
      <Recognition />
      <ContactCta />
    </>
  );
}
