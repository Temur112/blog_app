import type { Request, Response } from "express";
import { getAuthenticatedUser } from "../../shared/utils/auth.js";
import * as postService from "./post.service.js";
import { asyncHandler } from "../../shared/utils/async-handler.js";
import type { GetPostQuerySchema } from "./post.types.js";
import { getPostQuerySchema, postIdSchema, postUpdateSchema } from "./post.validation.js";
 


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


export const getPosts = asyncHandler (
    async (
        req: Request,
        res: Response
    ) => {
        const query = getPostQuerySchema.parse(req.query);
        const posts = await postService.getPosts(query);

        return res.status(200).json(posts)
    }
)

export const getPostById = asyncHandler (
    async (
        req: Request,
        res: Response
    ) => {
        const params = postIdSchema.parse(req.params);

        const response = await postService.getPostById(params.id);


        return res.status(200).json(
            response
        )

    }
)


export const updatePost = asyncHandler (
    async (
        req: Request,
        res: Response,
    ) => {
        const user = getAuthenticatedUser(req);

        const params = postIdSchema.parse(req.params);
        const response = await postService.updatePost(params.id, req.body, user.id);


        return res.status(200).json(response)
    }
)

export const deletePost = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {
        const user = getAuthenticatedUser(req);
        const params = postIdSchema.parse(req.params);

        const response =  await postService.deletePost(params.id, user.id)


        return res.status(200).json(response);
    }
)