import {
    pgTable,
    serial,
    varchar,
    timestamp,
    integer,
    primaryKey
} from "drizzle-orm/pg-core";

import { posts } from "./posts.js";
import { relations } from "drizzle-orm";


export const tags = pgTable("tags", {
    id: serial().primaryKey(),

    name: varchar("name", {
        length: 50
    }).notNull().unique(),

    slug: varchar("slug", {
        length: 50
    }),

    createdAt: timestamp("created_at").defaultNow().notNull()
});


export const postTags = pgTable("post_tags", {
    postId: integer("post_id").notNull().references(
        () => posts.id, {onDelete: "cascade"}
    ),

    tagId: integer("tag_id").notNull().references(
        () => tags.id, {onDelete: "cascade"}
    ),
}, (t) => ({
    pk: primaryKey({columns: [t.postId, t.tagId]}),
}));


export const tagsRelations = relations(
    tags,
    ({many}) => ({
        postTags: many(postTags)
    })
);


export const postTagsRelations = relations(
    postTags,
    ({ one }) => ({
        post: one(posts, {
            fields:[postTags.postId],
            references: [posts.id]
        }),

        tag: one(tags, {
            fields: [postTags.tagId],
            references: [tags.id]
        }),
    })
);


export type Tag = typeof tags.$inferSelect;