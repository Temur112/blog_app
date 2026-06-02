import type { Request, Response } from 'express';

import { registerSchema } from './auth.validation.js';
import * as authService from './auth.service.js';
import { asyncHandler } from '../../shared/utils/async-handler.js';


export const register = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {
        const response = await authService.register(req.body);
        return res.status(201).json(response);
    }
)


export const login = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {
        const response = await authService.login(req.body);
        return res.status(200).json(response);
    }
)


export const me = asyncHandler(
    async (
        req: Request,
        res: Response
    ) => {

        const user = (req as any).user;
        return res.status(200).json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
            }
        });
    }
);


export const logoutAll = asyncHandler(
    async (req: Request, res: Response) => {
        const user = (req as any).user;

        await authService.logoutAll(user.id);
        
        return res.status(200).json({
            success: true,
            message: "Logged out from all devices",
        });
    }
)
