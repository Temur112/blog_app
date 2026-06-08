import { z } from "zod";
import { createPostSchema, getPostQuerySchema } from "./post.validation.js";

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type GetPostQuerySchema = z.infer<typeof getPostQuerySchema>;


