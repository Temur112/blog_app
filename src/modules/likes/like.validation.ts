import z from "zod";

export const postIdParamSchema = z.object({
    postId: z.coerce.number().positive(),
}).strict();