// @vitest-environment node
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));

vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

vi.mock("@/lib/turnstile", () => ({
  verifyTurnstileToken: vi.fn(),
}));

import { POST } from "@/app/api/contact/route";
import { verifyTurnstileToken } from "@/lib/turnstile";

const verifyMock = vi.mocked(verifyTurnstileToken);

function makeRequest(body: unknown | string) {
  const payload = typeof body === "string" ? body : JSON.stringify(body);
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
  });
}

const validBody = {
  name: "Jane Doe",
  email: "jane@example.com",
  company: "Acme",
  message: "Hello there, I'd like to chat about a role.",
  turnstileToken: "token",
};

describe("POST /api/contact", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    sendMock.mockReset();
    verifyMock.mockReset();
    verifyMock.mockResolvedValue(true);
    sendMock.mockResolvedValue({ data: { id: "msg_123" }, error: null });
    process.env.RESEND_API_KEY = "test-key";
    process.env.RESEND_FROM_EMAIL = "from@example.com";
    process.env.RESEND_TO_EMAIL = "to@example.com";
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("returns 400 on invalid JSON", async () => {
    const res = await POST(makeRequest("not-json{"));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Invalid JSON");
  });

  it("returns 400 on schema validation failure", async () => {
    const res = await POST(makeRequest({ name: "", email: "bad", message: "hi" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Validation failed");
    expect(body.details).toBeTruthy();
  });

  it("returns 400 when turnstile verification fails", async () => {
    verifyMock.mockResolvedValueOnce(false);
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Anti-spam verification failed");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns 500 when Resend env vars are missing", async () => {
    delete process.env.RESEND_API_KEY;
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toBe("Email service is not configured");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns 502 when Resend returns an error", async () => {
    sendMock.mockResolvedValueOnce({ data: null, error: { message: "boom" } });
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(502);
    const body = await res.json();
    expect(body.error).toBe("Failed to send message");
  });

  it("returns 502 when Resend throws", async () => {
    sendMock.mockRejectedValueOnce(new Error("network down"));
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(502);
  });

  it("returns 200 and dispatches the email on success", async () => {
    const res = await POST(makeRequest(validBody));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ ok: true });

    expect(sendMock).toHaveBeenCalledOnce();
    const call = sendMock.mock.calls[0][0];
    expect(call.from).toBe("from@example.com");
    expect(call.to).toBe("to@example.com");
    expect(call.replyTo).toBe("jane@example.com");
    expect(call.subject).toContain("Jane Doe");
    expect(call.subject).toContain("Acme");
    expect(call.text).toContain("Hello there");
  });

  it("escapes HTML in user-controlled fields", async () => {
    await POST(
      makeRequest({
        ...validBody,
        name: "<script>alert(1)</script>",
        message: "Click <a href='x'>here</a> to win",
      }),
    );
    const call = sendMock.mock.calls[0][0];
    expect(call.html).not.toContain("<script>alert(1)</script>");
    expect(call.html).toContain("&lt;script&gt;");
    expect(call.html).not.toContain("<a href='x'>");
    expect(call.html).toContain("&lt;a href=");
  });

  it("omits the company row when company is blank", async () => {
    await POST(makeRequest({ ...validBody, company: "" }));
    const call = sendMock.mock.calls[0][0];
    expect(call.subject).toBe("[Portfolio] Jane Doe");
    expect(call.html).not.toContain("Company");
  });
});
