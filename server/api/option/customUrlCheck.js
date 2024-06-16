import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const posts = await prismaClient.post.findMany({
    where: {
      customUrl: body.url,
    },
  });

  return posts.length > 0 ? false : true;
});
