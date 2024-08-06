<template>
  <UILayDefaultContainer>
    <ClientPostTimeLineHandler
      :data="data"
      target="tag"
      :tag="route.params.id"></ClientPostTimeLineHandler>
  </UILayDefaultContainer>
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
    title: route.params.id && '標籤',
    link: [
      {
        rel: 'stylesheet',
        href: 'https://cdn.ckeditor.com/ckeditor5/42.0.1/ckeditor5.css',
      },
    ],
  });
</script>
