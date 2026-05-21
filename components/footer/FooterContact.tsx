import { ExternalLink } from "lucide-react";
import { Col, Row } from "react-bootstrap";
import { siteConfig } from "@/lib/site-config";
import { ContactForm } from "@/components/contact/ContactForm";

export function FooterContact() {
  return (
    <Row className="gy-5">
      <Col lg={4}>
        <div className="eyebrow d-block mb-3">Get in touch</div>
        <div className="d-flex align-items-start gap-3 mb-4">
          <div
            role="img"
            aria-label={siteConfig.name}
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              flexShrink: 0,
              backgroundImage: "url('/headshots/headshot_bw_web.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "70% top",
            }}
          />
          <div>
            <div className="fw-semibold mb-1">{siteConfig.name}</div>
            <div className="text-secondary small mb-1">{siteConfig.role}, {siteConfig.currentCompany}</div>
            <div className="text-secondary small mb-2">{siteConfig.location}</div>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="d-inline-flex align-items-center gap-2 small"
            >
              <ExternalLink size={13} />
              linkedin.com/in/hallmanm
            </a>
          </div>
        </div>
      </Col>
      <Col lg={{ span: 7, offset: 1 }}>
        <ContactForm compact />
      </Col>
    </Row>
  );
}
