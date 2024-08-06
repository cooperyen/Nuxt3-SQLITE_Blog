<template>
  <template
    v-for="blog in props.data"
    :key="blog">
    <NuxtLink
      :to="`/post/${blog.id}`"
      class="text-[#263d56] lg:hover:underline">
      <div
        v-if="blog.publish"
        class="border border-gray-150 max-md:mb-10 rounded-md">
        <!-- img -->
        <div
          id="banner"
          class="lg:max-h-[200px] overflow-y-hidden rounded-t-md">
          <BannerHander
            class="md:object-cover md:h-full"
            :data="data"
            :postId="blog.id">
          </BannerHander>
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

        <!-- direct to -->
        <!-- <div class="mb-5 mt-5">
          <div class="w-40 text-lg mx-auto text-center rounded-md">
            <NuxtLink
            :to="`/post/${blog.customUrl === '' ? blog.id : blog.customUrl}`"
            class="border lg:hover:border-[#263d56] lg:hover:bg-[#263d56] lg:hover:text-white ease-in duration-200 px-3 py-1 rounded-md">
            閱讀全文
          </NuxtLink>
          </div>
        </div> -->
      </div>
    </NuxtLink>
    <!-- {{ bannerImg }} -->
  </template>
</template>

<script setup lang="ts">
  const props = defineProps(['data']);
  console.log(props.data);
</script>
