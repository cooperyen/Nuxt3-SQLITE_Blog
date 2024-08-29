<template>
  <UILayDefaultContainer>
    <article
      v-if="article.data"
      class="pt-10">
      <UILayoutAlignCenter class="justify-center">
        <div
          id="title"
          class="">
          <!-- title -->
          <h1 class="text-4xl font-bold">{{ article.data.title }}</h1>
          <!-- subtitle -->
          <h2 class="text-2xl mt-3">{{ article.data.subtitle }}</h2>
          <PostSortTimeHandler
            :tags="article.data.sort"
            :time="article.data.createdAt"
            :linkOpen="true">
          </PostSortTimeHandler>
        </div>
        <UISeparatorLine class="mt-5" />
        <div
          v-html="article.data.content"
          class="ck-content mt-10"></div>
      </UILayoutAlignCenter>
    </article>
  </UILayDefaultContainer>
</template>

<script setup lang="ts">
  const postsUrl: string = '/api/article/findSingleArticle';
  const route = useRoute();

  interface seo {
    title: string;
    description?: string;
    ogDescription?: string;
    ogTitle: string;
    ogUrl: string;
    twitterTitle: string;
    twitterDescription?: string;
  }

  const { data: article, error } = await useFetch<any>(postsUrl, {
    query: { id: route.params.id },
    method: 'GET',
  });


  onBeforeMount(() => {
    if (article.value.state != 200) back();
  });

  async function back() {
    await navigateTo('/');
  }

  // SEO

  const seo: seo = {
    title: article.value.data.title,
    ogTitle: article.value.data.title,
    ogUrl: `https://blog.hwaseng.com.tw/article/${route.params.id}`,
    twitterTitle: article.value.data.title,
  };

  if (article.value.data.description) {
    seo['description'] = article.value.data.description;
    seo['ogDescription'] = article.value.data.description;
    seo['twitterDescription'] = article.value.data.description;
  }

  useSeoMeta(seo);

  useHead({
    link: [
      {
        rel: 'stylesheet',
        href: 'https://cdn.ckeditor.com/ckeditor5/42.0.1/ckeditor5.css',
      },
    ],
  });
</script>
