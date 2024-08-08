<template>
  <div v-if="dos">
    <ul>
      <li
        @click="currentPage = i - 1"
        v-for="i in dos"
        :key="i">
        {{ i }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps(['max', 'current']);
  const currentPage: Ref<number> = ref(0);

  const dos = computed(() => {
    const showPerPage = 2;
    const range = 2;
    const totalPages = Math.ceil(props.max / showPerPage);
    const scopes = Math.ceil(totalPages / range);
    const lists = Array.from({ length: props.max }, (v, k) => k).splice(
      currentPage.value * 3,
      showPerPage
    );

    // if(currentPage.value <= )

    console.log(currentPage);

    return currentPage.value + range;
  });
</script>
