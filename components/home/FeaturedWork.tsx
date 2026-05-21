import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { featuredCaseStudies } from "@/lib/content/case-studies";

export function FeaturedWork() {
  return (
    <section className="section" id="work">
      <Container>
        <Row className="mb-5">
          <Col md={8}>
            <span className="eyebrow">Selected work</span>
            <h2 className="display-headline display-5 text-balance">
              Where measurable business impact meets engineering depth.
            </h2>
          </Col>
        </Row>
        <Row className="gy-4">
          {featuredCaseStudies.map((cs) => (
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
        <div className="mt-5">
          <Link href="/work" className="link-dark">
            See all case studies →
          </Link>
        </div>
      </Container>
    </section>
  );
}
