import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(() => {
  const user = prismaClient.post.create({
    data: {
      title: 'blog01',
      content: '',
      sort: '',
    },
  });

  return user;
});
