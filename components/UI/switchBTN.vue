<template>
  <!-- switch button -->
  <div class="inline-flex items-center">
    <label :class="{ 'cursor-pointer': !disabled }">
      <input
        type="checkbox"
        class="sr-only peer"
        @click="click"
        :value="FinalStatus"
        :checked="props.status"
        :disabled="disabled" />
      <div
        class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-mian_color"></div>
    </label>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{ status?: boolean; disabled?: boolean }>();
  const emit = defineEmits<{ 'update:status': [vlaue: boolean] }>();
  const switchStatus: Ref<boolean> = ref(props.status || false);
  const FinalStatus = computed(() => {
    const value: boolean = switchStatus.value;
    emit('update:status', switchStatus.value);
    return value;
  });
  function click() {
    switchStatus.value = !switchStatus.value;
  }
</script>
