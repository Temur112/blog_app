import type { CreatePostInput, GetPostQuerySchema } from "./post.types.js";
import * as postRepository from "./post.repository.js";
import { toPostResponse, toPostListResponse } from "./post.mapper.js";

export const createPost = async (
    data: CreatePostInput,
    userId: number
) => {
    const post = await postRepository.createPost({
        ...data,
        published: data.published ?? true,
        authorId: userId,
    })

    return {
        success: true,
        post: toPostResponse(post),
    }
}


export const getPosts = async (query: GetPostQuerySchema )=>{
    const posts = await postRepository.getPosts(query);

    return {
        success: true,
        posts: posts.map(toPostListResponse),
        pagination: {
            page: query.page,
            limit: query.limit
        }
    };
}