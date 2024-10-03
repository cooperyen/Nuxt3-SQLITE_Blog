<template>
  <template v-if="articleData">
    <article
      v-for="article in articleData"
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
            class="aspect-video overflow-y-hidden rounded-t-md">
            <bannerHandler
              class="object-cover rounded-t-md"
              :postId="article.id"
              :alt="article.title">
            </bannerHandler>
          </div>

          <div class="px-3 py-2">
            <!-- title -->
            <div class="mt-2">
              <h2 class="font-bold text-2xl max-md:text-lg">
                {{ article.title }}
              </h2>
              <h3 class="text-md max-md:text-sm mt-1 text-gray-600">
                {{ article.subtitle }}
              </h3>
            </div>
            <!-- Sort and time -->
            <div class="text-xs md:mt-5 text-gray-500">
              <postSortTimeHandler
                :tags="article.sort"
                :time="article.createdAt"></postSortTimeHandler>
            </div>
          </div>
        </NuxtLink>
      </div>
    </article>
  </template>
</template>

<script setup lang="ts">
  import { defineAsyncComponent } from 'vue';

  const bannerHandler = defineAsyncComponent(
    () => import('~/components/common/bannerHandler.vue')
  );

  const postSortTimeHandler = defineAsyncComponent(
    () => import('~/components/postSortTimeHandler.vue')
  );

  const props = defineProps(['data']);

  const articleData = computed(() => (props.data ? props.data : false));
</script>
