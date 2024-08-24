import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const posts = await prismaClient.post.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
    where: {
      publish: true,
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      publish: true,
      sort: true,
      content: true,
    },
  });

  return posts;
});
