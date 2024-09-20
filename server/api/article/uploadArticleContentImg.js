import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const nodeRequestObject = event.node.req;

  const query = getQuery(event);

  const body = await doSomethingWithNodeRequest(nodeRequestObject);
  const file = body.upload[0];
  const fix = file.originalFilename.split('.').at(-1);

  fs.readFile(file.filepath, (err, data) => {
    if (!fs.existsSync(path.resolve(`public/postImg/${query.id}`))) {
      fs.mkdirSync(path.resolve(`public/postImg/${query.id}`), {
        recursive: true, 
      });
    }
    fs.writeFile(
      path.resolve(`public/postImg/${query.id}/${file.newFilename}.${fix}`),
      new Uint8Array(data),
      (err) => {
        // console.log(err);
      }
    );
  });

  return {
    uploaded: 1,
    fileName: file.newFilename,
    url: `/postImg/${query.id}/${file.newFilename}.${fix}`,
  };
});

/**
 * @param {import('http').IncomingMessage} req
 */
function doSomethingWithNodeRequest(req) {
  return new Promise((resolve, reject) => {
    /** @see https://github.com/node-formidable/formidable/ */
    const form = formidable({ multiples: true });
    form.parse(req, (error, fields, files) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ ...fields, ...files });
    });
  });
}
