import { Router } from "express";

import * as authController from './auth.controller.js';
import { validate } from '../../shared/utils/validate.middleware.js';      
import { registerSchema, loginSchema, logoutSchema } from "./auth.validation.js";
import { authenticate } from "../../shared/middleware/auth.middleware.js";

const router = Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get('/me', authenticate, authController.me);   
router.post('/logout-all', authenticate, authController.logoutAll);
router.post('/refresh-token', authController.refreshToken);
router.post('/logout', authenticate, validate(logoutSchema), authController.logout);

export default router;