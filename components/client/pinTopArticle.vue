<template>
  <article v-if="article">
    <div class="max-md:mb-10 md:relative">
      <!-- img -->
      <div
        id="banner"
        class="aspect-[5/2.4] overflow-y-hidden">
        <bannerHandler
          class="object-cover rounded-2xl"
          :postId="article.id"
          :alt="article.title">
        </bannerHandler>
      </div>
      <!-- text -->

      <div
        class="md:px-28 py-2 md:py-3 md:absolute md:bottom-8 md:w-full md:min-h-32">
        <div
          class="md:rounded-xl md:p-5 md:backdrop-blur md:bg-gray-500/50 md:border md:border-gray-100/40 md:text-shadow">
          <!-- title -->
          <NuxtLink
            :to="`/article/${articleUrl}`"
            class="text-[#263d56] group">
            <div class="max-md:mt-2">
              <div
                class="max-md:mb-3 flex md:hover:underline underline-offset-8 mb-2 md:text-gray-200">
                <h2 class="font-bold text-xl md:text-3xl mr-2">
                  {{ article.title }}
                </h2>
                <font-awesome-icon
                  class="rotate-45 mt-1.5 ml-auto"
                  :icon="['fas', 'arrow-up']" />
              </div>

              <h3
                class="text-md md:text-xl max-md:text-sm mt-1 text-gray-600 md:text-gray-200">
                {{ article.subtitle }}
              </h3>
            </div>
          </NuxtLink>

          <!-- Sort and time -->
          <div class="text-xs md:mt-5">
            <postSortTimeHandler
              :dark="isMd"
              :color="'md:text-gray-300'"
              :tags="article.sort"
              :time="article.createdAt"></postSortTimeHandler>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { useWindowSize } from "@vueuse/core";
const { width } = useWindowSize();

const isMd = computed(() => width.value < 768);

const { data } = await useFetch<any>("/api/article/pinTopArticle");

const bannerHandler = defineAsyncComponent(
  () => import("~/components/common/bannerHandler.vue")
);

const postSortTimeHandler = defineAsyncComponent(
  () => import("~/components/client/postSortTimeHandler.vue")
);

const article = computed(() => {
  if (data.value) return data.value;
  else return null;
});

const articleUrl = computed(() => {
  if (article.value)
    return article.value.customUrl ? article.value.customUrl : article.value.id;
  else return null;
});
</script>

<style lang="scss">
.text-shadow {
  text-shadow: 0 0px 4px rgba(0, 0, 0, 0.4);
}
</style>
