<template>
  <div class="text-white">
    <div class="flex gap-5">
      <div>
        <NuxtLink to="/articles">
          <font-awesome-icon
            class="mr-1"
            :icon="['fas', 'book-open']" />
          {{ post?.postLength }}
        </NuxtLink>
      </div>
      <div>
        <NuxtLink to="/tags">
          <font-awesome-icon
            class="mr-1"
            :icon="['fas', 'tag']" />
          {{ post?.tagLength }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const postsUrl: string = '/api/article/infoFull';
  const emit = defineEmits(['update:showSearch']);

  const {
    data: post,
    error,
    refresh,
  } = await useFetch<any>(postsUrl, {
    lazy: true,
    immediate: true,
  });
</script>
