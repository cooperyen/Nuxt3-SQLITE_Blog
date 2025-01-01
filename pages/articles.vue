<template>
  <UILayDefaultContainer>
    <postTimeLineHandler
      :data="articles"
      target="tag"></postTimeLineHandler>
  </UILayDefaultContainer>
</template>

<script setup lang="ts">

  const postTimeLineHandler = defineAsyncComponent(
    () => import('~/components/client/postTimeLineHandler.vue')
  );

  const { data } = await useFetch<any>('/api/article/findManyArticles', {
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
