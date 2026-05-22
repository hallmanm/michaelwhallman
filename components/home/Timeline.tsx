import { Col, Container, Row } from "react-bootstrap";
import { experience } from "@/lib/content/experience";

const MONTH_MAP: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
};

function parseDate(s: string): Date | null {
  const trimmed = s.trim();
  if (/^present$/i.test(trimmed)) return new Date();
  const m = trimmed.match(/(\w+)\s+(\d{4})/);
  if (m) return new Date(parseInt(m[2], 10), MONTH_MAP[m[1]] ?? 0, 1);
  const y = trimmed.match(/^(\d{4})$/);
  if (y) return new Date(parseInt(y[1], 10), 0, 1);
  return null;
}

function hasMonthValue(s: string): boolean {
  const trimmed = s.trim();
  if (/^present$/i.test(trimmed)) return true;
  return /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}$/.test(trimmed);
}

const roles = experience.map((e) => {
  const start = parseDate(e.startDate);
  const end = parseDate(e.endDate);
  return {
    ...e,
    start: start ?? new Date(),
    end: end ?? new Date(),
    durationValid: start !== null && end !== null && hasMonthValue(e.startDate) && hasMonthValue(e.endDate),
  };
});

function formatDuration(start: Date, end: Date): string {
  const totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (years === 0) return `${months}mo`;
  if (months === 0) return `${years}yr`;
  return `${years}yr ${months}mo`;
}

function rolesOverlap(a: typeof roles[number], b: typeof roles[number]): boolean {
  return a.start < b.end && b.start < a.end;
}

// Cards are ordered most-recent-first (left → right).
// For a role at index `idx`, the bar extends LEFT from the role's own card
// to cover any more-recent role (smaller index) whose tenure began while this
// role was still active. The right edge stays at the role's own card.
function getColumnSpan(idx: number) {
  let minIdx = idx;
  for (let j = 0; j < idx; j++) {
    if (rolesOverlap(roles[idx], roles[j])) {
      if (j < minIdx) minIdx = j;
    }
  }
  return { minIdx, span: idx - minIdx };
}

export function Timeline() {
  return (
    <section className="section bg-light border-top border-bottom" style={{ overflowX: "clip" }}>
      <Container>
        <Row className="mb-5">
          <Col md={8}>
            <span className="eyebrow">Career</span>
            <h2 className="display-headline display-5 text-balance">
              From {roles[roles.length - 1].role} to {roles[0].role}.
            </h2>
          </Col>
        </Row>
      </Container>
      <div className="timeline-scroll">
        <div className="timeline-canvas">
          <ol className="timeline-list">
            {roles.map((r) => (
              <li key={`${r.company}-${r.startDate}`} className="timeline-card">
                <div className="timeline-card__dot" />
                <div className="timeline-card__date">
                  {r.current ? r.startDate + " –" : `${r.startDate} – ${r.endDate}`}
                  {r.current && <span className="timeline-card__current">Present</span>}
                  {r.durationValid && <span className="timeline-card__duration">{formatDuration(r.start, r.end)}</span>}
                </div>
                <div className="timeline-card__role">
                  {r.role}
                  {r.roleSubtitle && <span className="timeline-card__role-sub">{r.roleSubtitle}</span>}
                </div>
                <div className="timeline-card__company">{r.company}</div>
                <div className="timeline-card__location">{r.location}</div>
              </li>
            ))}
          </ol>
          <div className="timeline-bars" aria-hidden="true">
            {roles.map((r, i) => {
              const { minIdx, span } = getColumnSpan(i);
              return (
                <div
                  key={`bar-${r.company}-${r.startDate}`}
                  className={`timeline-bar${r.current ? " timeline-bar--current" : ""}`}
                  style={{
                    top: `${i * 0.5}rem`,
                    left: `calc(${minIdx} * (18rem + 1.25rem) + 1.5rem)`,
                    width: `calc(${span} * (18rem + 1.25rem) + 18rem)`,
                  }}
                  title={`${r.role} · ${r.startDate} – ${r.endDate}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
