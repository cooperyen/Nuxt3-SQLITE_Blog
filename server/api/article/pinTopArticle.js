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
        state: 'ok',
        data: pinTopArticle,
      };

    if (!pinTopArticle)
      return {
        state: 'fail',
        msg: 'No pinned articles found',
      };
  } catch (error) {
    console.log(error);
    return {
      state: 'fail',
      msg: 'someting wrong.',
    };
  }
});
