import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(() => {
  const user = prismaClient.user.create({
    data: {
      account: 'Admins',
      password: 'password',
      ip: '',
      loginTime: new Date(),
    },
  });

  return user;
});
