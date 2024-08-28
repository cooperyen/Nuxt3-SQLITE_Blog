// import fs from 'fs';
import path from 'path';

import * as fs from 'node:fs/promises';

export default defineEventHandler(async (event) => {
  try {
    const x = await fs.readdir('public');
    const res = 1;

    for await (const fileName of x) {
      if (fileName.split('.').at(0) === 'logo') {
        return { fileName, date: new Date() };
      }
    }
  } catch (err) {
    console.log(err, 456);
  }
});
