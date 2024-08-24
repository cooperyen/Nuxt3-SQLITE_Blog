import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    switch (event.method) {
      case 'GET':
        return await getData();
      case 'POST':
        return await updateData(event);
      default:
        // Method Not Allowed
        event.statusCode = 405;
        return { error: 'Method Not Allowed' };
    }
  } catch (error) {
    // console.log(error);
    return { state: 'fail' };
  }
});

async function updateData(event) {
  try {
    const body = await readBody(event);
    const data = await prismaClient.pages.update({
      where: {
        url: 'about',
      },
      data: {
        content: body.content,
      },
    });

    return data ? true : false;
  } catch (error) {
    console.log(error);
  }
}

async function createData() {
  try {
    const data = await prismaClient.pages.create({
      data: {
        title: 'About page',
        url: 'about',
        content: '',
      },
    });
    return data ? true : false;
  } catch (error) {
    console.log(error);
  }
}

async function getData() {
  try {
    const data = await prismaClient.pages.findUnique({
      where: {
        url: 'about',
      },
    });

    if (data) return data;
    if (!data) {
      const res = await createData();
      if (res) return await getData();
    }
  } catch (error) {
    console.log(error);
  }
}
