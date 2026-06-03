import type { RegisterInput, LoginInput, RefreshTokenInput, LogoutInput } from './auth.types.js';
import bcrypt from 'bcryptjs';
import * as authRepository from './auth.repository.js';
import { AppError } from '../../shared/errors/app-error.js';
import { createAccessToken, createRefreshToken } from '../../shared/services/jwt.service.js';
import { verifyRefreshToken } from '../../shared/services/jwt.service.js';
import { success } from 'zod';

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

    const refreshToken = createRefreshToken({
        userId: user.id,
        tokenVersion: user.tokenVersion,
    })

    await authRepository.createRefreshToken(
        user.id,
        refreshToken,
        new Date(Date.now() + 17 * 24 * 60 * 60 * 1000) // 17 days
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

export const refreshAccessToken = async (refreshToken: RefreshTokenInput) => {
    const payload = verifyRefreshToken(refreshToken.refreshToken);

    const session = await authRepository.findRefreshToken(refreshToken.refreshToken);

    if (!session) {
        throw new AppError("Invalid refresh token", 401);
    }

    const user = await authRepository.getById(payload.userId);

    if (!user) {
        throw new AppError("Invalid refresh token", 404);
    }

    if (user.tokenVersion !== payload.tokenVersion) {
        throw new AppError("Expired session", 401);
    }

    const newAccessToken = createAccessToken({
        userId: user.id,
        tokenVersion: user.tokenVersion,
    });

    return {
        success: true,
        token: newAccessToken,
    };
}


export const logout = async (
    data: LogoutInput
) => {
    await authRepository.deleteRefreshToken(data.refreshToken);

    return {
        success: true
    }
}