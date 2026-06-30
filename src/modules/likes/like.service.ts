import * as likeRepository from "./like.repository.js";
import * as  postRepository from "../posts/post.repository.js";

import { AppError } from "../../shared/errors/app-error.js";


export const likePost = async (
    userId: number,
    postId: number
)=> {
    const post = await postRepository.getPostById(postId);

    if (!post) throw new AppError("Post not found", 404);

    await likeRepository.createLike(userId, postId);

    const likeCount = await likeRepository.countLikes(postId);

    return {
        success: true,
        liked: true,
        likeCount
    }
}


export const unlikePost = async (
    userId: number,
    postId: number
) => {
    const post = await postRepository.getPostById(postId);

    if(!post) throw new AppError("post not found", 404);

    await likeRepository.deleteLike(userId, postId);
    const likeCount = await likeRepository.countLikes(post.id);

    return {
        success: true,
        liked: false,
        likeCount
    }
}