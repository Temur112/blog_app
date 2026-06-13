import { db } from "../../db/index.js";
import { posts } from "../../db/schema/posts.js";
import { AppError } from "../../shared/errors/app-error.js";
import {
    and, like, eq, asc, desc,
    ilike
} from "drizzle-orm";
import type { GetPostQuerySchema } from "./post.types.js";


export const createPost = async(
    data: {
        title: string,
        content: string,
        published: boolean,
        authorId: number
    }
) => {
    const result = await db.insert(posts).values(data).returning();

    const post = result[0];
    if (!post) {
        throw new AppError(
            "Failed to create post",
            500
        )
    }
    return post;
}


export const getPosts = async (query: GetPostQuerySchema) => {
    const conditions = [];

    if (query.search){
        conditions.push(
            ilike(
                posts.title,
                `%${query.search}%`
            )
        );
    }
    
    if (query.authorId){
        conditions.push(
            eq(
                posts.authorId,
                query.authorId
            )
        );
    }

    if (query.published !== undefined) {
        conditions.push(
            eq(
                posts.published,
                query.published
            )
        )
    }

    

    return db.query.posts.findMany({
        where: conditions.length > 0 ? and(...conditions): undefined,
        with: {author: true},
        limit: query.limit,
        offset: (query.page-1)*query.limit,
        orderBy: query.order == "asc" ? asc(
            posts[
                query.sortBy
            ]
        ): desc(
            posts[query.sortBy]
        ),
    })
}



export const getPostById = async (id: number) => {
    return await db.query.posts.findFirst({
        where: eq(posts.id, id),
        with: {
            author: true
        }
    })
}