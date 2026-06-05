import { Router } from "express";
import * as postController from "./post.controller.js";
import { authenticate } from "../../shared/middleware/auth.middleware.js";
import { validate } from "../../shared/utils/validate.middleware.js";
import { createPostSchema } from "./post.validation.js";


const router = Router();


router.post('/', authenticate, validate(createPostSchema), postController.createPost);


export default router;