import type { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/app-error.js";
import {verifyToken} from "../services/jwt.service.js";
import { getById } from "../../modules/auth/auth.repository.js";


export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return next(new AppError("Unauthorized", 401));
    }

    const [ ,token] = authHeader.split(" ");

    if (!token) {
        return next(new AppError("Unauthorized", 401));
    }

    const payload = verifyToken(token);

    const user = await getById(payload.userId);

    if (!user) {
        // console.log("User not found for payload:", payload);
        return next(new AppError("Unauthorized", 401));
    }

    if (user.tokenVersion !== payload.tokenVersion) {
        // console.log("Token version mismatch for user:", user);
        return next(new AppError("Unauthorized", 401));
    }

    (req as any).user = {
        id: user.id,
        email: user.email,
        username: user.username,
    };

    // console.log("Authenticated user with payload:", payload);

    next();
}