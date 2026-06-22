import { and, asc, desc, eq, ilike } from "drizzle-orm";
import { db } from "../../db/index.js";
import { tags } from "../../db/schema/tags.js";
import { AppError } from "../../shared/errors/app-error.js";
import type { GetTagSchema } from "./tag.types.js";

export const CreateTag = async (
    name: string,
    slug: string
) => {

    const result = await db.insert(tags).values({
        name,
        slug
    }).returning();

    const tag = result[0];
    if (!tag){
        throw new AppError(
            "Failed to create tag",
            500
        )
    }

    return tag;
}


export const getTags = async(
    query: GetTagSchema
) => {

    const conditions = [];

    if (query.search){
        conditions.push(
            ilike(
                tags.name,
                `%${query.search}%`
            )
        )
    }

    return await db.query.tags.findMany({
        where: conditions.length > 0 ? and(...conditions): undefined,
        limit: query.limit,
        offset: (query.page-1)*query.limit,

        orderBy: query.order === "asc" ? asc(
            tags[query.sortBy]
        ): desc(tags[query.sortBy])
    })
}


export const getTag = async (
    name: string
) => {

    return await db.query.posts.findFirst({
        where: eq(
            tags.name,
            name
        )
    })
}