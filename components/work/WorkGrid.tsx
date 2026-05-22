"use client";

import { useState } from "react";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { caseStudies, type CaseStudyCategory } from "@/lib/content/case-studies";

const CATEGORIES: CaseStudyCategory[] = ["Impact", "Business Value", "Development", "Leadership"];

export function WorkGrid() {
  const [selected, setSelected] = useState<Set<CaseStudyCategory>>(new Set(CATEGORIES));

  const allSelected = selected.size === CATEGORIES.length;
  const filtered = allSelected ? caseStudies : caseStudies.filter((cs) => selected.has(cs.category));

  function toggle(cat: CaseStudyCategory) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
        if (next.size === 0) return new Set(CATEGORIES);
      } else {
        next.add(cat);
      }
      return next;
    });
  }

  return (
    <>
      <div className="d-flex flex-wrap gap-2 mb-5">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => toggle(cat)}
            className={`work-filter-tag${selected.has(cat) ? " work-filter-tag--active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <Row className="gy-4">
        {filtered.map((cs) => (
          <Col key={cs.slug} md={6} lg={4}>
            <Link href={`/work/${cs.slug}`} className="work-card">
              <div className="work-card__meta">
                {cs.company}
                <span className="work-card__tag">{cs.category}</span>
              </div>
              <div className="work-card__title text-balance">{cs.title}</div>
              <p className="text-secondary mb-0">{cs.headline}</p>
              <div className="work-card__outcome">{cs.outcome}</div>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}
