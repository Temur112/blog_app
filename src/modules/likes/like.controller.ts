import { asyncHandler } from "../../shared/utils/async-handler.js";
import { getAuthenticatedUser } from "../../shared/utils/auth.js";
import * as likeService from "./like.service.js";
import type { Request, Response } from "express";
import { postIdParamSchema } from "./like.validation.js";


export const likePost = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {
        const user = getAuthenticatedUser(req);

        const { postId } = postIdParamSchema.parse(req.params);

        return res.status(200).json(await likeService.likePost(user.id, postId));
    }
)


export const unlikePost = asyncHandler(
    async (
        req: Request,
        res: Response

    ) => {
        const user = getAuthenticatedUser(req);

        const { postId } = postIdParamSchema.parse(req.params);
        return res.status(200).json(await likeService.unlikePost(user.id, postId));
    }
)
