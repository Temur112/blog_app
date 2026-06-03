import jwt from "jsonwebtoken";
import { AppError } from "../errors/app-error.js";

export type JwtPayload = {
    userId: number;
    tokenVersion: number;
}

export const createAccessToken = (
    payload: JwtPayload
) => {
    return jwt.sign(
        payload,
        process.env.JWT_SECRET!,
        {
            expiresIn: '15m'
        }
    );
};

export const createRefreshToken = (
    payload: JwtPayload
)=> {
    return jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET!,
        {
            expiresIn: '17d'
        }
    );
};


export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as JwtPayload;   
}



export const verifyToken = (token: string) => {
    try {        
        return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    } catch (err) {
        throw new AppError("Invalid token", 401);
    }

};

