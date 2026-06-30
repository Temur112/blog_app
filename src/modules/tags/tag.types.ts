import z from "zod";

import { getTagQuerySchema, createTagSchema, getTagSchema } from "./tag.validation.js";


export type GetTagSchema = z.infer<typeof getTagQuerySchema>;
export type CreateTagSchema = z.infer<typeof createTagSchema>;
export type TagIdSchema = z.infer<typeof getTagSchema>;
