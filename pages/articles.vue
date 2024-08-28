<template>
  <UILayDefaultContainer>
    <ClientPostTimeLineHandler
      :data="tags"
      target="tag"></ClientPostTimeLineHandler>
  </UILayDefaultContainer>
</template>

<script setup lang="ts">
  const postsUrl: string = '/api/article/shortPostFullList';

  const { data: tags, error, refresh } = await useFetch<any>(postsUrl);
</script>
