import { z } from "zod";
import { createPostSchema, getPostQuerySchema, postIdSchema } from "./post.validation.js";

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type GetPostQuerySchema = z.infer<typeof getPostQuerySchema>;
export type GetPostById = z.infer<typeof postIdSchema>;


