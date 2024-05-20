import { PrismaClient } from '@prisma/client';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const img = body.i;
  const base64Data = img.replace(/^data:image\/\w+;base64,/, '');
  const dateBuffer = Buffer.from(base64Data, 'base64');
  console.log(dateBuffer);
  // const fix = file.originalFilename.split('.').at(-1);

  // fs.readFile(file.filepath, (err, data) => {
  //   if (
  //     !fs.existsSync(
  //       path.resolve('public/postImg/0330f7a6-b44b-4d1e-b943-3b1bd314263/a')
  //     )
  //   ) {
  //     fs.mkdirSync(
  //       path.resolve('public/postImg/0330f7a6-b44b-4d1e-b943-3b1bd314263/a'),
  //       {
  //         recursive: true, // 创建目录，如果父级目录不存在则创建
  //       }
  //     );
  //   }
  fs.writeFile(
    path.resolve(`public/postImg/0330f7a6-b44b-4d1e-b943-3b1bd314263a/a`),
    dateBuffer,
    (err) => {
      console.log(err);
    }
  );
});

// return {
//   uploaded: 1,
//   fileName: file.newFilename,
//   url: `/postimg/${query.id}/${file.newFilename}.${fix}`,
// };

/**
 * @param {import('http').IncomingMessage} req
 */
function doSomethingWithNodeRequest(req) {
  return new Promise((resolve, reject) => {
    /** @see https://github.com/node-formidable/formidable/ */
    const form = formidable({ multiples: true, encoding: 'base64' });

    form.parse('', (error, fields, files) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ ...fields, ...files });
    });
  });
}
