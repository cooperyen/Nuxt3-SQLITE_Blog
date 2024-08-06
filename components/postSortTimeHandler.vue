<template>
  <!-- time -->
  <div class="mt-3 flex items-center text-gray-500">
    <div><font-awesome-icon :icon="['fas', 'calendar-days']" /></div>
    <span class="pl-1.5">{{ $sortDate(props.time) }}</span>
  </div>
  <!-- sort -->
  <div
    v-show="props.tags.length > 0"
    class="mt-1 items-center flex text-gray-500">
    <div>
      <font-awesome-icon :icon="['fas', 'box']" />
    </div>
    <ul
      class="flex pl-2.5 m-0 items-center"
      v-if="props.tags.length != 0">
      <li
        class="list-none"
        v-for="(tag, index) in props.tags.split(',')"
        :key="index">
        <NuxtLink
          v-if="linkOpen"
          class="text-cyan-600"
          :to="'/tag/' + tag">
          {{ index === 0 ? '' : '、' }}{{ tag }}
        </NuxtLink>
        <span v-else> {{ index === 0 ? '' : '、' }}{{ tag }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps(['tags', 'time', 'linkOpen']);
</script>
