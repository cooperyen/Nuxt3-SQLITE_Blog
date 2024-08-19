<template>
  <div
    v-for="blog in props.data"
    :key="blog">
    <NuxtLink
      :to="`/post/${blog.customUrl ? blog.customUrl: blog.id}`"
      class="text-[#263d56] lg:hover:underline">
      <div
        v-if="blog.publish"
        class="border border-gray-150 max-md:mb-10 rounded-md">
        <!-- img -->
        <div
          id="banner"
          class="lg:max-h-[200px] overflow-y-hidden rounded-t-md">
          <CommonBannerHandler
            class="md:object-cover md:h-full"
            :data="data"
            :postId="blog.id">
          </CommonBannerHandler>
        </div>
        <div class="px-3 py-2">
          <!-- title -->
          <div class="mt-2">
            <h2 class="font-bold text-2xl">
              {{ blog.title }}
            </h2>
            <h3 class="text-md text-gray-600">{{ blog.subtitle }}</h3>
          </div>
          <!-- Sort and time -->
          <div class="text-xs mt-5 text-gray-500">
            <PostSortTimeHandler
              :tags="blog.sort"
              :time="blog.createdAt"></PostSortTimeHandler>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps(['data']);
</script>
