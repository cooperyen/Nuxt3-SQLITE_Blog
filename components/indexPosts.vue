<template>
  <template
    v-for="blog in props.data"
    :key="blog">
    <div
      v-if="blog.publish"
      class="ml-5 mr-5 mb-5 mt-5 border-b border-b-gray-500 border-opacity-30">
      <!-- title -->
      <div class="mb-2">
        <h2 class="font-bold text-3xl mb-1">{{ blog.title }}</h2>
        <h3 class="text-xl mt-2 text-gray-600">{{ blog.subtitle }}</h3>
      </div>
      <!-- time -->
      <div class="text-sm mb-5 mt-3 italic text-gray-500">
        發表於 {{ getTime(blog.createdAt) }}
      </div>
      <!-- img -->
      <div id="banner">
        <nuxt-img
          class="w-full"
          fit="inside"
          :src="imgs([blog.id])"
          loading="lazy" />
      </div>
      <!-- direct to -->
      <div class="mb-5 mt-5">
        <NuxtLink :to="`/post/${blog.id}`">閱讀全文</NuxtLink>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
  const route = useRoute();
  const props = defineProps(['data']);

  const bannerImg: Ref<any> = ref({});
  const defaultBannerImg: string = '/postImg/default_banner.jpg';

  function imgs(el: any) {
    const res = bannerImg.value[el];
    if (res === 'fail' || res === undefined) return defaultBannerImg;
    else return res;
  }

  watch(
    props.data,
    (el) => {
      el.forEach(async (element: any) => {
        const id = element.id;
        const path = await findBanner(element.id);
        bannerImg.value[id] = path;
      });
    },
    { immediate: true }
  );

  async function findBanner(id: string) {
    const res = await $fetch('/api/findBannerImg', {
      method: 'POST',
      body: { id },
    });
    return res;
  }

  function getTime(el: string) {
    let res: any = '';
    const time = new Date(el);
    res = `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
    return res;
  }

  onBeforeMount(() => {
    // getBanner(props.data);
  });
</script>
