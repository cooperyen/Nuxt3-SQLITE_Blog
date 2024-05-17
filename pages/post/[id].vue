<template>
  <article v-if="data">
    <UILayoutAlignCenter class="max-w-3xl justify-center mt-10 px-5">
      <div
        id="title"
        class="text-center">
        <h1 class="text-4xl font-bold">{{ data.title }}</h1>
        <h2 class="text-xl mt-4">{{ data.subtitle }}</h2>
      </div>
      <SeparatorLine class="mt-5" />
      <div v-html="data.content"></div>
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
