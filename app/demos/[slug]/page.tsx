import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type DemoEntry = {
  slug: string;
  title: string;
  caseStudySlug: string;
  src: string;
};

const DEMOS: DemoEntry[] = [
  {
    slug: "product-guide-framework",
    title: "Stop-motion product guide",
    caseStudySlug: "product-guide-framework",
    src: "/demo-src/stop-motion/index.html",
  },
  {
    slug: "master-module",
    title: "Master Module — template generator",
    caseStudySlug: "master-module",
    src: "/demo-src/template-generator/index.html",
  },
  {
    slug: "headless-cms-app",
    title: "In-house headless CMS",
    caseStudySlug: "headless-cms-app",
    src: "/demo-src/headless-cms/index.html",
  },
  {
    slug: "experiment-visibility",
    title: "Adobe Target debugger",
    caseStudySlug: "experiment-visibility",
    src: "/demo-src/experiment-visibility/index.html",
  },
  {
    slug: "parallax",
    title: "Parallax storytelling",
    caseStudySlug: "parallax",
    src: "/demo-src/parallax/index.html",
  },
  {
    slug: "panorama",
    title: "Shoppable 360° panorama",
    caseStudySlug: "panorama",
    src: "/demo-src/panorama/index.html",
  },
  {
    slug: "word-count-validator",
    title: "RegEx word-count validator",
    caseStudySlug: "word-count-validator",
    src: "/demo-src/regex/index.html",
  },
];

export function generateStaticParams() {
  return DEMOS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const demo = DEMOS.find((d) => d.slug === slug);
  return demo ? { title: demo.title } : {};
}

export default async function DemoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const demo = DEMOS.find((d) => d.slug === slug);
  if (!demo) notFound();

  return (
    <div style={{ position: "fixed", inset: 0, background: "#fbf7f5" }}>
      <iframe
        src={demo.src}
        title={demo.title}
        style={{ border: "none", width: "100%", height: "100%", display: "block" }}
      />
      <Link
        href={`/work/${demo.caseStudySlug}`}
        aria-label="Back to case study"
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          zIndex: 1000,
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          padding: "0.5rem 0.875rem",
          background: "rgba(13, 13, 13, 0.92)",
          color: "#ffffff",
          textDecoration: "none",
          borderRadius: "999px",
          fontSize: "0.8125rem",
          fontWeight: 500,
          boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
          backdropFilter: "blur(8px)",
        }}
      >
        <ArrowLeft size={14} />
        Back to case study
      </Link>
    </div>
  );
}
