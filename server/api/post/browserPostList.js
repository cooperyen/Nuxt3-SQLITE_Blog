import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const posts = await prismaClient.post.findMany({
    skip: Number(query.skip),
    take: Number(query.postNum),
    select: {
      id: true,
      title: true,
      createdAt: true,
      publish: true,
      customUrl:true,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });
  console.log(123);
  return posts;
});
