import { Container, Row, Col } from "react-bootstrap";
import { WorkGrid } from "@/components/work/WorkGrid";

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
        <WorkGrid />
      </Container>
    </section>
  );
}
