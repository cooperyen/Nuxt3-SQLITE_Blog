import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const count = await prismaClient.post.count();
    return count;
  } catch (error) {
    console.log('error', error);
  }
});
