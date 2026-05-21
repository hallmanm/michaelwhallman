import { Col, Container, Row } from "react-bootstrap";
import { experience } from "@/lib/content/experience";

export function Timeline() {
  return (
    <section className="section bg-light border-top border-bottom">
      <Container>
        <Row className="mb-5">
          <Col md={8}>
            <span className="eyebrow">Career</span>
            <h2 className="display-headline display-5 text-balance">
              From Creative Developer to Senior Engineering Manager.
            </h2>
          </Col>
        </Row>
        <Row>
          <Col lg={10}>
            <div className="timeline">
              {experience.map((entry) => (
                <div key={`${entry.company}-${entry.dates}`} className="timeline__item">
                  <div className="timeline__date">{entry.dates}</div>
                  <div className="timeline__role">{entry.role}</div>
                  <div className="timeline__company">
                    {entry.company} · {entry.location}
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
