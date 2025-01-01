import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const pinTopArticle = await prismaClient.post.findFirst({
      where: {
        pinTop: true,
      },
    });

    if (pinTopArticle) return pinTopArticle;
    else
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid data',
      });
  } catch (error) {
    throw error;
  }
});
