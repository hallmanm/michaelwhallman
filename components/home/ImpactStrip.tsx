import { Col, Container, Row } from "react-bootstrap";
import { impactStats } from "@/lib/content/impact";

export function ImpactStrip() {
  return (
    <section className="section-tight bg-light border-top border-bottom">
      <Container>
        <Row className="mb-5">
          <Col md={8}>
            <span className="eyebrow">The Raw Data</span>
          </Col>
        </Row>
        <Row className="gy-4">
          {impactStats.map((stat) => (
            <Col key={stat.label} xs={6} md={3}>
              <dl className="impact-stat">
                <dd className="impact-stat__value">{stat.value}</dd>
                <dt className="impact-stat__label">{stat.label}</dt>
              </dl>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
