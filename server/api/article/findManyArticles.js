import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    switch (event.method) {
      case 'GET':
        return await findMany(event);
      default:
        // Method Not Allowed
        return { state: 400, msg: 'Method Not Allowed' };
    }
  } catch (error) {
    console.log('error', error);
  }
});

async function findMany(event) {
  try {
    const query = getQuery(event);
    const options = {
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
      where: {
        publish: true,
      },
      select: {
        id: query.id ? true : false,
        title: query.title ? true : false,
        createdAt: query.createdAt ? true : false,
        sort: query.sort ? true : false,
        content: query.content ? true : false,
        publish: query.publish ? true : false,
      },
    };

    if (query.postNum) options['take'] = Number(query.postNum);

    const data = await prismaClient.post.findMany(options);

    if (data) return { state: 200, data };
    else return { state: 400, msg: "can't find data." };
  } catch (error) {
    console.log('error', error);
  }
}
