<template>
  <template v-if="data">
    {{ data }}
    <!--  -->
    <section class="w-full max-w-4xl mr-auto ml-auto px-3 sm:px-5">
      <div id="title">
        <h1 class="text-4xl font-bold">{{ data.title }}</h1>
        <h2 class="text-xl mt-4">{{ data.secTitle }}</h2>
      </div>
      <g_b></g_b>
    </section>
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
