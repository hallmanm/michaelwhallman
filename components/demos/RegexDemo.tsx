"use client";

import { useMemo, useState } from "react";
import { Form } from "react-bootstrap";

const WORD_LIMIT = 10;

function countWords(text: string): number {
  const trimmed = text.replace(/^\s+/, "");
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).filter(Boolean).length;
}

export function RegexDemo() {
  const [text, setText] = useState("");
  const count = useMemo(() => countWords(text), [text]);
  const over = count > WORD_LIMIT;

  return (
    <div>
      <Form.Group controlId="regex-input">
        <Form.Label>Type your contest entry</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Please enter your words here..."
        />
      </Form.Group>
      <div className="mt-3" style={{ color: over ? "var(--bs-danger)" : "var(--bs-secondary-color)" }}>
        {over ? (
          <>
            You&apos;ve gone over {WORD_LIMIT} words by {count - WORD_LIMIT} word
            {count - WORD_LIMIT === 1 ? "" : "s"}.
          </>
        ) : (
          <>
            {count} of {WORD_LIMIT} words
          </>
        )}
      </div>
      <div className="small text-secondary mt-2">
        For this demo, the word limit is set to {WORD_LIMIT}. The original 77kids contest used 300.
      </div>
    </div>
  );
}
