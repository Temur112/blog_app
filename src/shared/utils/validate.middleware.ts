import type { Request, Response, NextFunction } from 'express';

import { AppError } from '../errors/app-error.js';
import type { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        return next(
            new AppError(
                result.error.message,
                422
            )
        );
    }

    req.body = result.data;
    next();

}