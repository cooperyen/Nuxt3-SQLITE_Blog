<template>
  <div :class="{ 'overflow-y-auto h-[calc(100vh)]': showSearch }">
    <ClientAppHeader @update:showSearch="(el:boolean) => (showSearch = el)" />
    <div class="relative top-0">
      <NuxtPage />
    </div>
    <!-- <ClientAppFooter></ClientAppFooter> -->
  </div>
</template>

<script setup lang="ts">
  const showSearch: Ref<boolean> = ref(false);
  const defaultDescription =
    '華生將是您戮力於ESG企業的最佳夥伴！60餘年歷史，飲水專家，歡迎前來華生水水工廠體驗館。擁有最先進高科技淨水設備，主要販售飲水機、瓶裝水、桶裝水，每日檢驗讓您安心喝好水。提供多項優惠組合，歡迎選購。';

  const title = '華生水資源';
  const ogImg = '/og_logo.jpg';
  const seo: any = {
    title: title,
    ogTitle: title,
    ogDescription: defaultDescription,
    description: defaultDescription,
    ogImage: ogImg,
    ogUrl: 'https://blog.hwaseng.com.tw',
    twitterTitle: title,
    twitterDescription: defaultDescription,
    twitterImage: ogImg,
    twitterCard: 'summary',
  };

  useSeoMeta(seo);

  useHeadSafe({
    htmlAttrs: {
      lang: 'zh-TW',
    },
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon.ico',
      },
    ],
  });
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/_default.scss';
</style>
