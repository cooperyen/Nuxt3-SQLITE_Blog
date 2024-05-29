<template>
  <AppHeader @update:showSearch="(el:boolean) => (showSearch = el)" />

  <main :class="{ 'overflow-y-auto h-[calc(100vh_-_5rem)]': showSearch }">
    <div class="w-full max-w-4xl mr-auto ml-auto mt-14">
      <IndexPosts :data="data"></IndexPosts>
    </div>
  </main>
</template>

<script setup lang="ts">
  const postsUrl: string = '/api/post/postFullList';
  const nums: Ref<number> = ref(10);
  const showSearch: Ref<boolean> = ref(false);

  const { data, pending, error, refresh } = await useFetch(postsUrl, {
    query: { postNum: nums },
    lazy: true,
    immediate: true,
  });
</script>
