<template>
  {{ postCount }}
</template>

<script setup lang="ts">
  const postsCount: string = '/api/postCount';

  const { data: postCount } = await useFetch(postsCount, {
    lazy: true,
    immediate: true,
  });
</script>
