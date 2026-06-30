import z from "zod";


export const createTagSchema = z.object({
    name: z.string().min(2).max(50),
}).strict();

export const getTagSchema = z.object({
    id: z.coerce.number().positive(),
}).strict();

export const getTagQuerySchema = z.object({
    search: z.string().optional(),

    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(10),

    sortBy: z.enum([
        "createdAt",
        "name"
    ]).default("createdAt"),

    order: z.enum([
        "asc",
        "desc"
    ]).default("desc"),
}).strict();




