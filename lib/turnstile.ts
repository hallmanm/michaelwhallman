const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstileToken(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return true;
  }
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  const res = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) return false;
  const data = (await res.json()) as { success: boolean };
  return data.success === true;
}
