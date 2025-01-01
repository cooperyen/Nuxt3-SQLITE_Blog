<template>
  <template v-if="articleData">
    <article
      v-for="article in articleData"
      :key="article.id">
      <div
        v-if="article.publish"
        class="max-md:mb-10 rounded-2xl">
        <!-- img -->
        <div
          id="banner"
          class="border border-gray-150 aspect-[5/3.4] overflow-y-hidden rounded-2xl">
          <bannerHandler
            class="object-cover rounded-t-2xl"
            :postId="article.id"
            :alt="article.title">
          </bannerHandler>
        </div>

        <div class="py-2 px-1">
          <!-- title -->
          <div class="mt-2">
            <NuxtLink
              :to="`/article/${
                article.customUrl ? article.customUrl : article.id
              }`"
              class="text-[#263d56]">
              <div
                class="md:min-h-14 max-md:mb-3 flex md:hover:underline underline-offset-4 mb-2">
                <h2 class="font-bold text-xl mr-2">
                  {{ article.title }}
                </h2>
                <font-awesome-icon
                  class="rotate-45 mt-1.5 ml-auto"
                  :icon="['fas', 'arrow-up']" />
              </div>
            </NuxtLink>
            <h3
              class="text-sm mt-1 text-gray-500 md:min-h-10 md:max-h-10 o-text-ellipsis">
              {{ article.subtitle }}
            </h3>
          </div>
          <!-- Sort and time -->
          <div class="text-xs mt-2">
            <postSortTimeHandler
              :dark="true"
              :tags="article.sort"
              :time="article.createdAt"></postSortTimeHandler>
          </div>
        </div>
      </div>
    </article>
  </template>
</template>

<script setup lang="ts">
// dynamic component.
const bannerHandler = defineAsyncComponent(
  () => import("~/components/common/bannerHandler.vue")
);
const postSortTimeHandler = defineAsyncComponent(
  () => import("~/components/client/postSortTimeHandler.vue")
);

const props = defineProps(["data"]);

const articleData = computed(() => (props.data ? props.data : false));
</script>

<style lang="scss">
.o-text-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
