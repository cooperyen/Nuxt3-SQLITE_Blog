import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  return await updateArticle(event);
});

async function updateArticle(event) {
  try {
    const body = await readBody(event);

    if (body.pinTop) {
      await prismaClient.post.updateMany({
        where: {
          pinTop: true,
        },
        data: {
          pinTop: false,
        },
      });
    }

    const data = await prismaClient.post.update({
      where: { id: body.id },
      data: {
        title: body.title,
        subtitle: body.subtitle,
        content: body.content,
        sort: String(body.sort),
        publish: body.pinTop ? true : body.publish,
        customUrl: body.customUrl,
        pinTop: body.pinTop,
        description: body.description,
      },
    });

    if (data) return true;
    else
      throw createError({
        statusCode: 400,
        statusMessage: 'update unsuccesses. please try again or check it later',
      });
  } catch (error) {
    throw error;
  }
}
