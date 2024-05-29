<template>
  <div>
    <h1 class="text-3xl font-bold underline">Welcome to the about</h1>
  </div>
</template>

<script setup lang="ts">
  const postsUrl: string = '/api/post/shortPostFullList';
  const route = useRoute();
  const showSearch: Ref<boolean> = ref(false);

  const { data, pending, error, refresh } = await useFetch(postsUrl, {
    query: { sort: route.params.id },
    lazy: true,
    immediate: true,
  });

  console.log(data.value);
</script>
