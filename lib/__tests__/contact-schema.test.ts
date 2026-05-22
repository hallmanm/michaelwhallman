import { describe, it, expect } from "vitest";
import { contactSchema } from "@/lib/contact-schema";

describe("contactSchema", () => {
  const valid = {
    name: "Jane Doe",
    email: "jane@example.com",
    company: "Acme",
    message: "Hello there, I'd like to chat about a role.",
  };

  it("accepts a well-formed payload", () => {
    const result = contactSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("treats company as optional", () => {
    const { company: _company, ...rest } = valid;
    const result = contactSchema.safeParse(rest);
    expect(result.success).toBe(true);
  });

  it("accepts an empty-string company", () => {
    const result = contactSchema.safeParse({ ...valid, company: "" });
    expect(result.success).toBe(true);
  });

  it("rejects an empty name", () => {
    const result = contactSchema.safeParse({ ...valid, name: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.name).toBeTruthy();
    }
  });

  it("rejects an invalid email", () => {
    const result = contactSchema.safeParse({ ...valid, email: "not-an-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.email).toBeTruthy();
    }
  });

  it("rejects a too-short message", () => {
    const result = contactSchema.safeParse({ ...valid, message: "hi" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.message).toBeTruthy();
    }
  });

  it("rejects a too-long message", () => {
    const result = contactSchema.safeParse({ ...valid, message: "x".repeat(5001) });
    expect(result.success).toBe(false);
  });

  it("rejects a too-long name", () => {
    const result = contactSchema.safeParse({ ...valid, name: "x".repeat(121) });
    expect(result.success).toBe(false);
  });

  it("accepts an optional turnstileToken", () => {
    const result = contactSchema.safeParse({ ...valid, turnstileToken: "abc123" });
    expect(result.success).toBe(true);
  });
});
