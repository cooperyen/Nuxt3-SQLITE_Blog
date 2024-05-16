import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    console.log(body);
    const data = await prismaClient.post.update({
      where: { id: body.id },
      data: {
        title: body.title,
        subtitle: body.subtitle,
        content: body.content,
        sort: body.sort,
        publish: body.publish,
      },
    });

    // fs.copyFile(
    //   'public/essayBack/35d150106c66dbf1e8f703f01.jpg',
    //   'public/essayBacks/35d150106c66dbf1e8f703f01.jpg',
    //   (err) => {}
    // );

    return { state: 'ok', id: data.id };
  } catch (error) {
    console.log(error);
    return { state: 'fail' };
  }
});
