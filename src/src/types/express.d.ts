import "express";

declare global {
    namespace Express {
        interface userPayload {
            id: number;
            email: string;
            username: string;
        }

        interface Request {
            user?: userPayload;
        }
    }
}


export {};
