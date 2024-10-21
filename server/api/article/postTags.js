import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const posts = await prismaClient.post.findMany({
      select: {
        id: true,
        sort: true,
      },
      where: {
        publish: true,
      },
    });
    if (posts) return posts;
    else
      throw createError({
        statusCode: 400,
        statusMessage: 'no data',
      });
  } catch (error) {
    throw error;
  }
});
