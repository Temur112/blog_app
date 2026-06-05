import { z } from "zod";
import { createPostSchema } from "./post.validation.js";

export type CreatePostInput = z.infer<typeof createPostSchema>;


