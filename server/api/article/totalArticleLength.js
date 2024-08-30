import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    switch (event.method) {
      case 'GET':
        return await atricleCount();
      default:
        // Method Not Allowed
        return { state: 400, msg: 'Method Not Allowed' };
    }
  } catch (error) {
    console.log('error', error);
  }
});

async function atricleCount() {
  try {
    const data = await prismaClient.post.count({
      where: {
        publish: true,
      },
    });

    if (data) return { state: 200, data };
    else return { state: 400, msg: "can't find datas." };
  } catch (error) {
    console.log('error', error);
  }
}
