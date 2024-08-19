import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  let res = null;
  switch (event.method) {
    case 'GET':
      res = await getArticle(event);
      break;
    case 'DELETE':
      res = await deleteArticle(event);
      break;
    default:
      // Method Not Allowed
      event.statusCode = 405;
      return { error: 'Method Not Allowed' };
  }

  return res;
});

async function getArticle(event) {
  const query = getQuery(event);

  const res = await prismaClient.post.findMany({
    skip: Number(query.skip),
    take: Number(query.postNum),
    select: {
      id: true,
      title: true,
      createdAt: true,
      publish: true,
      customUrl: true,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  });

  return res;
}

async function deleteArticle(event) {
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
}
