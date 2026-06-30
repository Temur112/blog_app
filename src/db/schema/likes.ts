import { 
    integer,
    timestamp,
    primaryKey,
    pgTable,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";
import { posts } from "./posts.js";
import { users } from "./users.js";


export const likes = pgTable("likes", {
    userId: integer("user_id").notNull().references(
        ()=> users.id, {onDelete: "cascade"}
    ),

    postId: integer("post_id").notNull().references(
        ()=> posts.id, {onDelete: "cascade"}
    ),

    createdAt: timestamp("created_at").notNull().defaultNow()
}, (t)=>({
    pk: primaryKey({columns: [t.userId, t.postId]}),
}));


export const likesRelations = relations(
    likes, ({one}) => ({
        user: one(users, {fields: [likes.userId], references: [users.id]}),
        post: one(posts, {fields: [likes.postId], references: [posts.id]}),
    })
);

export type Like = typeof likes.$inferSelect;
