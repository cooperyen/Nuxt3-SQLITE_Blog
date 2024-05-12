<template>
  <main>
    <!-- <NewPost></NewPost> -->
    <TheCkeditor @editorData="editorData"></TheCkeditor>

    {{ nums }}
  </main>
</template>

<script setup lang="ts">
  const URL: string = '/api/test-new-post';
  const findURL: string = '/api/test_find_post_data';

  const nums: Ref<string> = ref('');

  // const { data, pending, error } = await useFetch(findURL, {
  //   params: { blog: nums },
  // });

  onBeforeMount(() => {});
  onMounted(() => {});

  function editorData(el: any) {
    nums.value = el;
  }
</script>

<style lang="scss">
  h1 {
    color: $primary;
  }
</style>
