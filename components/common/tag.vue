<template>
  <div
    class="border rounded-full px-2 py-1 mr-1"
    :class="{ 'border-main-blue': props.dark }">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["dark"]);
</script>
