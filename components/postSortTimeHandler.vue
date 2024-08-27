<template>
  <!-- time -->
  <div
    class="mt-3 flex items-center"
    :class="textColor">
    <div><font-awesome-icon :icon="['fas', 'calendar-days']" /></div>
    <span class="pl-1.5">{{ $sortDate(props.time) }}</span>
  </div>
  <!-- sort -->
  <div
    v-show="tags.length > 0"
    class="mt-1 items-center flex"
    :class="textColor">
    <div>
      <font-awesome-icon :icon="['fas', 'box']" />
    </div>
    <ul
      class="flex pl-1.5 m-0 items-center"
      v-if="tags.length != 0">
      <li
        class="list-none"
        v-for="(tag, index) in tags"
        :key="index">
        <div v-if="linkOpen">
          <span v-if="index != 0 && tags.length > 1">、</span>
          <NuxtLink
            class="text-cyan-600"
            :to="'/tag/' + tag">
            {{ tag }}
          </NuxtLink>
        </div>
        <span v-else>
          {{ index === 0 ? '' : tags.length > 1 ? '、' : '' }}{{ tag }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  const { $sortDate } = useNuxtApp();
  const props = defineProps(['tags', 'time', 'linkOpen', 'color']);
  const tags = computed(() => {
    return props.tags.split(',').filter((el: string) => el);
  });
  const textColor = computed(() =>
    props.color ? props.color : 'text-gray-500'
  );
</script>
