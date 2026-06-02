import {
    pgTable,
    serial,
    integer,
    text,
    timestamp
} from "drizzle-orm/pg-core";

export const refreshTokens = pgTable("refresh_tokens", 
    {
        id: serial("id").primaryKey(),
        
        userId: integer("user_id").notNull(),
        token: text("token").notNull(),
        expiresAt: timestamp("expires_at").notNull(),

        createdAt: timestamp("created_at").defaultNow().notNull(),
    }
)