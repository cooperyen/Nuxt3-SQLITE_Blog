<template>
  <main>
    <!-- <NewPost></NewPost> -->
    <TheCkeditor></TheCkeditor>

    <div>data :{{ data }}</div>
    <div>error : {{ error }}</div>
  </main>
</template>

<script setup lang="ts">
  const URL: string = '/api/test-new-post';
  const findURL: string = '/api/test_find_post_data';

  const nums = ref(1);

  const { data, pending, error } = await useFetch(findURL, {
    params: { blog: nums },
  });

  onBeforeMount(() => {});
  onMounted(() => {});
</script>

<style lang="scss">
  h1 {
    color: $primary;
  }
</style>
