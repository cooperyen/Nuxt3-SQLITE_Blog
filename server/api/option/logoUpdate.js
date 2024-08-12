import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event);

  const file = files[0];
  const fileSize = file.data.length / 10000000;
  const fileType = file.filename.split('.').at(-1);

  if (fileSize > 1) return { code: 400, msg: 'too large' };
  if (fileSize <= 1) {
    fs.readdir('public', (err, files) => {
      files.forEach((fil) => {
        if (fil.split('.').at(0) === 'ssss') {
          const filePath = path.join('public', fil);
          fs.unlinkSync(filePath);
        }
      });
    });

    const filepath = path.join(process.cwd(), '/public', `ssss.${fileType}`);
    fs.writeFileSync(filepath, file.data);

    return { code: 200 };
  }
});
