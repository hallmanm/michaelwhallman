import { Col, Container, Row } from "react-bootstrap";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} about engineering leadership roles.`,
};

export default function ContactPage() {
  return (
    <section className="section">
      <Container>
        <Row className="gy-5">
          <Col lg={5}>
            <span className="eyebrow">Contact</span>
            <h1 className="display-headline display-4 text-balance">Let&apos;s talk.</h1>
            <p className="lead text-secondary text-balance">
              Hiring for an engineering management or director role? Share a few details and
              I&apos;ll get back to you within a couple business days.
            </p>
            <div className="mt-4">
              <div className="small text-secondary">Or connect on LinkedIn</div>
              <div className="mt-2">
                <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/hallmanm →
                </a>
              </div>
              <div className="mt-3 text-secondary small">{siteConfig.location}</div>
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
