<template>
  <div>
    <div class="flex w-full justify-end">
      <UISubmitBTN class="flex">
        <NuxtLink
          class="px-3 py-1 block"
          to="/admin/newpost"
          >新增</NuxtLink
        >
      </UISubmitBTN>
    </div>

    <AdminPostList @refresh="(el) => (refresh = el)"></AdminPostList>
    <AdminPostPagination :refresh="refresh"></AdminPostPagination>
  </div>
</template>

<script setup lang="ts">
  const refresh: Ref<any> = ref('[]');
  definePageMeta({
    layout: 'admin',
    middleware: 'auth',
  });
</script>
