import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(() => {
  const user = prismaClient.user.create({
    data: {
      providerName: null,
      providerUserId: null,
      nickname: 'Admin',
      email: 'cooper.rafago@gmail.com',
      password: '86367821',
      avatar: '',
      emailVerified: true,
    },
  });

  return user;
});
