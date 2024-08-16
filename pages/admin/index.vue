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

    <AdminPostList
      :showPerPage="showPerPage"
      :currentPage="currentPage"
      :max="postCount"></AdminPostList>

    <AdminPostPagination
      :max="postCount"
      :currentPage="currentPage"
      :showPerPage="showPerPage"
      @update:currentPage="(e:number)=> currentPage = e"></AdminPostPagination>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'admin',
    middleware: 'auth',
  });

  const currentPage: Ref<Number> = ref(1);
  const showPerPage: Ref<Number> = ref(5);

  const { data: postCount, refresh } = await useFetch<any>('/api/postCount');
</script>
