import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { users } from "../../db/schema/users.js";


export const findByEmail = async (
    email: string
) => {
    const result = await db.select().from(users).where(eq(users.email, email));

    return result[0] ?? null;
};


export const createUser = async (
    data: {
        email: string;
        username: string;
        passwordHash: string;
    }
) => {
    const result = await db
        .insert(users)
        .values(data)
        .returning();

    const user = result[0];

    if (!user) {
        throw new Error("Failed to create user");
    }

    return user;
};


export const getById = async (id: number) => {
    const result = await db.select().from(users).where(eq(users.id, id));

    const user = result[0];
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};

export const incrementTokenVersion = async (userId: number) => {
    const user = await getById(userId);

    await db.update(users)
        .set({
            tokenVersion: user.tokenVersion + 1,
        })
        .where(eq(users.id, userId));
};

