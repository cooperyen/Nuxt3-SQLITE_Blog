import { PrismaClient } from '@prisma/client';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const img = body.base64;

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
          console.log(`delete ${file}`);
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

  fs.readFile(
    'public/postImg/0330f7a6-b44b-4d1e-b943-3b1bd314263a/banner',
    async (err, data) => {
      if (
        !fs.existsSync(
          path.resolve(
            `public/postImg/0330f7a6-b44b-4d1e-b943-3b1bd314263a/banner`
          )
        )
      ) {
        fs.mkdirSync(
          path.resolve(
            `public/postImg/0330f7a6-b44b-4d1e-b943-3b1bd314263a/banner`
          ),
          {
            recursive: true, // 创建目录，如果父级目录不存在则创建
          }
        );
      }

      emptyDir('public/postImg/0330f7a6-b44b-4d1e-b943-3b1bd314263a/banner');
    }
  );

  // fs.unlink(
  //   `public/postImg/0330f7a6-b44b-4d1e-b943-3b1bd314263a/banner`,
  //   (err) => {
  //     if (err) console.log(err);
  //     fs.writeFile(
  //       path.resolve(
  //         `public/postImg/0330f7a6-b44b-4d1e-b943-3b1bd314263a/banner/banner.${imgType_}`
  //       ),
  //       dateBuffer,
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  //   }
  // );
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
