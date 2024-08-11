
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {

  try {
    const files = await readMultipartFormData(event);
    console.log(files);
    
    fs.writeFile('/public',files)
    console.log(files,'files');


  } catch (err) {
    console.log(err,'err');
  }
  // const nodeRequestObject = event.node.req;


  // const dddd =  await readBody(event);


  // const query = getQuery(event);

  // const body = await doSomethingWithNodeRequest(nodeRequestObject);
  // console.log(body.upload[0]);
  // return body;
  // const file = body.upload[0];
  // const fix = file.originalFilename.split('.').at(-1);

  // fs.readFile(file.filepath, (err, data) => {
  //   fs.writeFile(
  //     path.resolve(`public/${query.id}/${file.newFilename}.${fix}`),
  //     new Uint8Array(data),
  //     (err) => {
  //       // console.log(err);
  //     }
  //   );
  // });

  // return {
  //   uploaded: 1,
  //   fileName: file.newFilename,
  //   url: `/${query.id}/${file.newFilename}.${fix}`,
  // };
});

/**
 * @param {import('http').IncomingMessage} req
 */
function doSomethingWithNodeRequest(req) {
  return new Promise((resolve, reject) => {
    /** @see https://github.com/node-formidable/formidable/ */
    const form = formidable({ multiples: false });
    form.parse(req, (error, fields, files) => {
      if (error) {
        reject(error);
        return;
      }
      resolve({ ...fields, ...files });
    });
  });
}
