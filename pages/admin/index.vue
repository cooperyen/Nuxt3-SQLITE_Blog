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
      :max="articleLength"></AdminPostList>

    <AdminPostPagination
      :max="articleLength"
      :currentPage="currentPage"
      :showPerPage="showPerPage"
      @update:currentPage="(e:number)=> currentPage = e"></AdminPostPagination>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'admin',
    pageTransition: false,
  });

  const currentPage: Ref<Number> = ref(1);
  const showPerPage: Ref<Number> = ref(5);

  const { data: articleLengthAPI, refresh } = await useFetch<any>(
    '/api/article/totalArticleLength'
  );

  const articleLength = computed(() => {
    if (articleLengthAPI.value) return articleLengthAPI.value;
    else return 0;
  });
</script>
