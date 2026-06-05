import type { Request, Response } from "express";
import { getAuthenticatedUser } from "../../shared/utils/auth.js";
import * as postService from "./post.service.js";
import { asyncHandler } from "../../shared/utils/async-handler.js";
 


export const createPost = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {
        const user = getAuthenticatedUser(req);
        const response = await postService.createPost(req.body, user.id);

        return res.status(201).json(response);

    }
)


export const getPosts = async () => asyncHandler (
    async (
        req: Request,
        res: Response
    ) => {
        const posts = await postService.getPosts();

        return res.status(200).json(posts)
    }
)