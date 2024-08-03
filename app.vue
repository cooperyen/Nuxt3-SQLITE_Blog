<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
  import 'default-passive-events';
</script>

<style lang="scss">
  .layout-enter-active,
  .layout-leave-active {
    transition: all 0.4s;
  }
  .layout-enter-from,
  .layout-leave-to {
    filter: blur(1rem);
  }

  .side-enter-active,
  .side-leave-active {
    transition: all 0.4s;
  }
  .side-enter-from,
  .side-leave-to {
    filter: blur(1rem);
  }

  .page-enter-active,
  .page-leave-active {
    transition: all 0.4s;
  }
  .page-enter-from,
  .page-leave-to {
    filter: blur(1rem);
  }
</style>
