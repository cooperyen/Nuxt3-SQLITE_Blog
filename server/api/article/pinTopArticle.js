import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const pinTopArticle = await prismaClient.post.findFirst({
      where: {
        pinTop: true,
      },
    });

    if (pinTopArticle)
      return {
        state: 200,
        data: pinTopArticle,
      };

    if (!pinTopArticle)
      return {
        state: 400,
        msg: 'No pinned articles found',
      };
  } catch (error) {
    console.log('error', error);
  }
});
