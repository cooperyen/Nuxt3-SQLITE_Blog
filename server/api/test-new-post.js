import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const data = await prismaClient.post.create({
      data: {
        title: body.title,
        subtitle: body.subtitle,
        content: body.content,
        sort: body.sort,
      },
    });
    return { state: 'ok', id: data.id };
  } catch (error) {
    console.log(error);
    return { state: 'fail' };
  }
});
