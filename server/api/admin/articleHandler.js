import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    let res = null;

    switch (event.method) {
      case 'GET':
        res = await findArticle(event);
        break;
      case 'PUT':
        res = await updateArticle(event);
        break;
      case 'POST':
        res = await createArticle(event);
        break;
      case 'DELETE':
        // res = await deleteArticle(event);
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
    let data;

    if (query.id) {
      data = await prismaClient.post.findUnique({
        where: {
          id: query.id,
        },
      });
    } else {
      data = await prismaClient.post.findMany({
        skip: Number(query.skip),
        take: Number(query.postNum),
        select: {
          id: true,
          title: true,
          createdAt: true,
          publish: true,
          customUrl: true,
        },
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
      });
    }

    if (data) return { state: 200, data };
    else return { state: 400, msg: "can't find data." };
  } catch (error) {
    console.log('error', error);
  }
}

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

    if (data) return { state: 200, data: data.id };
    else return { state: 400, msg: 'something wrong.' };
  } catch (error) {
    console.log(error);
    return { state: 'fail' };
  }
}

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

    if (data) return { state: 200, id: data.id };
    else return { state: 400, msg: 'something wrong.' };
  } catch (error) {
    console.log('error', error);
  }
}

async function deleteArticle(event) {
  const query = getQuery(event);
  const id = query.id;
  let res = false;
  const get = await prismaClient.post.findUnique({
    where: {
      id,
    },
  });

  if (get) {
    await prismaClient.post.delete({
      where: {
        id,
      },
    });
    res = true;
  }

  return res;
}
