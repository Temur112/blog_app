import type { CreatePostInput } from "./post.types.js";
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


export const getPosts = async ()=>{
    const posts = await postRepository.getPosts();

    return posts;
}