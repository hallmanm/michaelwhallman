import Link from "next/link";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section className="section pt-6">
      <Container>
        <Row className="align-items-center g-5">
          <Col lg={7}>
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
              <Link href="/#contact" className="btn btn-outline-dark btn-lg">
                Get in touch
              </Link>
            </div>
          </Col>
          <Col lg={5} className="d-none d-lg-block">
            <div style={{ borderRadius: "0.5rem", overflow: "hidden", aspectRatio: "2/3" }}>
              <Image
                src="/headshots/headshot_bw_web.jpg"
                alt={siteConfig.name}
                width={600}
                height={899}
                priority
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
