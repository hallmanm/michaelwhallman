"use client";

import { useMemo, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";

type Product = { id: string; name: string; price: number; tags: string[] };
type CustomerProfile = {
  segment: "new" | "loyal" | "lapsed";
  affinities: string[];
  geo: "US" | "CA" | "EU";
};

const CATALOG: Product[] = [
  { id: "P-001", name: "Slim straight jeans", price: 59, tags: ["denim", "men", "core"] },
  { id: "P-002", name: "Ribbed crop tee", price: 24, tags: ["tops", "women", "trend"] },
  { id: "P-003", name: "Logo joggers", price: 49, tags: ["bottoms", "men", "athleisure"] },
  { id: "P-004", name: "Wide-leg cargo", price: 69, tags: ["bottoms", "women", "trend"] },
  { id: "P-005", name: "Oversize hoodie", price: 64, tags: ["outerwear", "unisex", "core"] },
  { id: "P-006", name: "Striped polo", price: 39, tags: ["tops", "men", "core"] },
  { id: "P-007", name: "Bralette set", price: 34, tags: ["intimates", "women", "trend"] },
  { id: "P-008", name: "Tech fleece pant", price: 79, tags: ["bottoms", "unisex", "athleisure"] },
];

function rankForProfile(catalog: Product[], profile: CustomerProfile): Product[] {
  return [...catalog]
    .map((p) => {
      let score = 0;
      for (const a of profile.affinities) if (p.tags.includes(a)) score += 3;
      if (profile.segment === "new" && p.tags.includes("core")) score += 2;
      if (profile.segment === "loyal" && p.tags.includes("trend")) score += 2;
      if (profile.segment === "lapsed" && p.price < 50) score += 1;
      return { product: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((r) => r.product);
}

const ALL_TAGS = ["denim", "tops", "bottoms", "outerwear", "athleisure", "trend"];

export function PersonalizationDemo() {
  const [segment, setSegment] = useState<CustomerProfile["segment"]>("loyal");
  const [affinities, setAffinities] = useState<string[]>(["denim", "trend"]);

  const products = useMemo(
    () =>
      rankForProfile(CATALOG, {
        segment,
        affinities,
        geo: "US",
      }),
    [segment, affinities],
  );

  function toggleTag(tag: string) {
    setAffinities((curr) => (curr.includes(tag) ? curr.filter((t) => t !== tag) : [...curr, tag]));
  }

  return (
    <div>
      <Row className="g-3 mb-4">
        <Col md={4}>
          <Form.Group>
            <Form.Label className="small">Customer segment</Form.Label>
            <Form.Select value={segment} onChange={(e) => setSegment(e.target.value as typeof segment)}>
              <option value="new">New</option>
              <option value="loyal">Loyal</option>
              <option value="lapsed">Lapsed</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={8}>
          <div className="small mb-2">Customer affinities</div>
          <div className="d-flex flex-wrap gap-2">
            {ALL_TAGS.map((tag) => {
              const active = affinities.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`btn btn-sm ${active ? "btn-dark" : "btn-outline-dark"}`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </Col>
      </Row>
      <div className="small text-secondary mb-3">
        Ranked recommendations for this synthetic Customer Profile:
      </div>
      <Row className="g-3">
        {products.map((p) => (
          <Col key={p.id} sm={6} md={3}>
            <Card>
              <Card.Body>
                <div className="small text-secondary">{p.id}</div>
                <div className="fw-semibold mt-1">{p.name}</div>
                <div className="text-secondary small mt-1">${p.price}</div>
                <div className="d-flex flex-wrap gap-1 mt-2">
                  {p.tags.map((t) => (
                    <span key={t} className="badge bg-light text-dark border">
                      {t}
                    </span>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="small text-secondary mt-4">
        A simplified port of the AEO personalization framework — toggle the profile inputs and
        watch the recommended set re-rank in real time. The real system ran on Adobe Target,
        Velocity, and Google Cloud Platform.
      </div>
    </div>
  );
}
