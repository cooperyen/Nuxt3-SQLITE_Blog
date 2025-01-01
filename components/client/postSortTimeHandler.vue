<template>
  <!-- time -->
  <div
    class="md:mt-3 mt-1 flex items-center"
    :class="textColor">
    <font-awesome-icon :icon="['fas', 'calendar']" />

    <span class="pl-1.5">{{ $shortTime(props.time) }}</span>
  </div>
  <!-- sort -->
  <div
    v-show="tags.length > 0"
    class="mt-2 items-center flex"
    :class="textColor">
    <ul
      class="flex m-0 items-center"
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
        <!-- <span v-else>
          {{ index === 0 ? "" : tags.length > 1 ? "、" : "" }}
          {{ tag }}
        </span> -->
        <template v-else>
          <tag :dark="props.dark">{{ tag }}</tag>
        </template>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { $shortTime } = useNuxtApp();
const props = defineProps(["tags", "time", "linkOpen", "color", "dark"]);
const tags = computed(() => {
  return props.tags.split(",").filter((el: string) => el);
});
const textColor = computed(() => (props.color ? props.color : "text-gray-600"));

const tag = defineAsyncComponent(() => import("~/components/common/tag.vue"));
</script>
