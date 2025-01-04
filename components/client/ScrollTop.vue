<template>
  <div
    id="scroll-top"
    @click="scrollToTop"
    v-show="showScroll">
    <font-awesome-icon :icon="['fas', 'caret-up']" />
  </div>
</template>

<script setup lang="ts">

  const showScroll:Ref<Boolean> = ref(false);

  onMounted(() => {
    if (import.meta.client) window.addEventListener('scroll', windowH);
  });

  function scrollToTop() {
    if (import.meta.client)
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Smooth scroll
      });
  }
  function windowH() {
    showScroll.value = window.scrollY > window.innerHeight ? true : false;
  }
</script>

<style lang="scss" scoped>
  #scroll-top {
    cursor: pointer;
    position: fixed;
    right: 50px;
    bottom: 50px;
    z-index: 1;
    border: 1px solid rgba(0, 0, 0, 0.38);
    border-radius: 100%;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    transition: 0.2s;
    &:hover {
      background-color: #263d56;
      color: white;
      border-color: white;
    }
  }
</style>
