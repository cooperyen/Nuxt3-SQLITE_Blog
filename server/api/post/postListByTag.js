import { faL } from '@fortawesome/free-solid-svg-icons';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  console.log(query);

  const posts = await prismaClient.post.findMany({
    where: {
      publish: true,
      // sort: { search: query.id },
      sort: {
        in: query.id,
      },
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });

  return posts.length != 0 ? posts : false;
});
