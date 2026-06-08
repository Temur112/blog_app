import { z } from "zod";

export const createPostSchema = z.object(
    {
        title: z.string().min(3).max(255),
        content: z.string().min(1),
        published: z.boolean().optional()
    }
).strict()

export const getPostQuerySchema = z.object({
    search: z.string().optional(),
    authorId: z.coerce.number().optional(),
    published: z.coerce.boolean().optional(),

    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),

    sortBy: z.enum([
        "createdAt",
        "title"
    ]).default("createdAt"),

    order: z.enum([
        "asc",
        "desc"
    ]).default("desc")
})