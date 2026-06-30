import { Router } from "express";
import * as postController from "./post.controller.js";
import { authenticate } from "../../shared/middleware/auth.middleware.js";
import { validateQuery, validateBody, validateParams, validate } from "../../shared/utils/validate.middleware.js";
import { 
    createPostSchema, 
    getPostQuerySchema, 
    postIdSchema,
    postUpdateSchema
} from "./post.validation.js";
import likeRoutes from "../likes/like.routes.js";


const router = Router();


router.post('/', authenticate, validateBody(createPostSchema), postController.createPost);
router.get('/', validateQuery(getPostQuerySchema) ,postController.getPosts);
router.get('/:id', validateParams(postIdSchema), postController.getPostById);
router.patch('/:id', authenticate, validateParams(postIdSchema), validateBody(postUpdateSchema), postController.updatePost);
router.delete('/:id', authenticate, validateParams(postIdSchema), postController.deletePost)


router.use('/:postId', likeRoutes);

export default router;