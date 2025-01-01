import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const img = body.base64;
  const postId = body.postId;

  const imgType = img.replace(/^data:image\//, '');
  const imgType_ = imgType.replace(/.base64.*$/, '');

  const base64Data = img.replace(/^data:image\/\w+;base64,/, '');
  const dateBuffer = Buffer.from(base64Data, 'base64');

  function emptyDir(filePath) {
    fs.readdir(filePath, (err, files) => {
      files.forEach((file) => {
        const fileSpath = `${filePath}/${file}`;
        const stats = fs.statSync(fileSpath);
        if (stats.isDirectory()) emptyDir(fileSpath);
        else {
          fs.unlinkSync(fileSpath);
        }
      });

      writeFile(filePath);
    });
  }

  function writeFile(filePath) {
    fs.writeFile(
      path.resolve(`${filePath}/banner.${imgType_}`),
      dateBuffer,
      (err) => {
        console.log(err);
      }
    );
  }

  fs.readFile(`public/postImg/${postId}/banner`, async (err, data) => {
    if (!fs.existsSync(path.resolve(`public/postImg/${postId}/banner`))) {
      fs.mkdirSync(path.resolve(`public/postImg/${postId}/banner`), {
        recursive: true, // Create a directory if the parent directory does not exist.
      });
    }

    emptyDir(`public/postImg/${postId}/banner`);
  });
});
