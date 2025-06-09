import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const contacts = sqliteTable("contacts", {
    id: int().primaryKey({ autoIncrement: true}),
    subject: text(),
    email: text().notNull(),
    message: text().notNull(),

});