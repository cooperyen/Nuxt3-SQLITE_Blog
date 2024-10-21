import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

const fail = { statusCode: 400, msg: "can't find data." };

async function findMany(event) {
  try {
    const query = getQuery(event);
    const selects = JSON.parse(query.select);
    const where = query.where ? query.where : false;
    const sort = selects.sort ? selects.sort : false;

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
        title: true,
        createdAt: true,
        sort: sort,
        content: true,
        publish: true,
        subtitle: true,
        customUrl: true,
      },
    };

    if (query?.postNum) options['take'] = Number(query.postNum);
    if (where?.content)
      options['where']['content'] = { contains: where.content };

    const data = await prismaClient.post.findMany(options);

    if (data) return data;
    else
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid data',
      });
  } catch (error) {
    throw error;
  }
}

export default defineEventHandler(async (event) => {
  return await findMany(event);
});
