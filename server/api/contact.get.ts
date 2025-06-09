import { db } from '~/server/db';
import { contacts } from '~/server/db/schema';

//Funktionstest db
export default defineEventHandler(async () => {
  const allContacts = await db.select().from(contacts);
  return allContacts;
});