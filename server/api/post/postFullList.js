import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const posts = await prismaClient.post.findMany({
    take: Number(query.postNum),
    where: {
      publish: true,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });

  return posts;
});
