import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    let res = null;

    switch (event.method) {
      case 'GET':
        res = await findArticle(event);
        break;
      default:
        // Method Not Allowed
        return { state: 400, msg: 'Method Not Allowed' };
    }

    return res;
  } catch (error) {
    console.log('error', error);
  }
});

async function findArticle(event) {
  try {
    const query = getQuery(event);
    const data = await prismaClient.post.findMany({
      where: {
        OR: [{ id: query.id }, { customUrl: query.id }],
        publish: true,
      },
    });

    if (data) return { state: 200, data:data[0] };
    else return { state: 400, msg: "can't find data." };
  } catch (error) {
    console.log('error', error);
  }
}
