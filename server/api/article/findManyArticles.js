import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

async function findMany(event) {
  try {
    const query = getQuery(event);
    const selects = JSON.parse(query.select);
    const where = query.where ? query.where : false;
    const id = selects.id ? selects.id : false;
    const title = selects.title ? selects.title : false;
    const createdAt = selects.createdAt ? selects.createdAt : false;
    const sort = selects.sort ? selects.sort : false;
    const content = selects.content ? selects.content : false;
    const publish = selects.publish ? selects.publish : false;
    const subtitle = selects.subtitle ? selects.subtitle : false;
    const customUrl = selects.customUrl ? selects.customUrl : false;

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
        id,
        title,
        createdAt,
        sort,
        content,
        publish,
        subtitle,
        customUrl,
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
