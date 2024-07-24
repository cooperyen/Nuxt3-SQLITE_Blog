<template>
  <head>
    <!-- <link rel="stylesheet" href="https://cdn.ckeditor.com/ckeditor5/42.0.1/ckeditor5.css" /> -->
  </head>


  <AppHeader @update:showSearch="(el:boolean) => (showSearch = el)" />
  <div
    class="mt-14 px-5"
    :class="{ 'overflow-y-auto h-[calc(100vh_-_8.5rem)]': showSearch }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  const showSearch: Ref<boolean> = ref(false);
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/_default.scss';
</style>
