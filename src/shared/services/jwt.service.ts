import jwt from "jsonwebtoken";

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
            expiresIn: '25m'
        }
    );
};


export const verifyToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
}

