"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Form, Row, Spinner, Toast, ToastContainer } from "react-bootstrap";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";

type ToastState =
  | { show: false }
  | { show: true; variant: "success" | "danger"; message: string };

interface ContactFormProps {
  compact?: boolean;
}

export function ContactForm({ compact = false }: ContactFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>({ show: false });
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
    setSubmitting(true);
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
      reset();
      setToast({ show: true, variant: "success", message: "Message sent. Thank you!" });
    } catch (err) {
      setToast({
        show: true,
        variant: "danger",
        message: err instanceof Error ? err.message : "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputSize = compact ? "sm" : undefined;

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Row className={compact ? "g-2" : "g-3"}>
          <Col md={6}>
            <Form.Group controlId="contact-name">
              <Form.Label className={compact ? "small" : undefined}>Name</Form.Label>
              <Form.Control
                type="text"
                size={inputSize}
                autoComplete="name"
                isInvalid={!!errors.name}
                disabled={submitting}
                {...register("name")}
              />
              <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="contact-email">
              <Form.Label className={compact ? "small" : undefined}>Email</Form.Label>
              <Form.Control
                type="email"
                size={inputSize}
                autoComplete="email"
                isInvalid={!!errors.email}
                disabled={submitting}
                {...register("email")}
              />
              <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="contact-company">
              <Form.Label className={compact ? "small" : undefined}>
                Company <span className="text-secondary">(optional)</span>
              </Form.Label>
              <Form.Control
                type="text"
                size={inputSize}
                autoComplete="organization"
                disabled={submitting}
                {...register("company")}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="contact-role">
              <Form.Label className={compact ? "small" : undefined}>
                Role <span className="text-secondary">(optional)</span>
              </Form.Label>
              <Form.Control
                type="text"
                size={inputSize}
                disabled={submitting}
                {...register("role")}
              />
            </Form.Group>
          </Col>
          <Col xs={12}>
            <Form.Group controlId="contact-message">
              <Form.Label className={compact ? "small" : undefined}>Message</Form.Label>
              <Form.Control
                as="textarea"
                size={inputSize}
                rows={compact ? 3 : 5}
                isInvalid={!!errors.message}
                disabled={submitting}
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
            <Button
              type="submit"
              variant="dark"
              size={compact ? "sm" : "lg"}
              disabled={submitting}
            >
              {submitting ? (
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

      <ToastContainer position="bottom-end" className="p-3" style={{ position: "fixed", zIndex: 1100 }}>
        <Toast
          show={toast.show}
          onClose={() => setToast({ show: false })}
          delay={5000}
          autohide
          bg={toast.show ? toast.variant : undefined}
        >
          <Toast.Body className={toast.show && toast.variant === "success" ? "text-white" : undefined}>
            {toast.show ? toast.message : null}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}
