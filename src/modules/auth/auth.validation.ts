import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email(),
    username: z.string().min(3).max(50),
    password: z.string().min(8).max(255),
    confirmPassword: z.string().min(8).max(255),
}).strict().refine(
    (data) => data.password === data.confirmPassword,
    {
        message: "Password don't match",
        path: ['confirmPassword'],
    }
)

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1).max(255)
}).strict()


export const refreshTokenSchema = z.object({
    refreshToken: z.string().min(1),
}).strict()

export const logoutSchema = z.object({
    refreshToken: z.string().min(1),
}).strict()