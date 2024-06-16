<template>
  <template
    v-for="blog in props.data"
    :key="blog">
    <div
      v-if="blog.publish"
      class="ml-5 mr-5 mb-5 mt-5 pb-7 border-b border-b-gray-500 border-opacity-30">
      <!-- title -->
      <div class="mb-2">
        <h2 class="font-bold text-3xl mb-1">
          <NuxtLink
            :to="`/post/${blog.id}`"
            class="text-[#263d56] lg:hover:underline"
            >{{ blog.title }}</NuxtLink
          >
        </h2>
        <h3 class="text-xl mt-2 text-gray-600">{{ blog.subtitle }}</h3>
      </div>
      <!-- Sort and time -->
      <div class="text-sm mb-5 mt-3 text-gray-500">
        <PostSortTimeHandler
          :sort="blog.sort"
          :time="blog.createdAt"></PostSortTimeHandler>
      </div>
      <!-- img -->
      <div id="banner">
        <BannerHander
          :data="data"
          :postId="blog.id">
        </BannerHander>
      </div>
      <!-- direct to -->
      <div class="mb-5 mt-5">
        <div class="w-40 text-lg mx-auto text-center rounded-md">
          <NuxtLink
            :to="`/post/${blog.customUrl === '' ? blog.id : blog.customUrl}`"
            class="border lg:hover:border-[#263d56] lg:hover:bg-[#263d56] lg:hover:text-white ease-in duration-200 px-3 py-1 rounded-md">
            閱讀全文
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- {{ bannerImg }} -->
  </template>
</template>

<script setup lang="ts">
  const props = defineProps(['data']);
</script>
