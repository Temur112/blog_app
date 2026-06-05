import { db } from "../../db/index.js";
import { posts } from "../../db/schema/posts.js";
import { AppError } from "../../shared/errors/app-error.js";


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


export const getPosts = async () => {
    const posts = await db.query.posts.findMany({
        with: {
            author: true
        }
    });

    return posts;
}