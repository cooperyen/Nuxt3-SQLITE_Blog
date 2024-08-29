<template>
  <UILayDefaultContainer>
    <ClientPostTimeLineHandler
      :data="articles"
      target="tag"></ClientPostTimeLineHandler>
  </UILayDefaultContainer>
</template>

<script setup lang="ts">
  const postsUrl: string = '/api/article/findManyArticles';

  const { data } = await useFetch<any>(postsUrl, {
    method: 'GET',
    query: {
      id: true,
      title: true,
      createdAt: true,
    },
  });

  const articles = computed(() => {
    const val = data.value;
    if (val.state === 200) return data.value.data;
    else return null;
  });

</script>
