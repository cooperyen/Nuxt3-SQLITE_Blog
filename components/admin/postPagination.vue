<template>
  <div v-if="dots">
    <ul class="flex">
      <li
        class="cursor-pointer mx-2 text-blue-300"
        :class="{ 'text-blue-900 font-bold': props.currentPage === i }"
        @click="emits('update:currentPage', i)"
        v-for="i in dots"
        :key="i">
        {{ i }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps(['max', 'currentPage', 'range', 'showPerPage']);
  const emits = defineEmits(['update:currentPage']);

  const dots = computed(() => {
    // 每頁顯示文章數
    const showPerPage = props.showPerPage ? props.showPerPage : 1;
    // 每次顯示幾個分頁
    const range = props.range ? props.range : 5;
    // 總計幾頁
    const totalPages = Math.ceil(props.max / showPerPage);
    const pagesArray = Array.from({ length: totalPages }, (v, k) => k + 1);

    let res;

    // first load or when page equals 1.
    if (props.currentPage === 1)
      res = pagesArray.slice(props.currentPage - 1, range);

    // click to switch page.
    if (props.currentPage != 1) {
      // when not last page.
      if (props.currentPage != totalPages) {
        // when page number is under range number, keep in range.
        if (totalPages <= range) res = pagesArray.slice(0, range);
        // when total pages over than range, and page number is under range number.
        else if (totalPages > range && props.currentPage < range)
          res = pagesArray.slice(0, range);
        // when is last 2 page.
        else if (totalPages - props.currentPage === 1)
          res = pagesArray.slice(props.currentPage - (range - 1), totalPages);
        // not equal above.
        else
          res = pagesArray.slice(props.currentPage - 3, props.currentPage + 2);
      }
      // when is last page.
      if (props.currentPage === totalPages)
        res = pagesArray.slice(props.currentPage - range, totalPages);
    }

    console.log(res);

    return res;
  });
</script>
