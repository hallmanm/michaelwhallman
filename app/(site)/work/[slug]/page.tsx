import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Col, Container, Row } from "react-bootstrap";
import matter from "gray-matter";
import rehypePrettyCode, { type Options as RehypePrettyCodeOptions } from "rehype-pretty-code";
import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { caseStudies, getCaseStudy } from "@/lib/content/case-studies";
import { TechniqueHighlight } from "@/components/work/TechniqueHighlight";

const GITHUB_REPO = "https://github.com/hallmanm/michaelwhallman";
const DEMO_SRC_PREFIX = "public/demo-src/";
const GITHUB_ICON_SVG_PATH =
  "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z";

const prettyCodeOptions: RehypePrettyCodeOptions = {
  theme: "github-dark-dimmed",
  keepBackground: true,
  defaultLang: { block: "javascript", inline: "plaintext" },
  onVisitTitle(element) {
    // Parse "<file path>#L<start>(-L<end>)" out of the title.
    const child = element.children[0];
    if (!child || child.type !== "text") return;

    const match = child.value.match(/^(.+?)#L(\d+)(?:-L(\d+))?$/);
    if (!match) return;

    const [, filePath, startLine, endLine] = match;
    const anchor = endLine ? `#L${startLine}-L${endLine}` : `#L${startLine}`;
    const href = `${GITHUB_REPO}/blob/main/${DEMO_SRC_PREFIX}${filePath}${anchor}`;
    const label = endLine
      ? `View source on GitHub (lines ${startLine}-${endLine})`
      : `View source on GitHub (line ${startLine})`;

    // Strip the line-range suffix from the visible title text.
    child.value = filePath;

    // Append a GitHub icon link inside the title chip.
    element.children.push({
      type: "element",
      tagName: "a",
      properties: {
        href,
        target: "_blank",
        rel: "noopener noreferrer",
        className: ["code-source-link"],
        "aria-label": label,
        title: label,
      },
      children: [
        {
          type: "element",
          tagName: "svg",
          properties: {
            xmlns: "http://www.w3.org/2000/svg",
            width: 14,
            height: 14,
            viewBox: "0 0 24 24",
            fill: "currentColor",
            "aria-hidden": "true",
          },
          children: [
            {
              type: "element",
              tagName: "path",
              properties: { d: GITHUB_ICON_SVG_PATH },
              children: [],
            },
          ],
        },
      ],
    });
  },
};

const mdxOptions: MDXRemoteProps["options"] = {
  mdxOptions: {
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
  },
};

const mdxComponents = { TechniqueHighlight };

const HIGHLIGHTS_HEADING = "## Technical highlights";

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

type LoadedCaseStudy = {
  storyContent: string | null;
  highlightsContent: string | null;
  pullQuote: string | null;
};

async function loadCaseStudyContent(slug: string): Promise<LoadedCaseStudy> {
  const filePath = path.join(process.cwd(), "content", "case-studies", `${slug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const { content, data } = matter(raw);
    const pullQuote = typeof data.pullQuote === "string" ? data.pullQuote : null;

    const splitIdx = content.indexOf(HIGHLIGHTS_HEADING);
    if (splitIdx === -1) {
      return { storyContent: content, highlightsContent: null, pullQuote };
    }

    const storyContent = content.slice(0, splitIdx).trim();
    const highlightsContent = content.slice(splitIdx + HIGHLIGHTS_HEADING.length).trim();
    return { storyContent, highlightsContent, pullQuote };
  } catch {
    return { storyContent: null, highlightsContent: null, pullQuote: null };
  }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const { storyContent, highlightsContent, pullQuote } = await loadCaseStudyContent(slug);

  return (
    <article>
      {/* 1. Hero */}
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
              {cs.tech && cs.tech.length > 0 && (
                <div className="tech-pills">
                  {cs.tech.map((t) => (
                    <span key={t} className="tech-pill">{t}</span>
                  ))}
                </div>
              )}
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

      {/* 2. Demo CTA */}
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

      {/* 3. Impact stats — only when defined in case-studies.ts */}
      {cs.impactStats && cs.impactStats.length > 0 && (
        <section className="case-study-impact">
          <Container>
            <Row className="align-items-end mb-3">
              <Col>
                <span className="eyebrow">Impact</span>
              </Col>
            </Row>
            <Row className="gy-4">
              {cs.impactStats.map((stat) => (
                <Col key={stat.label} xs={6} md={3}>
                  <dl className="impact-stat">
                    <dd className="impact-stat__value">{stat.value}</dd>
                    <dt className="impact-stat__label">{stat.label}</dt>
                  </dl>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      )}

      {/* 4. Story — Problem + Approach prose from MDX */}
      {storyContent ? (
        <section className="case-study-story">
          <Container>
            <Row>
              <Col lg={9}>
                <div className="case-study-body">
                  <MDXRemote source={storyContent} options={mdxOptions} />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      ) : (
        <section className="case-study-story">
          <Container>
            <Row>
              <Col lg={9}>
                <p className="text-secondary">
                  Detailed write-up coming soon. In the meantime, see the{" "}
                  <Link href="/resume">resume</Link> for context on this role.
                </p>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* 5. Pull quote — only when defined in frontmatter */}
      {pullQuote && (
        <section className="case-study-pullquote">
          <Container>
            <Row>
              <Col lg={9}>
                <span className="eyebrow mb-3 d-block">Reflection</span>
                <blockquote>
                  <MDXRemote source={pullQuote} options={mdxOptions} />
                </blockquote>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* 6. Code & Architecture — dark surface */}
      {highlightsContent && (
        <section className="case-study-highlights">
          <Container>
            <Row>
              <Col lg={9}>
                <span className="eyebrow">Code &amp; Architecture</span>
                <h2 className="display-headline display-5 text-balance">
                  Technical highlights
                </h2>
                <div className="case-study-body">
                  <MDXRemote source={highlightsContent} options={mdxOptions} components={mdxComponents} />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      )}

      {/* 7. Related case studies */}
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
                    <h3 className="work-card__title text-balance">{other.title}</h3>
                  </Link>
                </Col>
              ))}
          </Row>
        </Container>
      </section>
    </article>
  );
}
