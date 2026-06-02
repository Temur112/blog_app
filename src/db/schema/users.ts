import {
    pgTable,
    serial,
    varchar,
    timestamp,
    integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),

    email: varchar("email", {
        length: 255,
    }).notNull().unique(),

    username: varchar("username", {
        length: 50,
    }).notNull().unique(),

    passwordHash: varchar("password_hash", {
        length: 255,
    }).notNull(),

    tokenVersion: integer("token_version").default(1).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow().notNull(),

    
})