<template>
  <div class="text-white">
    <div class="flex gap-5">
      <div>
        <font-awesome-icon
          class="mr-1"
          :icon="['fas', 'book-open']" />
        {{ post?.postLength }}
      </div>
      <div>
        <font-awesome-icon
          class="mr-1"
          :icon="['fas', 'tag']" />
        {{ post?.tagLength }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const postsUrl: string = '/api/post/infoFull';
  const emit = defineEmits(['update:showSearch']);

  const {
    data: post,
    pending,
    error,
    refresh,
  } = await useFetch<any>(postsUrl, {
    lazy: true,
    immediate: true,
  });
</script>
