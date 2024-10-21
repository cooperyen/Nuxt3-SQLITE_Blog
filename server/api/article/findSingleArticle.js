import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

async function findArticle(event) {
  try {
    const query = getQuery(event);
    const data = await prismaClient.post.findMany({
      where: {
        OR: [{ id: query.id }, { customUrl: query.id }],
        publish: true,
      },
    });

    if (data && data.length > 0) return { statusCode: 200, data: data[0] };
    else
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid article',
      });
  } catch (error) {
    throw error;
  }
}

export default defineEventHandler(async (event) => {
  return await findArticle(event);
});
