import { Col, Container, Row } from "react-bootstrap";
import { testimonials } from "@/lib/content/testimonials";

export function Testimonials() {
  return (
    <section className="section" id="testimonials">
      <Container>
        <Row className="mb-5">
          <Col md={8}>
            <span className="eyebrow">What people say</span>
            <h2 className="display-headline display-5 text-balance">
              Recommendations from designers, PMs, and engineering leaders.
            </h2>
          </Col>
        </Row>
        <Row className="gy-4">
          {testimonials.map((t) => (
            <Col key={t.name} md={6}>
              <div className="testimonial-card">
                <p className="testimonial-card__quote text-balance">{t.quote}</p>
                <div className="testimonial-card__author">
                  <strong>{t.name}</strong>
                  <span>
                    {t.title} · {t.company}
                  </span>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
