<template>
  <div>
    <ClientAppHeader @update:showSearch="(el:boolean) => (showSearch = el)" />
    <div
      class="relative top-0"
      :class="{ 'overflow-y-auto h-[calc(100vh_-_8.5rem)]': showSearch }">
      <NuxtPage />
    </div>
    <ClientAppFooter></ClientAppFooter>
  </div>
</template>

<script setup lang="ts">
  const showSearch: Ref<boolean> = ref(false);
  const defaultDescription =
    '華生將是您戮力於ESG企業的最佳夥伴！60餘年歷史，飲水專家，歡迎前來華生水水工廠體驗館。擁有最先進高科技淨水設備，主要販售飲水機、瓶裝水、桶裝水，每日檢驗讓您安心喝好水。提供多項優惠組合，歡迎選購。';

  useHeadSafe({
    title: '華生水資源',
    meta: [
      {
        name: 'description',
        content: defaultDescription,
      },
    ],
  });
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/_default.scss';
</style>
