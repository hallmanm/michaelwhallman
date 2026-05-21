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
                <a href="/contact">Contact</a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-5 pt-4 border-top">
          <Col md={8} lg={6}>
            <div className="eyebrow mb-2">Built with AI</div>
            <p className="small text-secondary mb-1">
              This portfolio was designed and built in collaboration with{" "}
              <a href="https://claude.ai/code" target="_blank" rel="noopener noreferrer">Claude Code</a>
              {" "}and{" "}
              <a href="https://openai.com/codex" target="_blank" rel="noopener noreferrer">Codex</a>
              {" "}— AI coding assistants from Anthropic and OpenAI. The stack (Next.js 15,
              Bootstrap 5, TypeScript, Resend, Vercel) was scaffolded, architected, and iterated
              on through natural-language prompts, with every commit reviewed and directed by me.
              It reflects how I work today: AI as a force multiplier for engineering output,
              not a replacement for engineering judgment.
            </p>
          </Col>
        </Row>
        <div className="mt-4 pt-3 border-top d-flex justify-content-between flex-wrap gap-2">
          <span suppressHydrationWarning>© {new Date().getFullYear()} {siteConfig.name}</span>
          <span className="text-secondary small">Next.js · Bootstrap · Claude Code · Codex</span>
        </div>
      </Container>
    </footer>
  );
}
