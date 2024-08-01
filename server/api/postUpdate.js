import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const data = await prismaClient.post.update({
      where: { id: body.id },
      data: {
        title: body.title,
        subtitle: body.subtitle,
        content: body.content,
        sort: String(body.sort),
        publish: body.publish,
        customUrl: body.customUrl,
      },
    });

    return {
      state: 'ok',
      id: data.id,
    };
  } catch (error) {
    // console.log(error);
    return { state: 'fail' };
  }
});

function findImgName(str) {
  const tagsFound = [];
  str.replace(/<img.*?src=["|']\/.*?\/.*?\/(.+?)["|']/g, function (m, m1, m2) {
    // write data to result objcect
    tagsFound.push(m1);
  });
  return tagsFound;
}

function deleteUnuseImg({ activeFiles, id }) {
  fs.readdir(`public/postImg/${id}`, (err, files) => {
    if (err) console.log(err);
    else {
      const unUseImg = files.filter(function (item, i) {
        return activeFiles.indexOf(item) === -1;
      });

      unUseImg.forEach((file) => {
        // console.log(file);
        // fs.unlink(`public/postImg/${id}/${file}`, (err) => {
        //   if (err) console.log(err);
        // });
      });
    }
  });
}
