import { Router } from "express";

import * as tagController from "./tag.controller.js";
import { validateQuery, validateParams } from "../../shared/utils/validate.middleware.js";
import { getTagQuerySchema, getTagSchema} from "./tag.validation.js";
import { authenticate } from "../../shared/middleware/auth.middleware.js";



const router = Router()

router.get("/", validateQuery(getTagQuerySchema), tagController.getTags);
router.get("/:id", validateParams(getTagSchema), tagController.getTagById);
router.delete("/:id", authenticate, validateParams(getTagSchema), tagController.deleteTag);


export default router;