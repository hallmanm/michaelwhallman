import { Building2, Laptop } from "lucide-react";
import { Col, Container, Row } from "react-bootstrap";
import { siteConfig } from "@/lib/site-config";
import { experience, WorkStyle } from "@/lib/content/experience";
import { certifications } from "@/lib/content/certifications";

const WORK_STYLE_LABEL: Record<WorkStyle, string> = {
  "in-office": "In office",
  hybrid: "Hybrid",
  remote: "Remote",
};

const WORK_STYLE_ICON: Record<WorkStyle, React.ReactNode> = {
  "in-office": <Building2 size={13} />,
  hybrid: <span style={{ display: "inline-flex", alignItems: "center", gap: 2 }}><Laptop size={13} /><span style={{ fontSize: "0.6rem", lineHeight: 1 }}>/</span><Building2 size={13} /></span>,
  remote: <Laptop size={13} />,
};

export const metadata = {
  title: "Resume — Engineering Manager, A/B Testing & Experimentation",
  description: `Resume of ${siteConfig.name} — Engineering Manager with 15+ years leading A/B testing programs, CRO initiatives, and growth engineering teams in ecommerce.`,
};

const skills = {
  Languages: [
    "JavaScript",
    "TypeScript",
    "CSS",
    "HTML",
    "PHP",
    "JSON",
    "XML",
    "Liquid",
    "SQL",
    "R",
    "React",
    "Next.js",
    "Bootstrap",
    "jQuery",
    "Handlebars",
    "Velocity",
  ],
  "Technical Applications": [
    "Optimizely",
    "Adobe Target",
    "Shopify",
    "Tealium iQ",
    "Tealium EventStream",
    "Contentstack",
    "Oracle WebCenter Sites",
    "Adobe Scene7",
    "SendGrid",
    "Resend",
    "Jira / Confluence",
    "Bitbucket",
  ],
  "Development Tools": [
    "Claude Code",
    "Codex",
    "GIT",
    "SVN",
    "Terminal",
    "VS Code",
  ],
};

export default function ResumePage() {
  return (
    <section className="section resume-page">
      <Container>
        <Row className="mb-5">
          <Col md={8}>
            <span className="eyebrow">Resume</span>
            <h1 className="display-headline display-4">{siteConfig.name}</h1>
            <div className="text-secondary">
              {siteConfig.role} · {siteConfig.currentCompany} · {siteConfig.location}
            </div>
          </Col>
          <Col md={4} className="text-md-end">
            <a href={siteConfig.resume.pdf} download className="btn btn-dark btn-lg">
              Download PDF
            </a>
          </Col>
        </Row>

        <Row>
          <Col lg={10}>
            <h2>Summary</h2>
            <p>
              Data-driven Engineering Manager with over 15 years of experience in the ecommerce
              industry. Proven ability to lead and manage teams, deliver high-quality user
              experiences, and drive business results. Expertise in experimentation,
              personalization, headless CMS, front-end development, event tracking, 3rd party
              integrations and tag management.
            </p>

            <h2>Experience</h2>
            {experience.map((entry) => (
              <div key={`${entry.company}-${entry.startDate}`} className="mb-5">
                <div className="d-flex justify-content-between align-items-baseline gap-2">
                  <h3 className={`h5 ${entry.roleSubtitle ? "mb-1" : "mb-0"}`}>
                    <span className="d-inline-flex align-items-center gap-2">
                      <span>
                        <span style={{ whiteSpace: "nowrap" }}>{entry.role}</span>
                        {entry.roleSubtitle && (
                          <>
                            <span className="d-none d-md-inline"> — {entry.roleSubtitle}</span>
                            <span className="d-block d-md-none" style={{ whiteSpace: "nowrap" }}>{entry.roleSubtitle}</span>
                          </>
                        )}
                      </span>
                      <span className="text-secondary fw-normal d-none d-md-inline" style={{ whiteSpace: "nowrap" }}>| {entry.company}</span>
                    </span>
                  </h3>
                  <span className="text-secondary flex-shrink-0" style={{ fontSize: "0.75rem" }}>{entry.startDate} – {entry.endDate}</span>
                </div>
                <div className="d-md-none d-flex justify-content-between align-items-baseline mb-1 gap-2">
                  <span className="text-secondary" style={{ fontSize: "0.9rem" }}>{entry.company}</span>
                  <span className="text-secondary d-inline-flex align-items-center gap-1 flex-shrink-0" style={{ fontSize: "0.8125rem" }}>
                    <span title={WORK_STYLE_LABEL[entry.workStyle]}>{WORK_STYLE_ICON[entry.workStyle]}</span>
                    {entry.location}
                  </span>
                </div>
                <div className="text-secondary mb-2 d-none d-md-inline-flex align-items-center gap-2" style={{ fontSize: "0.8125rem" }}>
                  <span title={WORK_STYLE_LABEL[entry.workStyle]}>{WORK_STYLE_ICON[entry.workStyle]}</span>
                  {entry.location}
                </div>
                <ul className="ps-3">
                  {entry.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}

            <h2>Certifications</h2>
            <ul className="ps-3">
              {certifications.map((c) => (
                <li key={c.title}>
                  <strong>{c.title}</strong> — {c.issuer}, {c.date}
                </li>
              ))}
            </ul>

            <h2>Skills</h2>
            {Object.entries(skills).map(([group, items]) => (
              <div key={group} className="mb-3">
                <div className="fw-semibold mb-1">{group}</div>
                <div className="text-secondary">{items.join(" · ")}</div>
              </div>
            ))}

            <h2>Education</h2>
            <ul className="ps-3">
              <li>
                <strong>Duquesne University</strong> — M.S., Media Arts and Technology, Web
                Development (GPA 4.00)
              </li>
              <li>
                <strong>California University of Pennsylvania</strong> — B.S., Graphic
                Communications and Multimedia (GPA 3.944)
              </li>
              <li>
                <strong>Penn State Behrend</strong> — Electrical Engineering (GPA 3.43)
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
