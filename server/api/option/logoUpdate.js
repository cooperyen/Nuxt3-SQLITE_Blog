import formidable from 'formidable';
import fs from 'node:fs/promises';
import path from 'path';

export default defineEventHandler(async (event) => {
  try {
    const files = await readMultipartFormData(event);

    const file = files[0];
    const fileSize = file.data.length / 10000000;
    const fileType = file.filename.split('.').at(-1);
    console.log(fileSize);

    if (fileSize > 1) return { code: 400, msg: 'too large' };
    if (fileSize <= 1) {
      const trr = await fs.readdir('public');
      
      await Promise.all(
        trr.map(async (fil) => {
          if (fil.split('.').at(0) === 'ssss') {
            const filePath = path.join('public', fil);
            await fs.unlink(filePath);
          }
        })
      );
      const filepaths = path.join(process.cwd(), '/public', `ssss.${fileType}`);
      await fs.writeFile(filepaths, file.data);

      return { code: 200 };
    }
  } catch (error) {
    console.log(error);
  }
});
