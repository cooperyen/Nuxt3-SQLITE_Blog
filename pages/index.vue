<template>
  <main>
    <div class="w-full max-w-4xl mr-auto ml-auto">
      <IndexPosts :data="data"></IndexPosts>
      <!-- <button @click="refresh()">Refresh data</button> -->
    </div>
  </main>
</template>

<script setup lang="ts">
  const postsUrl: string = '/api/testFindBlogShort';
  const nums: Ref<number> = ref(10);
  const { data, pending, error, refresh } = await useFetch(postsUrl, {
    query: { postNum: nums },
  });
</script>
