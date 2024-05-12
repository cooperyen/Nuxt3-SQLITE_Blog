<template>
  <template v-if="data">
    {{ data }}
    <!--  -->
    <ArticleHandler>
      <div id="title">
        <h1 class="text-4xl font-bold">{{ data.title }}</h1>
        <h2 class="text-xl mt-4">{{ data.secTitle }}</h2>
      </div>
      <SeparatorLine />
    </ArticleHandler>
  </template>
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
