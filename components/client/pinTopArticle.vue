<template>
  <article
    class=""
    v-if="article">
    <div class="border border-gray-150 max-md:mb-10 rounded-md md:relative">
      <NuxtLink
        :to="`/article/${articleUrl}`"
        class="text-[#263d56] group">
        <!-- img -->
        <div
          id="banner"
          class="md:w-full md:max-h-[400px] xl:max-h-[600px] overflow-y-hidden max-md:rounded-t-md md:rounded-md">
          <CommonBannerHandler
            class="md:object-cover md:aspect-video h-full"
            :postId="article.id"
            :alt="article.title">
          </CommonBannerHandler>
        </div>
        <!-- text -->

        <div
          class="px-3 py-2 md:py-3 md:px-5 md:absolute md:bottom-0 md:group-hover:bg-white/[.9] md:bg-black/[.6] md:w-full md:min-h-32 md:rounded-b-md">
          <!-- title -->
          <div class="max-md:mt-2">
            <h2
              class="font-bold text-2xl md:text-xl lg:text-2xl md:text-gray-200 md:group-hover:text-black">
              {{ article.title }}
            </h2>
            <h3
              class="lg:text-lg text-md text-gray-600 md:text-gray-200 md:group-hover:text-black">
              {{ article.subtitle }}
            </h3>
          </div>
          <!-- Sort and time -->
          <div
            class="text-xs md:text-sm lg:text-base mt-5 md:mt-2 lg:mt-3 text-gray-500">
            <PostSortTimeHandler
              :color="'md:text-gray-300 md:group-hover:text-black'"
              :tags="article.sort"
              :time="article.createdAt"></PostSortTimeHandler>
          </div>
        </div>
      </NuxtLink>
    </div>
  </article>
</template>

<script lang="ts" setup>
  const { data } = await useFetch<any>('/api/article/pinTopArticle');

  const article = computed(() => {
    const val = data.value;
    if (val?.state === 200) return data.value.data;
    else return null;
  });

  const articleUrl = computed(() =>
    article.value.customUrl ? article.value.customUrl : article.value.id
  );
</script>
