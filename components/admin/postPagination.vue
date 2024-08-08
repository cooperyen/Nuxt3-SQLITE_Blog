<template>
  <div v-if="dots">
    <ul>
      <li
        @click="currentPage = i"
        v-for="i in dots"
        :key="i">
        {{ i }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps(['max', 'current']);
  const currentPage: Ref<number> = ref(1);

  const dots = computed(() => {
    // 每頁顯示文章數
    const showPerPage = 3;
    // 每次顯示幾個分頁
    const range = 6;
    // 總計幾頁
    const totalPages = Math.ceil(40 / showPerPage);
    const lists = Array.from({ length: totalPages }, (v, k) => k + 1);
    const currPage = currentPage.value;

    let res;
    if (currPage === 1) res = lists.slice(currPage - 1, range);

    if (currPage != 1 && currPage != totalPages) {
      if (totalPages <= range) res = lists.slice(0, range);

      if (totalPages > range)
        res = lists.slice(currPage - Math.ceil(range / 2), currPage + 1);
    }

    if (currPage != 1 && currPage === totalPages)
      res = lists.slice(
        currPage - range <= 0 ? 0 : currPage - range,
        totalPages
      );

    console.log(res);

    return res;
  });
</script>
