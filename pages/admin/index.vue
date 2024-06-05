<template>
  <AdminPostList @refresh="(el) => (refresh = el)"></AdminPostList>
  <AdminPostPagination :refresh="refresh"></AdminPostPagination>
</template>

<script setup lang="ts">
  const refresh: Ref<any> = ref('[]');
  definePageMeta({
    layout: 'admin',
  });
</script>
