import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Hero } from "@/components/home/Hero";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Engineering Manager & Experimentation Leader`,
  description: siteConfig.description,
};
import { ImpactStrip } from "@/components/home/ImpactStrip";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Timeline } from "@/components/home/Timeline";
import { Testimonials } from "@/components/home/Testimonials";
import { Recognition } from "@/components/home/Recognition";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ImpactStrip />
      <FeaturedWork />
      <Timeline />
      <Testimonials />
      <Recognition />
    </>
  );
}
