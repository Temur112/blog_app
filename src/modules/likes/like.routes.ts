import { Router } from "express";
import * as likeController from "./like.controller.js";
import { authenticate } from "../../shared/middleware/auth.middleware.js";
import { validateParams } from "../../shared/utils/validate.middleware.js";
import { postIdParamSchema } from "./like.validation.js";


const router = Router({mergeParams: true});



router.post("/", authenticate, validateParams(postIdParamSchema), likeController.likePost);
router.delete("/", authenticate, validateParams(postIdParamSchema), likeController.unlikePost);


export default router;

