import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="section pt-6">
      <Container>
        <Row className="align-items-center g-5">
          <Col lg={8}>
            <span className="eyebrow">
              {siteConfig.role} · {siteConfig.currentCompany}
            </span>
            <h1 className="display-headline display-3 text-balance mb-4">
              Engineering leader driving{" "}
              <span style={{ fontStyle: "italic" }}>$130M+</span> in measurable revenue through experimentation.
            </h1>
            <p className="lead text-balance" style={{ maxWidth: "44rem" }}>
              Fifteen years in ecommerce engineering — building experimentation platforms, personalization
              frameworks, and headless content systems. Currently leading the Experimentation team at Estée
              Lauder.
            </p>
            <div className="d-flex flex-wrap gap-3 mt-4">
              <Link href="/work" className="btn btn-dark btn-lg">
                View work
              </Link>
              <Link href="/contact" className="btn btn-outline-dark btn-lg">
                Get in touch
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
