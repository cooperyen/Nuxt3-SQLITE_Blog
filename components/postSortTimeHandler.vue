<template>
  <!-- time -->
  <div class="text-base mt-3 flex items-center text-gray-500">
    <div><font-awesome-icon :icon="['fas', 'calendar-days']" /></div>
    <p class="pl-2.5">{{ getTime(props.time) }}</p>
  </div>
  <!-- sort -->
  <div class="mt-1 text-base items-center flex text-gray-500">
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

  function getTime(el: string) {
    let res: any = '';
    const time = new Date(el);
    res = `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
    return res;
  }
</script>
