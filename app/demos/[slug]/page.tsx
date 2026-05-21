import Link from "next/link";
import { notFound } from "next/navigation";
import { Col, Container, Row } from "react-bootstrap";
import { RegexDemo } from "@/components/demos/RegexDemo";
import { ParallaxDemo } from "@/components/demos/ParallaxDemo";
import { ExperimentVisibilityDemo } from "@/components/demos/ExperimentVisibilityDemo";
import { PersonalizationDemo } from "@/components/demos/PersonalizationDemo";

type DemoEntry = {
  slug: string;
  title: string;
  caseStudySlug: string;
  Component: React.ComponentType;
};

const DEMOS: DemoEntry[] = [
  {
    slug: "regex",
    title: "Word-count validator",
    caseStudySlug: "creative-engineering",
    Component: RegexDemo,
  },
  {
    slug: "parallax",
    title: "Parallax effect",
    caseStudySlug: "creative-engineering",
    Component: ParallaxDemo,
  },
  {
    slug: "experiment-visibility",
    title: "Experiment visibility debugger",
    caseStudySlug: "ab-testing-program-aeo",
    Component: ExperimentVisibilityDemo,
  },
  {
    slug: "personalization",
    title: "Personalization framework",
    caseStudySlug: "personalization-framework",
    Component: PersonalizationDemo,
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
  const Component = demo.Component;

  return (
    <section className="section">
      <Container>
        <Row className="mb-4">
          <Col lg={9}>
            <Link href={`/work/${demo.caseStudySlug}`} className="small text-secondary">
              ← Back to case study
            </Link>
            <span className="eyebrow d-block mt-3">Live demo</span>
            <h1 className="display-headline display-5 text-balance">{demo.title}</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={9}>
            <Component />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
