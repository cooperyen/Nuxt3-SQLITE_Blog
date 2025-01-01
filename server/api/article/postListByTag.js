import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const posts = await prismaClient.post.findMany({
      where: {
        publish: true,
        sort: {
          contains: query.id,
        },
      },
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    });

    const res = posts.filter(
      (el) => el.sort.split(',').indexOf(query.id) != -1
    );

    if (res.length != 0) return res;
    else
      throw createError({
        statusCode: 400,
        statusMessage: 'no data',
      });
  } catch (error) {
    throw error;
  }
});
