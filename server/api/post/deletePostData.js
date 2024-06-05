import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = query.id;
  let res = false;
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
    res = true;
  }

  return res;
});
