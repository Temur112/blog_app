import {
    pgTable,
    serial,
    varchar,
    integer,
    text,
    timestamp,
    boolean
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { users } from "./users.js";


export const posts = pgTable("posts", {
    id: serial("id").primaryKey(),

    title: varchar("title", {
        length: 500,
    }).notNull(),

    content: text("content").notNull(),

    authorId: integer("author_id").notNull().references(()=>users.id),

    published: boolean("published").default(true).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const postsRelations = relations(
    posts,
    ({ one }) => ({
        author: one(users, {
            fields: [posts.authorId],
            references: [users.id],
        })
    })
)

export type Post = typeof posts.$inferSelect;
