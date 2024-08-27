<template>
  <input
    v-model="parentValue"
    class="border-2 rounded-md py-2 px-3 w-full mt-1" />
</template>

<script setup lang="ts">
  const props = defineProps(['value']);
  const emit = defineEmits(['update:value']);
  const parentValue = computed({
    get() {
      return props.value;
    },
    set(val) {
      emit('update:value', val);
    },
  });
</script>
