<template>
  <nuxt-img
    class="w-full"
    fit="inside"
    :src="imss"
    loading="lazy" />
</template>

<script setup lang="ts">
  const props = defineProps<{
    postId: string;
    tempImg?: string;
  }>();

  const emit = defineEmits(['update:banner']);
  const bannerImg: Ref<string> = ref('');
  const defaultBannerImg: string = '/postImg/default_banner.jpg';
  const imss = computed(() => {
    let res: string = '';
    res = bannerImg.value || defaultBannerImg;
    if (props.tempImg) res = props.tempImg;
    return res;
  });

  watch(
    () => props.postId,
    async (el: string) => {
      if (el != null) await imgPath(el);
    },
    { immediate: true }
  );

  async function imgPath(el: string) {
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
