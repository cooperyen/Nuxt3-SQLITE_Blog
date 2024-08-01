<template>
  <div v-if="data">
    <!-- {{ route.params.id }}
    {{ data }} -->
    <ClientPostTimeLineHadnler :data="data" target="tag"></ClientPostTimeLineHadnler>
  </div>
</template>

<script setup lang="ts">
  const postsUrl: string = '/api/post/postListByTag';
  const route = useRoute();
  const { data, pending, error } = await useFetch<any>(postsUrl, {
    query: { id: route.params.id },
  });

  if (!data.value) back();

  // onBeforeMount(() => {
  //   if (!data.value) back();
  // });

  async function back() {
    await navigateTo('/tag');
  }

  useHead({
    title: route.params.id && '分類',
    link: [
      {
        rel: 'stylesheet',
        href: 'https://cdn.ckeditor.com/ckeditor5/42.0.1/ckeditor5.css',
      },
    ],
  });
</script>
