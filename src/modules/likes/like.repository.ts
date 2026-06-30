import { and, eq, count} from "drizzle-orm";
import { db } from "../../db/index.js";
import { likes } from "../../db/schema/likes.js";



export const findLike = async (
    userId: number,
    postId: number
) => {
    const results = await db.query.likes.findFirst({
        where: and(eq(likes.userId, userId), eq(likes.postId, postId))
    });

    return results
}

export const createLike = async (
    userId: number,
    postId: number
) => {
    const result = await db.insert(likes)
        .values({userId, postId})
        .onConflictDoNothing()
        .returning();

    return result[0];
}

export const deleteLike = async (
    userId: number,
    postId: number
) => {
    const res = await db.delete(likes).where(
        and(eq(likes.postId, postId), eq(likes.userId, userId))
    ).returning();

    return res;
}

export const countLikes = async (
    postId: number
) => {
    const result =  await db.select({
        value: count()
    }).from(likes).where(eq(likes.postId, postId));

    return result[0]?.value ?? 0;
}