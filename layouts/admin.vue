<template>
  <div class="lg:flex">
    <AdminMenu class="bg-white"></AdminMenu>
    <!-- overflow-y-hidden h-screen -->
    <div
      class="absolute first-line:max-lg:mr-auto right-0 w-full lg:w-[calc(100%-12rem)] overflow-x-hidden">
      <!--  overflow-y-scroll h-full -->
      <div class="lg:ml-2 lg:px-10 px-3">
        <div class="max-md:mt-5 mt-12">
          <nuxt-page />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // onMounted(() => {
  //   document.body.style.backgroundColor = '#efefef'; // 设置背景颜色
  // });
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/_default.scss';
</style>

<style>
  body {
    background-color: #efefef;
  }
</style>
