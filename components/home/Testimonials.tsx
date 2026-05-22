import { Col, Container, Row } from "react-bootstrap";
import { testimonials } from "@/lib/content/testimonials";

export function Testimonials() {
  return (
    <section className="section" id="testimonials" style={{ overflowX: "clip" }}>
      <Container>
        <Row className="mb-5">
          <Col md={8}>
            <span className="eyebrow">What people say</span>
            <h2 className="display-headline display-5 text-balance">
              Recommendations from my colleagues.
            </h2>
          </Col>
        </Row>
        <Row className="gy-4">
          {testimonials.map((t) => (
            <Col key={t.name} md={6}>
              <div className="testimonial-card" style={{ position: "relative" }}>
                {t.photo && (
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: -16,
                      right: 8,
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      backgroundImage: `url('${t.photo}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center top",
                      border: "2px solid var(--bs-body-bg)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
                    }}
                  />
                )}
                <p className="testimonial-card__quote text-balance">{t.quote}</p>
                <div className="testimonial-card__author">
                  <strong style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>{t.name}</strong>
                  <span>{t.title}</span>
                  <strong>{t.company}</strong>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
