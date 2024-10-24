<template>
  <UILayDefaultContainer>
    <postTimeLineHandler
      :data="articles"
      target="tag"></postTimeLineHandler>
  </UILayDefaultContainer>
</template>

<script setup lang="ts">
  const postsUrl: string = '/api/article/findManyArticles';

  const postTimeLineHandler = defineAsyncComponent(
    () => import('~/components/client/postTimeLineHandler.vue')
  );

  const { data } = await useFetch<any>(postsUrl, {
    method: 'GET',
    query: {
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    },
  });

  const articles = computed(() => {
    const val = data.value;
    if (val) return data.value;
    else return null;
  });

</script>
