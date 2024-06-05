import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const paths = `public/postImg/${body.id}/banner`;

  async function emptyDir(filePath) {
    if (fs.existsSync(path.resolve(filePath))) {
      const res = await fs.promises.readdir(filePath);
      return `/postImg/${body.id}/banner/${res[0]}`;
    } else {
      return 'fail';
    }
  }

  return emptyDir(paths);
});
