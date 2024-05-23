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
    lazy: true,
    immediate: true,
  });
  console.log('index/' + data.value);
</script>

<style lang="scss">
  ol {
    list-style-type: circle;
  }
  ul {
    list-style-type: disc;
  }
  ul,
  ol {
    display: block;
    margin-top: 1em;
    margin-bottom: 1em;
    margin-left: 0;
    margin-right: 0;
    padding-left: 40px;
  }
</style>
