import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const posts = await prismaClient.post.findMany({
    where: {
      publish: true,
      sort: {
        contains: query.sort,
      },
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
  });

  return posts;
});
