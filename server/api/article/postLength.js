import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  const posts = await prismaClient.post.findMany({
    where: {
      publish: true,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });

  return posts.length;
});
