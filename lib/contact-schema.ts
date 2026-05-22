import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Required").max(120),
  email: z.string().email("Enter a valid email").max(200),
  company: z.string().max(120).optional().or(z.literal("")),
  message: z.string().min(10, "Tell me a bit more").max(5000),
  turnstileToken: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
