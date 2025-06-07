import { z } from "zod";
import { db } from '~/server/db';
import { contacts } from '~/server/db/schema';

const contactSchema = z.object({
  subject: z.string().optional(),
  email: z.string().email(),
  message: z.string().min(30),
});

export default defineEventHandler(async (event) => {
  // const contactInfo = await readValidatedBody(event, body =>
  //   contactSchema.safeParse(body)
  // );
  // if (!contactInfo.success) throw contactInfo.error.issues;
  // return contactInfo.data;
  
  const body = await readBody(event);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    throw createError({ statusCode: 400, message: 'Validation failed', data: parsed.error.issues });

  }

  const contactInfo = parsed.data;

  // await db.insert(contacts).values({
  //   subject: contactInfo.subject ?? null,
  //   email: contactInfo.email,
  //   message: contactInfo.message,
  // });

  insertContactFormValues(contactInfo);

  return { success: true };
});


async function insertContactFormValues(contactData: any): Promise<void> {
  await db.insert(contacts).values({
    subject: contactData.subject ?? null,
    email: contactData.email,
    message: contactData.message,
  });
}