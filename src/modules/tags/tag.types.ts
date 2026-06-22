import z from "zod";

import { getTagQuerySchema, createTagSchema } from "./tag.validation.js";


export type GetTagSchema = z.infer<typeof getTagQuerySchema>;
export type CreateTagSchema = z.infer<typeof createTagSchema>;