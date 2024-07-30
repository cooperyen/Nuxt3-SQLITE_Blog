import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  const posts = await prismaClient.post.findMany({
    select: {
      id: true,
      sort: true,
      publish: true,
    },
  });

  return posts;
});
