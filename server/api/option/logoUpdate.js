import formidable from 'formidable';
import fs from 'node:fs/promises';
import path from 'path';

export default defineEventHandler(async (event) => {
  try {
    const files = await readMultipartFormData(event);

    const file = files[0];
    const fileSize = file.data.length / 10000000;
    const fileType = file.filename.split('.').at(-1);

    if (fileSize > 1) return { code: 400, msg: 'too large' };
    if (fileSize <= 1) {
      // await fs.readFile('public', (err, files) => {
      //   files.forEach((fil) => {
      //     console.log(fil);
      //     if (fil.split('.').at(0) === 'ssss') {
      //       const filePath = path.join('public', fil);

      //       fs.unlinkSync(filePath);
      //     }
      //   });
      // });

      const trr = await fs.readdir('public');
      trr.map((fil) => {
        if (fil.split('.').at(0) === 'ssss') {
          const filePath = path.join('public', fil);
          fs.unlink(filePath);
        }
      });

      // trr.forEach((fil) => {
      //   console.log(fil);
      //   if (fil.split('.').at(0) === 'ssss') {
      //     const filePath = path.join('public', fil);
      //     fs.unlinkSync(filePath);
      //   }
      // });

      const filepaths = path.join(process.cwd(), '/public', `ssss.${fileType}`);
      const yyy = await fs.writeFile(filepaths, file.data);

      return { code: 200 };
    }
  } catch (error) {
    console.log(error);
  }
});
