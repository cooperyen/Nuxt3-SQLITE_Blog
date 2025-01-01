import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  return await createArticle(event);
});

async function createArticle(event) {
  try {
    const body = await readBody(event);
    const data = await prismaClient.post.create({
      data: {
        title: body.title,
        subtitle: body.subtitle,
        sort: '',
        customUrl: '',
      },
    });

    if (data) return data.id;
    else
      throw createError({
        statusCode: 400,
        statusMessage: 'create unsuccesses. please try again or check it later',
      });
  } catch (error) {
    throw error;
  }
}
