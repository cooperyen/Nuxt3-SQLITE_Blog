// import fs from 'fs';
import path from 'path';

import * as fs from 'node:fs/promises';

export default defineEventHandler(async (event) => {
  let res = null;
  switch (event.method) {
    case 'GET':
      res = await getLogoPath();
      break;
    default:
      // Method Not Allowed
      event.statusCode = 400;
      return { error: 'Method Not Allowed' };
  }

  return res;
});


async function getLogoPath() {
  try {
    const path = await fs.readdir('public');

    for await (const fileName of path) {
      if (fileName.split('.').at(0) === 'logo') {
        return { fileName, date: new Date() };
      }
    }


  } catch (err) {
    console.log(err, 456);
  }
}