import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

export default defineEventHandler(async (event) => {
  const content = {};
  let tagLength = 0;

  const posts = await prismaClient.post.findMany({
    where: {
      publish: true,
    },
    select: {
      id: true,
      sort: true,
    },
  });

  for (let i = 0; i < posts.length; i++) {
    const element = posts[i];
    const sorts = element.sort.split(',');
    for (let s = 0; s < sorts.length; s++) {
      const sort = sorts[s];
      if (sort != '') {
        if (content[sort]) content[sort] += 1;
        else {
          content[sort] = 1;
          tagLength += 1;
        }
      }
    }
  }
  return { tag: content, postLength: posts.length, tagLength };
});
