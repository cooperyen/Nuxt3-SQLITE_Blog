<template>
  <UILayDefaultContainer>
    <ClientPostTimeLineHandler
      :data="tags"
      target="tag"></ClientPostTimeLineHandler>
  </UILayDefaultContainer>
</template>

<script setup lang="ts">
  const postsUrl: string = '/api/post/shortPostFullList';

  const { data: tags, error, refresh } = await useFetch<any>(postsUrl);
</script>
