import type { Tag } from "../../db/schema/tags.js";

export const toTagResponse = (tag: Tag) => ({
    id: tag.id,
    name: tag.name,
    slug: tag.slug,
    createdAt: tag.createdAt
})