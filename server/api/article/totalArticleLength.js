import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  return await atricleCount();
});

async function atricleCount() {
  try {
    const data = await prismaClient.post.count({
      where: {
        publish: true,
      },
    });

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
