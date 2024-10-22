import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  return await deleteArticle(event);
});

async function deleteArticle(event) {
  try {
    const query = getQuery(event);
    const id = query.id;
    const get = await prismaClient.post.findUnique({
      where: {
        id,
      },
    });

    if (get) {
      await prismaClient.post.delete({
        where: {
          id,
        },
      });

      return true;
    } else
      throw createError({
        statusCode: 400,
        statusMessage:
          'data delete unsuccesses. please try again or check it later',
      });
  } catch (error) {
    throw error;
  }
}
