<template>
  <div v-if="dos">
    {{ postCount }}
  </div>
</template>

<script setup lang="ts">
  const postsCount: string = '/api/postCount';
  const props = defineProps(['refresh']);

  const dos = computed(() => {
    console.log(props.refresh);
    refresh();
    return true;
  });

  const { data: postCount, refresh } = await useFetch(postsCount, {
    lazy: true,
    immediate: true,
  });
</script>
