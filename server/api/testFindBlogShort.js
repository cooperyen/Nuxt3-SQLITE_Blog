import { PrismaClient } from '@prisma/client';

console.log('posts');

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const posts = await prismaClient.post.findMany({
    take: Number(query.postNum),
  });

  console.log('posts', posts);

  return posts;
});
