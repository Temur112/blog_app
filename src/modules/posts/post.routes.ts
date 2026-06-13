import { Router } from "express";
import * as postController from "./post.controller.js";
import { authenticate } from "../../shared/middleware/auth.middleware.js";
import { validateQuery, validateBody, validateParams } from "../../shared/utils/validate.middleware.js";
import { createPostSchema, getPostQuerySchema, postIdSchema } from "./post.validation.js";


const router = Router();


router.post('/', authenticate, validateBody(createPostSchema), postController.createPost);
router.get('/', validateQuery(getPostQuerySchema) ,postController.getPosts);
router.get('/:id', validateParams(postIdSchema), postController.getPostById);


export default router;