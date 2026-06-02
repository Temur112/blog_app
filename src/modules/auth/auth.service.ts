import type { RegisterInput, LoginInput } from './auth.types.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as authRepository from './auth.repository.js';
import { AppError } from '../../shared/errors/app-error.js';
import { createAccessToken } from '../../shared/services/jwt.service.js';

export const register = async (
 data: RegisterInput
) => {
    console.log('Registering user with data:', data);

    const existingUser = await authRepository.findByEmail(data.email);

    if (existingUser) {
        throw new AppError("Email is already in use", 409);
    }

    const passwordHash = await bcrypt.hash(data.password, 12);

    const newUser = await authRepository.createUser({
        email: data.email,
        username: data.username,
        passwordHash,
    })
    return {
        success: true,
        user: {
            id: newUser.id,
            email: newUser.email,
            username: newUser.username,
        },
    };
};

export const login = async (data: LoginInput) => {
    const user = await authRepository.findByEmail(data.email);
     
    if (!user) {
        throw new AppError("Invalid credentials", 401);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.passwordHash);

    if (!isPasswordValid) {
        throw new AppError("Invalid credentials", 401);
    }

    const token = createAccessToken({
        userId: user.id,
        tokenVersion: user.tokenVersion,
    });

    const refreshToken = jwt.sign(
        {
            userId: user.id,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: '17d'
        }
    );

    return {
        success: true,
        token,
        refreshToken,
    };
}

export const logoutAll = async (userId: number) => {
    await authRepository.incrementTokenVersion(userId);
}