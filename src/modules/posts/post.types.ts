import { z } from "zod";
import { createPostSchema, getPostQuerySchema, postIdSchema, postUpdateSchema } from "./post.validation.js";

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type GetPostQuerySchema = z.infer<typeof getPostQuerySchema>;
export type GetPostById = z.infer<typeof postIdSchema>;
export type UpdatePostInput = z.infer<typeof postUpdateSchema>;


