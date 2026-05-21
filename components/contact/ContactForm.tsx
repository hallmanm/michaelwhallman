"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Failed to send message");
      }
      setStatus({ state: "success" });
      reset();
    } catch (err) {
      setStatus({
        state: "error",
        message: err instanceof Error ? err.message : "Something went wrong",
      });
    }
  };

  if (status.state === "success") {
    return (
      <Alert variant="success" className="mb-0">
        <strong>Thanks for reaching out.</strong> I&apos;ll reply within a couple business days.
      </Alert>
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Row className="g-3">
        <Col md={6}>
          <Form.Group controlId="contact-name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              autoComplete="name"
              isInvalid={!!errors.name}
              {...register("name")}
            />
            <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="contact-email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              autoComplete="email"
              isInvalid={!!errors.email}
              {...register("email")}
            />
            <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="contact-company">
            <Form.Label>
              Company <span className="text-secondary">(optional)</span>
            </Form.Label>
            <Form.Control
              type="text"
              autoComplete="organization"
              isInvalid={!!errors.company}
              {...register("company")}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="contact-role">
            <Form.Label>
              Role you&apos;re hiring for <span className="text-secondary">(optional)</span>
            </Form.Label>
            <Form.Control type="text" isInvalid={!!errors.role} {...register("role")} />
          </Form.Group>
        </Col>
        <Col xs={12}>
          <Form.Group controlId="contact-message">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              isInvalid={!!errors.message}
              {...register("message")}
            />
            <Form.Control.Feedback type="invalid">
              {errors.message?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        {turnstileSiteKey && (
          <Col xs={12}>
            <div
              className="cf-turnstile"
              data-sitekey={turnstileSiteKey}
              data-callback="onTurnstileSuccess"
            />
            <script
              src="https://challenges.cloudflare.com/turnstile/v0/api.js"
              async
              defer
            />
          </Col>
        )}
        <Col xs={12}>
          {status.state === "error" && (
            <Alert variant="danger" className="mb-3">
              {status.message}
            </Alert>
          )}
          <Button
            type="submit"
            variant="dark"
            size="lg"
            disabled={status.state === "submitting"}
          >
            {status.state === "submitting" ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Sending…
              </>
            ) : (
              "Send message"
            )}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
