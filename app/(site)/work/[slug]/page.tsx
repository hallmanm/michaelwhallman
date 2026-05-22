import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Col, Container, Row } from "react-bootstrap";
import matter from "gray-matter";
import { caseStudies, getCaseStudy } from "@/lib/content/case-studies";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: cs.title,
    description: cs.headline,
  };
}

async function loadMdxContent(slug: string): Promise<string | null> {
  const filePath = path.join(process.cwd(), "content", "case-studies", `${slug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const { content } = matter(raw);
    return content;
  } catch {
    return null;
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const mdxContent = await loadMdxContent(slug);

  return (
    <article>
      <section className="section pb-0">
        <Container>
          <Row className="align-items-start g-5">
            <Col lg={cs.image ? 7 : 9}>
              <span className="eyebrow">
                {cs.company} · {cs.role} · {cs.dates}
              </span>
              <h1 className="display-headline display-4 text-balance mb-4">{cs.title}</h1>
              <p className="lead text-balance">{cs.headline}</p>
              <div className="work-card__outcome mt-4">{cs.outcome}</div>
            </Col>
            {cs.image && (
              <Col lg={5} className="d-none d-lg-block">
                <Image
                  src={cs.image}
                  alt={cs.title}
                  width={800}
                  height={600}
                  className="w-100 h-auto rounded"
                  style={{ objectFit: "cover" }}
                />
              </Col>
            )}
          </Row>
        </Container>
      </section>

      {cs.demo && (
        <section className="section-tight">
          <Container>
            <Row>
              <Col lg={9}>
                {cs.demo.type === "embed" && (
                  <Link href={cs.demo.href} className="btn btn-dark">
                    Try the demo →
                  </Link>
                )}
                {cs.demo.type === "external" && (
                  <div className="d-flex gap-3 flex-wrap">
                    {cs.demo.liveUrl && (
                      <a
                        href={cs.demo.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-dark"
                      >
                        Live demo →
                      </a>
                    )}
                    <a
                      href={cs.demo.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-dark"
                    >
                      View on GitHub →
                    </a>
                  </div>
                )}
                {cs.demo.type === "archive" && (
                  <div className="alert alert-light border">
                    This project predates modern browser APIs (Flash/SWF) and is preserved as
                    screenshots only.
                  </div>
                )}
              </Col>
            </Row>
          </Container>
        </section>
      )}

      <section className="section">
        <Container>
          <Row>
            <Col lg={9}>
              {mdxContent ? (
                <div className="case-study-body">
                  <MDXRemote source={mdxContent} />
                </div>
              ) : (
                <p className="text-secondary">
                  Detailed write-up coming soon. In the meantime, see the{" "}
                  <Link href="/resume">resume</Link> for context on this role.
                </p>
              )}
            </Col>
          </Row>
        </Container>
      </section>

      <section className="section-tight bg-light border-top">
        <Container>
          <span className="eyebrow">More case studies</span>
          <Row className="gy-3 mt-2">
            {caseStudies
              .filter((other) => other.slug !== cs.slug)
              .sort(() => Math.random() - 0.5)
              .slice(0, 3)
              .map((other) => (
                <Col key={other.slug} md={4}>
                  <Link href={`/work/${other.slug}`} className="work-card">
                    <div className="work-card__meta">{other.company}</div>
                    <div className="work-card__title text-balance">{other.title}</div>
                  </Link>
                </Col>
              ))}
          </Row>
        </Container>
      </section>
    </article>
  );
}
