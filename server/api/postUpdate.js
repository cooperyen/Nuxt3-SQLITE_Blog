import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const content = body.content.replace(/<img /g, '<img class="m-auto" ');
    const data = await prismaClient.post.update({
      where: { id: body.id },
      data: {
        title: body.title,
        subtitle: body.subtitle,
        content: content,
        sort: body.sort,
        publish: body.publish,
        customUrl: body.customUrl,
      },
    });

    // console.log(findImgName(body.content));

    deleteUnuseImg({
      activeFiles: findImgName(body.content),
      id: body.id,
    });

    return {
      state: 'ok',
      id: data.id,
    };
  } catch (error) {
    console.log(error);
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
        console.log(activeFiles.indexOf(item), item);
        return activeFiles.indexOf(item) === -1;
      });

      unUseImg.forEach((file) => {
        console.log(`public/postImg/${id}/${file}`);
        fs.unlink(`public/postImg/${id}/${file}`, (err) => {
          if (err) console.log(err);
        });
      });
    }
  });
}
