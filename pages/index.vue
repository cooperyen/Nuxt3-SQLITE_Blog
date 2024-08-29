<template>
  <div class="w-full max-xl:px-5 max-w-7xl mr-auto ml-auto">
    <ClientPinTopArticle></ClientPinTopArticle>

    <main>
      <div
        class="mt-5 md:mt-10 bg-white md:grid md:gap-x-5 md:gap-y-8 md:grid-cols-3">
        <clientIndexPosts :data="articles"></clientIndexPosts>
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

  const nums: Ref<number> = ref(4);

  const { data } = await useFetch<any>('/api/article/findManyArticles', {
    method: 'GET',
    query: {
      postNum: nums,
      id: true,
      title: true,
      createdAt: true,
      sort: true,
      content: true,
      publish: true,
    },
  });
  const articles = computed(() => {
    const val = data.value;
    if (val.state === 200) return data.value.data;
    else return null;
  });

  const { data: fullListLength } = await useFetch<any>(
    '/api/article/postLength'
  );

  const isLoadings = computed(() => {
    if (data.value) return nums.value > fullListLength.value;
    else return false;
  });

  onMounted(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      // if intersectionRatio === 0, means out of visible area
      if (entries[0].intersectionRatio <= 0) return;

      nums.value += 6;

      if (nums.value > fullListLength.value) intersectionObserver.disconnect();
    });

    // console.log(document.querySelector('.dataLoader'));

    // dataLoader listener
    const dataLoader = document.querySelector('.dataLoader') as HTMLElement;
    intersectionObserver.observe(dataLoader);
  });
</script>
