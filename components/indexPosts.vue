<template>
  <div
    class="ml-5 mr-5 mb-5 mt-5 border-b border-b-gray-500 border-opacity-30"
    v-for="blog in props.data"
    :key="blog">
    <!-- title -->
    <div class="mb-2">
      <h2 class="font-bold text-xl mb-1">{{ blog.title }}</h2>
      <h3>{{ blog.secTitle }}</h3>
    </div>
    <!-- time -->
    <div class="text-xs mb-5 mt-5">{{ getTiem(blog.createdAt) }}</div>
    <!-- direct to -->
    <div class="mb-5 mt-5">
      <NuxtLink :to="`/post/${blog.id}`">閱讀全文</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps(['data']);

  function getTiem(el: string) {
    let res: any = '';
    const time = new Date(el);
    res = `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
    return res;
  }
</script>
