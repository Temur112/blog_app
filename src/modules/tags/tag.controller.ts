import { asyncHandler } from "../../shared/utils/async-handler.js";
import * as tagService from "./tag.service.js";
import type { Request, Response } from "express";
import { getTagQuerySchema, getTagSchema } from "./tag.validation.js";

export const getTags = asyncHandler(async (
    req: Request,
    res: Response
) => {
    const query = getTagQuerySchema.parse(req.query);

    const result = await tagService.getTags(query);

    return res.status(200).json(result);
})

export const createTag = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {

        const tag = await tagService.findOrCreateTag(req.body.name);

        return res.status(201).json(tag);
    }
)


export const getTagById = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {
        const params = getTagSchema.parse(req.params);

        const tag = await tagService.getTagById(params.id);

        return res.status(200).json(tag)
    }
)


export const deleteTag = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {
        const { id } = getTagSchema.parse(req.params);

        return res.status(200).json(await tagService.deleteTag(id));
    }
)
