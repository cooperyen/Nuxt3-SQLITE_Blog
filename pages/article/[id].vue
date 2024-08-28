<template>
  <UILayDefaultContainer>
    <article
      v-if="data"
      class="pt-10">
      <UILayoutAlignCenter class="justify-center">
        <div
          id="title"
          class="">
          <!-- title -->
          <h1 class="text-4xl font-bold">{{ data.title }}</h1>
          <!-- subtitle -->
          <h2 class="text-2xl mt-3">{{ data.subtitle }}</h2>
          <PostSortTimeHandler
            :tags="data.sort"
            :time="data.createdAt"
            :linkOpen="true">
          </PostSortTimeHandler>
        </div>
        <UISeparatorLine class="mt-5" />
        <div
          v-html="data.content"
          class="ck-content mt-10"></div>
      </UILayoutAlignCenter>
    </article>
  </UILayDefaultContainer>
</template>

<script setup lang="ts">
  const postsUrl: string = '/api/test_find_post_data';
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

  const { data, error } = await useFetch<any>(postsUrl, {
    query: { id: route.params.id },
  });

  onBeforeMount(() => {
    if (!data.value) back();
  });

  async function back() {
    await navigateTo('/');
  }

  // SEO


  const seo: seo = {
    title: data.value.title,
    ogTitle: data.value.title,
    ogUrl:`https://blog.hwaseng.com.tw/article/${route.params.id}`,
    twitterTitle: data.value.title,


  };

  if (data.value.description) {
    seo['description'] = data.value.description;
    seo['ogDescription'] = data.value.description;
    seo['twitterDescription'] = data.value.description;
  }

  console.log(seo);

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
