import type { Post } from "../../db/schema/posts.js";

export const toPostResponse = (
    post: Post
) => ({
    id: post.id,
    title: post.title,
    content: post.content,
    published: post.published,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt
})

export const toPostListResponse = (
    post: any
) => ({
    id: post.id,
    title: post.title,
    content: post.content,
    published: post.published,
    createdAt: post.createdAt,

    author: {
        id: post.author.id,
        username: post.author.username
    }
})