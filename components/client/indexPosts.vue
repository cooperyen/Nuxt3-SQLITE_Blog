<template>
  <article
    v-for="article in props.data"
    :key="article.id">
    <div
      v-if="article.publish"
      class="border border-gray-150 max-md:mb-10 rounded-md">
      <NuxtLink
        :to="`/article/${article.customUrl ? article.customUrl : article.id}`"
        class="text-[#263d56] md:hover:underline">
        <!-- img -->
        <div
          id="banner"
          class="lg:max-h-[200px] overflow-y-hidden rounded-t-md">
          <CommonBannerHandler
            class="md:object-cover md:aspect-video rounded-t-md"
            :postId="article.id"
            :alt="article.title">
          </CommonBannerHandler>
        </div>

        <div class="px-3 py-2">
          <!-- title -->
          <div class="mt-2">
            <h2 class="font-bold text-2xl">
              {{ article.title }}
            </h2>
            <h3 class="text-md text-gray-600">{{ article.subtitle }}</h3>
          </div>
          <!-- Sort and time -->
          <div class="text-xs mt-5 text-gray-500">
            <PostSortTimeHandler
              :tags="article.sort"
              :time="article.createdAt"></PostSortTimeHandler>
          </div>
        </div>
      </NuxtLink>
    </div>
  </article>
</template>

<script setup lang="ts">
  const props = defineProps(['data']);
</script>
