import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { verifyTurnstileToken } from "@/lib/turnstile";

describe("verifyTurnstileToken", () => {
  const originalSecret = process.env.TURNSTILE_SECRET_KEY;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    if (originalSecret === undefined) {
      delete process.env.TURNSTILE_SECRET_KEY;
    } else {
      process.env.TURNSTILE_SECRET_KEY = originalSecret;
    }
  });

  it("bypasses verification when secret is not configured", async () => {
    delete process.env.TURNSTILE_SECRET_KEY;
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    await expect(verifyTurnstileToken("anything")).resolves.toBe(true);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("rejects when secret is set but no token is provided", async () => {
    process.env.TURNSTILE_SECRET_KEY = "secret";
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    await expect(verifyTurnstileToken(undefined)).resolves.toBe(false);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("returns true when Cloudflare reports success", async () => {
    process.env.TURNSTILE_SECRET_KEY = "secret";
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    );
    await expect(verifyTurnstileToken("token")).resolves.toBe(true);
  });

  it("returns false when Cloudflare reports failure", async () => {
    process.env.TURNSTILE_SECRET_KEY = "secret";
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ success: false }), { status: 200 }),
    );
    await expect(verifyTurnstileToken("token")).resolves.toBe(false);
  });

  it("returns false when Cloudflare responds with non-2xx", async () => {
    process.env.TURNSTILE_SECRET_KEY = "secret";
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response("nope", { status: 500 }),
    );
    await expect(verifyTurnstileToken("token")).resolves.toBe(false);
  });

  it("posts the secret and response to the verify endpoint", async () => {
    process.env.TURNSTILE_SECRET_KEY = "my-secret";
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    );
    await verifyTurnstileToken("my-token");
    expect(fetchSpy).toHaveBeenCalledOnce();
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toContain("turnstile/v0/siteverify");
    const body = (init?.body as URLSearchParams) ?? new URLSearchParams();
    expect(body.toString()).toContain("secret=my-secret");
    expect(body.toString()).toContain("response=my-token");
  });
});
