import { Col, Container, Row } from "react-bootstrap";
import { siteConfig } from "@/lib/site-config";
import { experience } from "@/lib/content/experience";
import { certifications } from "@/lib/content/awards";

export const metadata = {
  title: "Resume",
  description: `Resume of ${siteConfig.name}.`,
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
              <div key={`${entry.company}-${entry.dates}`} className="mb-4">
                <div className="d-flex justify-content-between align-items-baseline flex-wrap">
                  <h3 className="h5 mb-1">
                    {entry.role} <span className="text-secondary fw-normal">— {entry.company}</span>
                  </h3>
                  <span className="text-secondary small">{entry.dates}</span>
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
