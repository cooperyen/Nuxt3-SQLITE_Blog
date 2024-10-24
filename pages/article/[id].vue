<template>
  <UILayDefaultContainer>
    <article
      v-if="article?.data"
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
    description: string;
    ogDescription: string;
    ogTitle: string;
    ogUrl: string;
    twitterTitle: string;
    twitterDescription: string;
  }

  const { data: article, error } = await useFetch<any>(postsUrl, {
    query: { id: route.params.id },
  });

  onBeforeMount(() => {
    if (error.value) {
      alert('Something wrong.');
      clearError({ redirect: '/' });
    }
  });

  // SEO
  const description =
    '華生將是您戮力於ESG企業的最佳夥伴！60餘年歷史，飲水專家，歡迎前來華生水水工廠體驗館。擁有最先進高科技淨水設備，主要販售飲水機、瓶裝水、桶裝水，每日檢驗讓您安心喝好水';
  const articleTitle = computed(() =>
    article.value?.data?.title ? article.value.data.title : false
  );
  const articleDescription = computed(() =>
    article.value?.data?.description ? article.value.data.description : false
  );

  console.log(articleTitle.value);
  const seo: seo = {
    title: articleTitle.value || '華生水資源',
    ogTitle: articleTitle.value || '華生水資源',
    twitterTitle: articleTitle.value || '華生水資源',
    ogUrl: `https://blog.hwaseng.com.tw/article/${route.params.id}`,
    description: articleDescription.value || description,
    ogDescription: articleDescription.value || description,
    twitterDescription: articleDescription.value || description,
  };

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
