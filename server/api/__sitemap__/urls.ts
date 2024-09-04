export default defineSitemapEventHandler(async () => {
  const domin = 'http://localhost:3000';

  const response = await fetch(`${domin}/api/article/findManyArticles`);
  const posts = await response.json();
  // console.log(`${domin}/api/article/findManyArticles`);

  if (posts.state === 200)
    return posts.data.map((el: any) => {
      return `/article/${el.customUrl ? el.customUrl : el.id}`;
    });
  else return null;
});
