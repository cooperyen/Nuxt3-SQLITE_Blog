<template>
  <div>
    <div class="bg-slate-100 p-10 bg-cover min-h-96 flex items-center">
      <div class="max-w-7xl mx-auto">
        <h1>華生水資源有限公司</h1>
        <p>Since 1999</p>
        <p>
          華生自1959年成立至今近60年歷史，專業誠信可靠，秉持著「健康、純淨、喝好水」的理念服務社會，並且追求我們的核心價值節能減碳愛護地球。
          從華笙行的手工生產，至民國75年台灣先例從國外引進最新自動化機具生產，並同時汰換掉沈重、易碎不安全的玻璃瓶，改用較為輕便、安全的PC塑鋼瓶，又於民國100年全面汰換有雙酚A致癌疑慮的PC瓶改為安全衛生之PET寶特瓶。帶領桶裝飲用水走入新紀元。
        </p>
      </div>
    </div>
    <main>
      <div
        class="w-full mt-5 md:mt-10 max-xl:px-5 max-w-7xl mr-auto ml-auto bg-white md:grid md:gap-x-5 md:gap-y-8 md:grid-cols-3">
        <clientIndexPosts :data="data"></clientIndexPosts>
      </div>
    </main>

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
  const postsUrl: string = '/api/post/postFullList';
  const nums: Ref<number> = ref(4);

  const { data } = await useFetch<any>('/api/post/postFullList', {
    query: { postNum: nums },
  });

  const { data: fullListLength } = await useFetch<any>('/api/post/postLength');

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
