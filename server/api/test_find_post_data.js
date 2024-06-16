import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  // console.log(event.context);
  const query = getQuery(event);
  console.log(query.id);
  const user = await prismaClient.post.findMany({
    where: {
      OR: [{ id: query.id }, { customUrl: query.id }],
    },
  });

  return user[0];
});
