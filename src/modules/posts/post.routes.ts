import { Router } from "express";
import * as postController from "./post.controller.js";
import { authenticate } from "../../shared/middleware/auth.middleware.js";
import { validateQuery, validateBody } from "../../shared/utils/validate.middleware.js";
import { createPostSchema, getPostQuerySchema } from "./post.validation.js";


const router = Router();


router.post('/', authenticate, validateBody(createPostSchema), postController.createPost);
router.get('/', authenticate, validateQuery(getPostQuerySchema) ,postController.getPosts)


export default router;