import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { caseStudies } from "@/lib/content/case-studies";

export const metadata = {
  title: "Work",
  description: "Case studies in experimentation, personalization, headless CMS, and engineering leadership.",
};

export default function WorkIndexPage() {
  return (
    <section className="section">
      <Container>
        <Row className="mb-5">
          <Col md={9}>
            <span className="eyebrow">Case studies</span>
            <h1 className="display-headline display-4 text-balance">
              Fifteen years of engineering work — distilled.
            </h1>
            <p className="lead text-secondary text-balance">
              Each case study walks through the problem, what I led, and the business outcome —
              with optional live demos for the ones that still hold up.
            </p>
          </Col>
        </Row>
        <Row className="gy-4">
          {caseStudies.map((cs) => (
            <Col key={cs.slug} md={6} lg={4}>
              <Link href={`/work/${cs.slug}`} className="work-card">
                <div className="work-card__meta">
                  {cs.company} · {cs.dates}
                </div>
                <div className="work-card__title text-balance">{cs.title}</div>
                <p className="text-secondary mb-0">{cs.headline}</p>
                <div className="work-card__outcome">{cs.outcome}</div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
