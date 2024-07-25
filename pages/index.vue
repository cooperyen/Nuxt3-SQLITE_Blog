<template>
  <main>
    <div class="w-full max-w-4xl mr-auto ml-auto bg-white">
      <clientIndexPosts :data="data"></clientIndexPosts>
    </div>
  </main>
  <div class="dataLoader">
    <span v-if="isLoading">
      Loading
    </span>
    <span v-else>done</span>
  </div>
</template>

<script setup lang="ts">
  const postsUrl: string = '/api/post/postFullList';
  const nums: Ref<number> = ref(2);
  const isLoading: Ref<Boolean> = ref(true);


  const { data, pending, error, refresh } = await useFetch<any>(postsUrl, {
    query: { postNum: nums },
    lazy: true,
    immediate: true,
  }) ;

  onMounted(() => {
    const intersectionObserver = new IntersectionObserver((entries) => {
      // 如果 intersectionRatio 为 0，则目标在视野外，
      // 我们不需要做任何事情。
      if (entries[0].intersectionRatio <= 0) return;

      const totalLength:number = data.value.length;

      if(nums.value > totalLength) {
        intersectionObserver.disconnect();
        isLoading.value = false;
      } else {
        nums.value += 2;
        console.log('Loaded new items');
      }

    });
    // 开始监听
    const dataLoader = document.querySelector('.dataLoader') as HTMLElement;
    intersectionObserver.observe(dataLoader);
  });
</script>
