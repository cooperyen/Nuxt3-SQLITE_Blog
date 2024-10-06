<template>
  <div class="w-full max-xl:px-5 max-w-7xl mt-10 md:mt-5 mx-auto">
    <main>
      <ClientPinTopArticle></ClientPinTopArticle>
      <div
        class="mt-5 md:mt-10 bg-white md:grid md:gap-x-5 md:gap-y-8 md:grid-cols-3">
        <indexPosts :data="articles"></indexPosts>
      </div>
    </main>

    <!-- loading -->
    <div class="dataLoader mt-20">
      <button
        v-show="!isLoadings"
        type="button"
        class="flex items-center mx-auto"
        disabled>
        <font-awesome-icon
          class="animate-spin mr-1"
          :icon="['fas', 'spinner']" />
        Processing...
      </button>
      <span
        class="text-center block"
        v-show="isLoadings">
        - END -
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
  useHead({
    title: `華生水資源 Blog | 環保、減碳、減塑`,
  });

  import { useWindowSize } from '@vueuse/core';

  // window viewpoint.
  const { width, height } = useWindowSize();

  // dynamic component.
  const indexPosts = defineAsyncComponent(
    () => import('~/components/client/indexPosts.vue')
  );

  const articleNums: Ref<number> = ref(3);

  const { data } = await useFetch<any>('/api/article/findManyArticles', {
    method: 'GET',
    query: {
      postNum: articleNums,
      select: {
        id: true,
        title: true,
        createdAt: true,
        sort: true,
        content: true,
        publish: true,
        subtitle: true,
      },
    },
  });
  const articles = computed(() => {
    const val = data.value;
    if (val?.state === 200) return data.value.data;
    else return null;
  });

  const { data: articleLengthAPI } = await useFetch<any>(
    '/api/article/totalArticleLength'
  );

  const articleLength = computed(() => {
    if (articleLengthAPI.value.state === 200)
      return articleLengthAPI.value.data;
    else return 0;
  });

  const isLoadings = computed(() => {
    if (data.value) return articleNums.value > articleLength.value;
    else return false;
  });

  onMounted(() => {
    dynamicLoadingArticles();
  });

  function dynamicLoadingArticles() {
    const intersectionObserver = new IntersectionObserver((entries) => {
      // if intersectionRatio === 0, means out of visible area
      if (entries[0].intersectionRatio <= 0) return;

      if (width.value <= 767) articleNums.value += 2;
      else articleNums.value += 6;

      if (articleNums.value > articleLength.value)
        intersectionObserver.disconnect();
    });

    // dataLoader listener
    const dataLoader = document.querySelector('.dataLoader') as HTMLElement;
    intersectionObserver.observe(dataLoader);
  }
</script>
