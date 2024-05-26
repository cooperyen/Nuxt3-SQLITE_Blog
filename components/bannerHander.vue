<template>
  <nuxt-img
    v-if="bannerImg"
    class="w-full"
    fit="inside"
    :src="bannerImg"
    loading="lazy" />
</template>

<script setup lang="ts">
  const props = defineProps<{
    postId: string;
  }>();

  const emit = defineEmits(['update:banner']);
  const bannerImg: Ref<string> = ref('');
  const defaultBannerImg: string = '/postImg/default_banner.jpg';

  watch(
    () => props.postId,
    async (el: string) => {
      if (el != null) {
        await imgPath(el);
      }
    },
    { immediate: true }
  );

  async function imgPath(el: any) {
    const path = await findBanner(el);
    if (path != 'fail') bannerImg.value = path;
    if (path === 'fail') bannerImg.value = defaultBannerImg;
  }

  async function findBanner(id: string) {
    const res = await $fetch('/api/findBannerImg', {
      method: 'POST',
      body: { id },
    });
    return res;
  }
</script>
