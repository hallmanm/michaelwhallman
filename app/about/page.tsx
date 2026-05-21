import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { siteConfig } from "@/lib/site-config";
import { experience } from "@/lib/content/experience";
import { awards, certifications } from "@/lib/content/awards";

export const metadata = {
  title: "About",
  description: `Long-form bio of ${siteConfig.name}.`,
};

const education = [
  {
    school: "Duquesne University",
    location: "Pittsburgh, PA",
    degree: "M.S., Media Arts and Technology — Web Development",
    detail: "GPA: 4.00",
  },
  {
    school: "California University of Pennsylvania",
    location: "California, PA",
    degree: "B.S., Graphic Communications and Multimedia",
    detail: "GPA: 3.944",
  },
  {
    school: "Penn State Behrend",
    location: "Erie, PA",
    degree: "Electrical Engineering",
    detail: "GPA: 3.43",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="section">
        <Container>
          <Row>
            <Col lg={9}>
              <span className="eyebrow">About</span>
              <h1 className="display-headline display-4 text-balance mb-4">
                A data-driven engineering leader who builds the systems that businesses actually
                run on.
              </h1>
              <p className="lead text-balance">
                I&apos;ve spent 15 years in ecommerce engineering — most of it at American Eagle
                Outfitters, where I grew from a Creative Developer into an Engineering Program
                Lead overseeing AB testing across six product teams. Today I lead Experimentation
                at Estée Lauder, where we&apos;re building a server-side platform in Elixir that
                lets every team run experiments across our properties.
              </p>
              <p>
                I care most about <strong>measurable business impact</strong>. The work I&apos;m
                proudest of compounds — a personalization framework that ships $12M in revenue
                with zero engineering touch; an experimentation program that grows from one
                engineer to 25 and delivers $130M+ in annual lift; a CMS migration that turns a
                three-month release cycle into a real-time one.
              </p>
              <p>
                I&apos;ve managed teams from a single direct report to a fully staffed agile org
                of 30+ contractors and FTEs. I&apos;ve built an internship program that HR
                adopted as a template. I&apos;ve negotiated with vendors, set roadmaps with
                executives, and shipped code under deadline.
              </p>
              <p>
                Based in Pittsburgh, PA. Looking for management and director-level roles where
                experimentation, personalization, or platform engineering meaningfully move the
                business.{" "}
                <Link href="/contact">Get in touch</Link>.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section bg-light border-top border-bottom">
        <Container>
          <Row className="mb-4">
            <Col md={8}>
              <span className="eyebrow">Career</span>
              <h2 className="display-headline display-5">Experience</h2>
            </Col>
          </Row>
          <Row>
            <Col lg={10}>
              {experience.map((entry) => (
                <div key={`${entry.company}-${entry.dates}`} className="mb-5">
                  <div className="d-flex justify-content-between align-items-baseline flex-wrap">
                    <h3 className="h4 mb-1">{entry.role}</h3>
                    <span className="text-secondary small">{entry.dates}</span>
                  </div>
                  <div className="text-secondary mb-3">
                    {entry.company} · {entry.location}
                  </div>
                  <ul className="ps-3">
                    {entry.highlights.map((h, i) => (
                      <li key={i} className="mb-2">
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section">
        <Container>
          <Row className="mb-4">
            <Col md={8}>
              <span className="eyebrow">Recognition</span>
              <h2 className="display-headline display-5">Awards & certifications</h2>
            </Col>
          </Row>
          <Row className="gy-3 mb-5">
            {awards.map((award, i) => (
              <Col key={`${award.title}-${i}`} md={6}>
                <div className="fw-semibold">{award.title}</div>
                <div className="text-secondary">
                  {award.detail} {award.date && `· ${award.date}`}
                </div>
              </Col>
            ))}
          </Row>
          <div className="eyebrow">Certifications</div>
          <Row className="gy-2 mt-1">
            {certifications.map((cert) => (
              <Col key={cert.title} md={6}>
                <div className="fw-semibold">{cert.title}</div>
                <div className="text-secondary small">
                  {cert.issuer} · {cert.date}
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="section bg-light border-top">
        <Container>
          <Row className="mb-4">
            <Col md={8}>
              <span className="eyebrow">Education</span>
              <h2 className="display-headline display-5">Education</h2>
            </Col>
          </Row>
          <Row className="gy-3">
            {education.map((e) => (
              <Col key={e.school} md={4}>
                <div className="fw-semibold">{e.school}</div>
                <div className="text-secondary small mb-1">{e.location}</div>
                <div>{e.degree}</div>
                <div className="text-secondary small">{e.detail}</div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}
