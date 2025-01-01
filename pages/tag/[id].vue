<template>
  <UILayDefaultContainer>
    <ClientPostTimeLineHandler
      :data="data"
      target="tag"
      :tag="route.params.id"></ClientPostTimeLineHandler>
  </UILayDefaultContainer>
</template>

<script setup lang="ts">
  const postsUrl: string = '/api/article/postListByTag';
  const route = useRoute();
  const { data, error } = await useFetch<any>(postsUrl, {
    query: { id: route.params.id },
  });

  onBeforeMount(() => {
    if (error.value) {
      alert(error.value.statusMessage);
      clearError({ redirect: '/tags' });
    }
  });

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
