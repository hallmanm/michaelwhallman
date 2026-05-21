import Link from "next/link";
import { Cpu, ExternalLink } from "lucide-react";
import { Col, Container, Row } from "react-bootstrap";
import { SiClaude, SiNextdotjs, SiBootstrap } from "@icons-pack/react-simple-icons";
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
                <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="d-inline-flex align-items-center gap-2">
                  <ExternalLink size={14} />
                  LinkedIn
                </a>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-5 pt-4 border-top">
          <Col xs={12}>
            <div className="eyebrow mb-3">Built with AI</div>
          </Col>
          <Col md={6} lg={5} className="mb-4 mb-md-0">
            <div className="d-flex gap-3 mb-3">
              <a href="https://claude.ai/code" target="_blank" rel="noopener noreferrer"
                className="d-inline-flex align-items-center gap-1 small fw-semibold">
                <SiClaude size={14} />
                Claude Code
              </a>
              <a href="https://openai.com/codex" target="_blank" rel="noopener noreferrer"
                className="d-inline-flex align-items-center gap-1 small fw-semibold">
                <Cpu size={14} />
                Codex
              </a>
            </div>
            <p className="small text-secondary mb-0">
              This portfolio is itself a demonstration of AI-assisted engineering. Every layer
              — from initial planning and architecture decisions to final deployment — was
              built in active collaboration with Claude Code and Codex, with all direction,
              review, and judgment provided by me.
            </p>
          </Col>
          <Col md={6} lg={7}>
            <Row className="gy-3">
              {[
                {
                  label: "Planning & architecture",
                  detail: "Requirements, information architecture, tech stack selection, and system design explored through structured AI dialogue before a line of code was written.",
                },
                {
                  label: "Tech stack",
                  detail: "Next.js 15, Bootstrap 5.3, TypeScript, MDX, Resend, and Vercel selected and scaffolded via natural-language prompts — no boilerplate written by hand.",
                },
                {
                  label: "Iteration & refinement",
                  detail: "UI components, content data models, case study copy, and demo rewrites iterated rapidly through conversation, with each change committed and reviewed.",
                },
                {
                  label: "CI pipeline & automation",
                  detail: "GitHub Actions workflow (typecheck, lint, build), branch strategy, and Vercel deployment configuration designed and wired end-to-end without leaving the editor.",
                },
              ].map(({ label, detail }) => (
                <Col key={label} xs={12} sm={6}>
                  <div className="small fw-semibold mb-1">{label}</div>
                  <div className="small text-secondary">{detail}</div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
        <div className="mt-4 pt-3 border-top d-flex justify-content-between flex-wrap gap-2">
          <span suppressHydrationWarning>© {new Date().getFullYear()} {siteConfig.name}</span>
          <span className="d-inline-flex align-items-center gap-3 text-secondary small">
            <span className="d-inline-flex align-items-center gap-1"><SiNextdotjs size={12} /> Next.js</span>
            <span className="d-inline-flex align-items-center gap-1"><SiBootstrap size={12} /> Bootstrap</span>
            <span className="d-inline-flex align-items-center gap-1"><SiClaude size={12} /> Claude Code</span>
          </span>
        </div>
      </Container>
    </footer>
  );
}
