import { faL } from '@fortawesome/free-solid-svg-icons';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const posts = await prismaClient.post.findMany({
    where: {
      publish: true,
      sort: {
        contains: query.id,
      },
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });

  const res = posts.filter((el) => el.sort.split(',').indexOf(query.id) != -1);

  return res.length != 0 ? res : false;
});
