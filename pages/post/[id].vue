<template>
  <article v-if="data">
    <UILayoutAlignCenter class="justify-center">
      <div
        id="title"
        class="">
        <!-- title -->
        <h1 class="text-4xl font-bold">{{ data.title }}</h1>
        <!-- subtitle -->
        <h2 class="text-2xl mt-3">{{ data.subtitle }}</h2>
        <PostSortTimeHandler
          :sort="data.sort"
          :time="data.createdAt"></PostSortTimeHandler>
      </div>
      <SeparatorLine class="mt-5" />
      <div
        v-html="data.content"
        class="ck-content"></div>
    </UILayoutAlignCenter>
  </article>
</template>

<script setup lang="ts">
  const postsUrl: string = '/api/test_find_post_data';
  const route = useRoute();
  const { data, pending, error } = await useFetch<any>(postsUrl, {
    query: { id: route.params.id },
  });

  onBeforeMount(() => {
    if (!data.value) back();
  });

  async function back() {
    await navigateTo('/');
  }
</script>

<style lang="scss" scoped>
  @import './../../assets/scss/ckeditor.scss';
</style>
