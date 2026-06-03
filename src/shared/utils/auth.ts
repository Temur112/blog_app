import type { Request } from "express";
import { AppError } from "../errors/app-error.js";


export const getAuthenticatedUser = (req: Request) => {
    if (!req.user) {
        throw new AppError(
            "Unauthorized",
            401
        )
    }

    return req.user;
}