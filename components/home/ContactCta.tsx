import { Col, Container, Row } from "react-bootstrap";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/site-config";

export function ContactCta() {
  return (
    <section className="section" id="contact">
      <Container>
        <Row className="gy-5">
          <Col lg={5}>
            <span className="eyebrow">Get in touch</span>
            <h2 className="display-headline display-5 text-balance mb-3">
              Hiring for an engineering leadership role? Let&apos;s talk.
            </h2>
            <p className="text-secondary">
              Whether you have a specific role in mind or just want to compare notes on
              experimentation, personalization, or scaling engineering teams — drop me a note.
            </p>
            <div className="mt-4">
              <div className="small text-secondary">Or connect on LinkedIn</div>
              <div className="mt-2">
                <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/hallmanm →
                </a>
              </div>
            </div>
          </Col>
          <Col lg={{ span: 6, offset: 1 }}>
            <ContactForm />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
