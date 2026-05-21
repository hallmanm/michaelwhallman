"use client";

import { useMemo, useState } from "react";
import { Badge, Form, Table } from "react-bootstrap";

type Activity = {
  id: string;
  name: string;
  variant: "Control" | "A" | "B" | "C";
  page: string;
  audience: string;
  status: "Live" | "Draft" | "Paused";
};

const ACTIVITIES: Activity[] = [
  { id: "EXP-1041", name: "PDP — Recommended bundle", variant: "A", page: "/p/*", audience: "All", status: "Live" },
  { id: "EXP-1042", name: "Cart upsell — accessories", variant: "B", page: "/cart", audience: "Returning", status: "Live" },
  { id: "EXP-1051", name: "Home hero copy test", variant: "Control", page: "/", audience: "Mobile", status: "Paused" },
  { id: "EXP-1062", name: "Search relevance reorder", variant: "A", page: "/search", audience: "All", status: "Live" },
  { id: "EXP-1063", name: "Checkout shipping copy", variant: "B", page: "/checkout/shipping", audience: "US", status: "Draft" },
  { id: "EXP-1071", name: "Email signup nudge", variant: "C", page: "/", audience: "First-time visitors", status: "Live" },
];

const STATUSES = ["All", "Live", "Draft", "Paused"] as const;

export function ExperimentVisibilityDemo() {
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("All");
  const [filter, setFilter] = useState("");

  const filtered = useMemo(
    () =>
      ACTIVITIES.filter((a) => (status === "All" ? true : a.status === status))
        .filter((a) =>
          filter
            ? `${a.id} ${a.name} ${a.page} ${a.audience}`.toLowerCase().includes(filter.toLowerCase())
            : true,
        ),
    [status, filter],
  );

  return (
    <div>
      <div className="d-flex flex-wrap gap-3 align-items-end mb-3">
        <Form.Group style={{ minWidth: 220 }}>
          <Form.Label className="small">Filter</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search by ID, page, audience…"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="small">Status</Form.Label>
          <Form.Select value={status} onChange={(e) => setStatus(e.target.value as typeof status)}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </div>
      <Table responsive hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Activity</th>
            <th>Variant</th>
            <th>Page</th>
            <th>Audience</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((a) => (
            <tr key={a.id}>
              <td className="text-secondary small">{a.id}</td>
              <td>{a.name}</td>
              <td>
                <Badge bg="dark">{a.variant}</Badge>
              </td>
              <td className="text-secondary small">{a.page}</td>
              <td className="text-secondary small">{a.audience}</td>
              <td>
                <Badge bg={a.status === "Live" ? "success" : a.status === "Paused" ? "warning" : "secondary"}>
                  {a.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="small text-secondary">
        A simplified recreation of the Adobe Target debugger pane I built at AEO. The original
        pulled live activity data from the Target client; this version uses static fixtures.
      </div>
    </div>
  );
}
