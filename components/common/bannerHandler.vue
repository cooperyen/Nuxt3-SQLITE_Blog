<template>
  <nuxt-img
    format="webp"
    class="w-full h-full"
    fit="inside"
    :src="imss"
    :alt="alt"
    width="1600"
    height="800"
    :loading="loading"
    preload />
</template>

<script setup lang="ts">
  const props = defineProps<{
    postId: string;
    tempImg?: string;
    alt?: string;
    loading?: any;
  }>();

  const hasError = ref(false);

  // Watch for the error attribute
  function handleError(event: any) {
    hasError.value = true;
  }

  const emit = defineEmits(['update:banner']);
  const bannerImg: Ref<string> = ref('');
  const defaultBannerImg: string = '/postImg/default_banner.jpg';
  const alt = computed(() => {
    return props.alt ? props.alt : 'banner';
  });
  const imss = computed(() => {
    let res: any = '';
    res = bannerImg.value || defaultBannerImg;
    if (props.tempImg) res = props.tempImg;
    return res;
  });

  const loading = computed(() => {
    return props.loading ? props.loading : undefined;
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
    const res = await $fetch<string>(
      '/api/article/findSingleArticleBannerPath',
      {
        method: 'POST',
        body: { id },
      }
    );
    return res;
  }
</script>
