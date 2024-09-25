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
    const select = query.select ? JSON.parse(query.select) : null;
    const where = query.where ? JSON.parse(query.where) : null;

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
        id: true,
        title: select?.title ? true : false,
        createdAt: select?.createdAt ? true : false,
        sort: select?.sort ? true : false,
        content: select?.content ? true : false,
        publish: select?.publish ? true : false,
        subtitle: select?.subtitle ? true : false,
        customUrl: true,
      },
    };

    if (query?.postNum) options['take'] = Number(query.postNum);
    if (where?.content)
      options['where']['content'] = { contains: where.content };

    const data = await prismaClient.post.findMany(options);

    if (data) return { state: 200, data };
    else return { state: 400, msg: "can't find data." };
  } catch (error) {
    console.log('error', error);
  }
}
