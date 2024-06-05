<template>
  <div class="mt-20">
    <div class="flex w-full justify-end">
      <UISubmitBTN class="flex">
        <NuxtLink to="/admin/newpost">新增</NuxtLink>
      </UISubmitBTN>
    </div>
  </div>
  <AdminPostList @refresh="(el) => (refresh = el)"></AdminPostList>
  <AdminPostPagination :refresh="refresh"></AdminPostPagination>
</template>

<script setup lang="ts">
  const refresh: Ref<any> = ref('[]');
  definePageMeta({
    layout: 'admin',
  });
</script>
