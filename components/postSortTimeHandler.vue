<template>
  <!-- time -->
  <div class="mt-3 flex items-center text-gray-500">
    <div><font-awesome-icon :icon="['fas', 'calendar-days']" /></div>
    <span class="pl-1.5">{{ $sortDate(props.time) }}</span>
  </div>
  <!-- sort -->
  <div
    v-show="props.sort.length > 0"
    class="mt-1 items-center flex text-gray-500">
    <div>
      <font-awesome-icon :icon="['fas', 'box']" />
    </div>
    <ul class="flex pl-2.5 m-0 items-center">
      <li
        class="list-none"
        v-for="(val, index) in props.sort.split(',')"
        :key="index">
        {{ index === 0 ? '' : '、' }}{{ val }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps(['sort', 'time']);
</script>
