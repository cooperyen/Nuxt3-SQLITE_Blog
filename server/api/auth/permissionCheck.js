import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (even) => {
  try {
    const query = getQuery(even);
    const ip = await getIP();

    const findUser = await prismaClient.user.findUnique({
      where: {
        id: query.id,
      },
    });

    console.log(findUser);

  } catch (error) {
    console.log(error);
  }
});

async function getIP() {
  const currentIP = await fetch('https://api.ipify.org?format=json');
  const res = await currentIP.json();
  return res.ip;
}
