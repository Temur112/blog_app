import { z } from 'zod';
import { registerSchema, loginSchema, refreshTokenSchema, logoutSchema} from './auth.validation.js';


export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
export type LogoutInput = z.infer<typeof logoutSchema>;