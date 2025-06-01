import { z } from "zod";

const contactSchema = z.object({
  subject: z.string().optional(),
  email: z.string().email(),
  message: z.string().min(30),
});

export default defineEventHandler(async (event) => {
  const contactInfo = await readValidatedBody(event, body =>
    contactSchema.safeParse(body)
  );

  if (!contactInfo.success) throw contactInfo.error.issues;

  return contactInfo.data;
});
