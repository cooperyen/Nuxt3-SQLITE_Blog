<template>
  <article
    class="mt-5"
    v-if="atricle.data">
    <div class="border border-gray-150 max-md:mb-10 rounded-md md:relative">
      <!-- img -->
      <div
        id="banner"
        class="md:w-full overflow-y-hidden max-md:rounded-t-md md:rounded-md">
        <CommonBannerHandler
          class="md:object-cover h-full"
          :postId="atricle.data.id">
        </CommonBannerHandler>
      </div>
      <!-- text -->
      <NuxtLink
        :to="`/post/${articleUrl}`"
        class="text-[#263d56] lg:hover:underline">
        <div
          class="px-3 py-2 md:py-3 md:px-5 md:absolute md:bottom-0 md:bg-black/[.6] md:w-full md:min-h-32 md:rounded-b-md">
          <!-- title -->
          <div class="max-md:mt-2">
            <h2
              class="font-bold text-2xl md:text-xl lg:text-2xl md:text-gray-200">
              {{ atricle.data.title }}
            </h2>
            <h3 class="lg:text-lg text-md text-gray-600 md:text-gray-200">
              {{ atricle.data.subtitle }}
            </h3>
          </div>
          <!-- Sort and time -->
          <div
            class="text-xs md:text-sm lg:text-base mt-5 md:mt-2 lg:mt-3 text-gray-500">
            <PostSortTimeHandler
              :color="'md:text-gray-300'"
              :tags="atricle.data.sort"
              :time="atricle.data.createdAt"></PostSortTimeHandler>
          </div>
        </div>
      </NuxtLink>
    </div>
  </article>

  <template v-if="atricle.state === 'sddfs'">
    <div class="relative w-full mt-5">
      <div
        class="absolute bottom-0 bg-black/[.6] w-full min-h-32 text-gray-200">
        <div class="mx-5 py-3">
          <h2 class="text-2xl">{{ atricle.data.title }}</h2>
          <p class="mt-2 text-xl">{{ atricle.data.subtitle }}</p>
          <PostSortTimeHandler
            :color="'text-gray-300'"
            :tags="atricle.data.sort"
            :time="atricle.data.createdAt"></PostSortTimeHandler>
        </div>
      </div>
      <!-- bg -->
      <div class="">
        <CommonBannerHandler
          class="w-full"
          :postId="atricle.data.id">
        </CommonBannerHandler>
      </div>
    </div>
  </template>
</template>

<script lang="ts" setup>
  const { data: atricle } = await useFetch<any>('/api/post/pinTopArticle');
  const articleUrl = computed(() =>
    atricle.value.data.customUrl ? atricle.value.data.customUrl : atricle.value.data.id
  );
</script>
