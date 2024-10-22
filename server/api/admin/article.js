import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  return await findArticle(event);
});

async function findArticle(event) {
  try {
    const query = getQuery(event);
    let data;

    if (query.id) {
      data = await prismaClient.post.findUnique({
        where: {
          id: query.id,
        },
      });
    } else {
      data = await prismaClient.post.findMany({
        skip: Number(query.skip),
        take: Number(query.postNum),
        select: {
          id: true,
          title: true,
          createdAt: true,
          publish: true,
          customUrl: true,
        },
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
      });
    }

    if (data) return data;
    else
      throw createError({
        statusCode: 400,
        statusMessage:
          'data fetch unsuccesses. please try again or check it later',
      });
  } catch (error) {
    throw error;
  }
}
