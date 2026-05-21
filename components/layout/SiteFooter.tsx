import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Container>
        <Row className="gy-4">
          <Col xs={12} md={6}>
            <div className="fw-semibold mb-2">{siteConfig.name}</div>
            <div>{siteConfig.role}, {siteConfig.currentCompany}</div>
            <div>{siteConfig.location}</div>
          </Col>
          <Col xs={6} md={3}>
            <div className="eyebrow">Site</div>
            <ul className="list-unstyled">
              <li>
                <Link href="/work">Work</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/resume">Resume</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </Col>
          <Col xs={6} md={3}>
            <div className="eyebrow">Connect</div>
            <ul className="list-unstyled">
              <li>
                <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`}>Email</a>
              </li>
            </ul>
          </Col>
        </Row>
        <div className="mt-5 pt-3 border-top d-flex justify-content-between flex-wrap gap-2">
          <span suppressHydrationWarning>© {new Date().getFullYear()} {siteConfig.name}</span>
          <span>Built with Next.js</span>
        </div>
      </Container>
    </footer>
  );
}
