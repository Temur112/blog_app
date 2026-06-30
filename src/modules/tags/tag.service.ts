import * as tagRepository from './tag.repository.js';
import type { GetTagSchema } from "./tag.types.js";
import { slugify } from '../../shared/utils/slugify.js';
import { toTagResponse } from './tag.mapper.js';
import { AppError } from '../../shared/errors/app-error.js';


export const findOrCreateTag = async (
    name: string
) => {
    const tag = await tagRepository.findByName(name);

    if (tag) return tag;

    return await tagRepository.createTag(name, slugify(name));
}

export const getTags = async (
    query: GetTagSchema
) => {
    const tags = await tagRepository.getTags(query);

    return {
        success: true,
        tags: tags.map(toTagResponse),
        pagination: {
            page: query.page,
            limit: query.limit
        }
    }
}

export const getTagById = async (id: number) => {
    const tag = await tagRepository.findById(id)

    if(!tag){
        throw new AppError(
             "Tag not found", 404
        )
    }

    return {
        success: true,
        tag: toTagResponse(tag)
    }
}

export const deleteTag = async (
    id: number
) => {
    const tag = await tagRepository.deleteTag(id);
    if(tag.length === 0) throw new AppError("Tag Not found", 404);

    return{
        success: true,
        message: "Tag deleted successfully"
    }
}
