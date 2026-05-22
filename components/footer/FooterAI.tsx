"use client";

import { Terminal } from "lucide-react";
import { Accordion, Col, Row } from "react-bootstrap";
import { SiClaude } from "@icons-pack/react-simple-icons";

const AI_TOOLS = [
  {
    label: "Claude Code",
    href: "https://claude.ai/code",
    icon: <SiClaude size={14} />,
  },
  {
    label: "Codex CLI",
    href: "https://github.com/openai/codex",
    icon: <Terminal size={14} />,
  },
];

const AI_DETAILS = [
  {
    label: "Planning & architecture",
    detail:
      "Requirements, information architecture, tech stack selection, and system design explored through structured AI dialogue before a line of code was written.",
  },
  {
    label: "Tech stack",
    detail:
      "Next.js 15, Bootstrap 5.3, TypeScript, MDX, Resend, and Vercel selected and scaffolded via natural-language prompts — no boilerplate written by hand.",
  },
  {
    label: "Iteration & refinement",
    detail:
      "UI components, content data models, case study copy, and demo rewrites iterated rapidly through conversation, with each change reviewed and directed.",
  },
  {
    label: "CI pipeline & automation",
    detail:
      "GitHub Actions workflow (typecheck, lint, build), branch strategy, and Vercel deployment configuration designed and wired end-to-end without leaving the editor.",
  },
];

export function FooterAI() {
  return (
    <div className="mt-6 pt-4 border-top">
      <Accordion flush className="accordion-chevron-left">
        <Accordion.Item eventKey="ai">
          <Accordion.Header>
            <span className="eyebrow mb-0" style={{ letterSpacing: "0.12em" }}>Built in collaboration with AI</span>
          </Accordion.Header>
          <Accordion.Body className="px-0">
            <Row className="gy-3">
              <Col md={6} lg={5} className="mb-4 mb-md-0">
                <p className="small text-secondary mb-3">
                  This portfolio is itself a demonstration of AI-assisted engineering. Every layer
                  — from initial planning and architecture decisions to final deployment — was
                  built in active collaboration with Claude Code and Codex CLI, with all direction,
                  review, and judgment provided by myself.
                </p>
                <div className="d-flex gap-3">
                  {AI_TOOLS.map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="d-inline-flex align-items-center gap-1 small fw-semibold"
                    >
                      {icon}
                      {label}
                    </a>
                  ))}
                </div>
              </Col>
              <Col md={6} lg={7}>
                <Row className="gy-3">
                  {AI_DETAILS.map(({ label, detail }) => (
                    <Col key={label} xs={12} sm={6}>
                      <div className="small fw-semibold mb-1">{label}</div>
                      <div className="small text-secondary">{detail}</div>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
