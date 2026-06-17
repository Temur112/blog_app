import type { CreatePostInput, GetPostQuerySchema, UpdatePostInput } from "./post.types.js";
import * as postRepository from "./post.repository.js";
import { toPostResponse, toPostListResponse } from "./post.mapper.js";
import { AppError } from "../../shared/errors/app-error.js";

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

export const getPostById = async (
    id:number
) => {
    const post = await postRepository.getPostById(id);

    if(!post) {
        throw new AppError(
            "Post not found",
            404
        )
    };

    return {
        success: true,
        post: toPostResponse(post)
    };
}


export const updatePost = async (
    id: number,
    data: UpdatePostInput,
    userId: number
) => {
    const existingPost = await postRepository.getPostById(id);


    if (!existingPost) {
        throw new AppError(
            "Post Not found",
            404
        )
    }

    if (existingPost.author.id !== userId) {
        throw new AppError(
            "Forbidden",
            403
        )
    }


    const updatedPost = await postRepository.updatePost(id, data);

    if (!updatedPost) {
        throw new AppError(
            "Failed to update",
            500
        );
    }

    return {
        success: true,
        post: toPostResponse(updatedPost)
    };
}


export const deletePost = async (
    id: number,
    userId: number
) => {
    const post = await postRepository.getPostById(id);

    if(!post){
        throw new AppError(
            "Post not found",
            404
        )
    }

    if (post.author.id !== userId ) {
        throw new AppError(
            "Forbidden",
            403
        )
    }


    await postRepository.deletePost(id);

    return {
        success: true,
        message: "Post deleted successfully"
    }
}
