<template>
  <div>
    <h1 class="text-3xl font-bold underline">Welcome to the about</h1>
  </div>
</template>

<script setup>
  onBeforeMount(() => {
    console.log('onBeforeMount');
  });
  onMounted(() => {
    console.log('onMounted');
  });
</script>

<style lang="scss">
  h1 {
    color: $primary;
  }
</style>
