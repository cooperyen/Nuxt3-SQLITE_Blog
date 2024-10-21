<template>
  <article v-if="article">
    <div class="border border-gray-150 max-md:mb-10 rounded-md md:relative">
      <NuxtLink
        :to="`/article/${articleUrl}`"
        class="text-[#263d56] group">
        <!-- img -->
        <div
          id="banner"
          class="max-md:aspect-video md:max-h-[400px] xl:max-h-[600px] overflow-y-hidden max-md:rounded-t-md md:rounded-md">
          <bannerHandler
            class="object-cover rounded-t-md"
            :postId="article.id"
            :alt="article.title">
          </bannerHandler>
        </div>
        <!-- text -->

        <div
          class="px-3 py-2 md:py-3 md:px-5 md:absolute md:bottom-0 md:group-hover:bg-white/[.9] md:bg-black/[.6] md:w-full md:min-h-32 md:rounded-b-md">
          <!-- title -->
          <div class="max-md:mt-2">
            <h2
              class="font-bold text-2xl lg:text-2xl max-md:text-lg md:text-gray-200 md:group-hover:text-black">
              {{ article.title }}
            </h2>
            <h3
              class="text-md max-md:text-sm mt-1 text-gray-600 md:text-gray-200 md:group-hover:text-black">
              {{ article.subtitle }}
            </h3>
          </div>
          <!-- Sort and time -->
          <div class="text-xs md:mt-5 text-gray-500">
            <postSortTimeHandler
              :color="'md:text-gray-300 md:group-hover:text-black'"
              :tags="article.sort"
              :time="article.createdAt"></postSortTimeHandler>
          </div>
        </div>
      </NuxtLink>
    </div>
  </article>
</template>

<script lang="ts" setup>
  const { data } = await useFetch<any>('/api/article/pinTopArticle');

  const bannerHandler = defineAsyncComponent(
    () => import('~/components/common/bannerHandler.vue')
  );

  const postSortTimeHandler = defineAsyncComponent(
    () => import('~/components/postSortTimeHandler.vue')
  );

  const article = computed(() => {
    if (data.value) return data.value;
    else return null;
  });

  const articleUrl = computed(() => {
    if (article.value)
      return article.value.customUrl
        ? article.value.customUrl
        : article.value.id;
    else return null;
  });
</script>
