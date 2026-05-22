import { Col, Container, Row } from "react-bootstrap";
import { awards } from "@/lib/content/awards";
import { certifications } from "@/lib/content/certifications";

export function Recognition() {
  return (
    <section className="section bg-light border-top border-bottom">
      <Container>
        <Row className="mb-5">
          <Col md={8}>
            <span className="eyebrow">Recognition</span>
            <h2 className="display-headline display-5 text-balance">
              Awards and certifications.
            </h2>
          </Col>
        </Row>
        <Row className="gy-4 mb-5">
          {awards.map((award, i) => (
            <Col key={`${award.title}-${i}`} sm={6} md={3}>
              <div className="impact-stat">
                <div className="fw-semibold">{award.title}</div>
                <div className="text-secondary small mt-1">{award.detail}</div>
                {award.date && <div className="text-secondary small mt-2">{award.date}</div>}
              </div>
            </Col>
          ))}
        </Row>
        <div className="eyebrow mt-5">Certifications</div>
        <Row className="gy-3 mt-1">
          {certifications.map((cert) => (
            <Col key={cert.title} md={6} lg={4}>
              <div className="small">
                <div className="fw-semibold">{cert.title}</div>
                <div className="text-secondary">
                  {cert.issuer} · {cert.date}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
