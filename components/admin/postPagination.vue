<template>
  <div
    v-if="dots"
    class="m-10 select-none">
    <ul class="flex justify-center">
      <!-- pre -->
      <li v-show="pre">
        <font-awesome-icon
          class="cursor-pointer"
          @click="pageReduce"
          :icon="['fas', 'caret-left']" />
      </li>
      <!-- first page -->
      <li
        v-show="firstPage"
        @click="goFirstPage"
        class="cursor-pointer ml-2 text-blue-300">
        1...
      </li>
      <li
        class="cursor-pointer mx-2 text-blue-300"
        :class="{ 'text-blue-900 font-bold': props.currentPage === i }"
        @click="emits('update:currentPage', i)"
        v-for="i in dots"
        :key="i">
        {{ i }}
      </li>
      <!-- last page -->
      <li
        v-show="lastPage"
        @click="goLastPage"
        class="cursor-pointer mr-2 text-blue-300">
        ...{{ totalPages }}
      </li>
      <!-- next -->
      <li v-show="next">
        <font-awesome-icon
          class="cursor-pointer"
          @click="increase"
          :icon="['fas', 'caret-right']" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps([
    'max',
    'currentPage',
    'range',
    'showPerPage',
    'max',
  ]);
  const emits = defineEmits(['update:currentPage']);
  const pre = computed(() => {
    let res: number = 0;
    if (dots.value.length != 0) res = Math.min(...dots.value);

    return res <= 1 ? false : true;
  });

  const maxPage = computed(() =>
    props.max?.state === 200 ? props.max.data : 0
  );

  // 總計幾頁
  const totalPages = computed(() =>
    Math.ceil(maxPage.value / props.showPerPage)
  );

  function pageReduce() {
    emits('update:currentPage', props.currentPage - 1);
  }

  function increase() {
    if (props.currentPage + 1 < maxPage.value)
      emits('update:currentPage', props.currentPage + 1);
  }

  function goLastPage() {
    emits('update:currentPage', totalPages.value);
  }
  function goFirstPage() {
    emits('update:currentPage', 1);
  }

  const rangeDefault = 5;

  const lastPage = computed(() => {
    let res = false;
    if (totalPages.value > 5)
      res = totalPages.value - props.currentPage > 2 ? true : false;

    return res;
  });
  const firstPage = computed(() => (props.currentPage >= 5 ? true : false));

  const next = computed(() => {
    const currentPage = props.currentPage;
    const range = props.range ? props.range : rangeDefault;
    const max = maxPage.value;

    let res = false;
    if (totalPages.value > 5 && totalPages.value - currentPage > 2)
      res = max - currentPage > range + 1 ? true : false;

    console.log(totalPages.value, currentPage);
    return res;
  });

  const dots = computed(() => {
    // 每頁顯示文章數
    const showPerPage = props.showPerPage ? props.showPerPage : 1;
    // 每次顯示幾個分頁
    const range = props.range ? props.range : rangeDefault;
    // 總計幾頁
    const pagesArray = Array.from(
      { length: totalPages.value },
      (v, k) => k + 1
    );

    let res: Array<number> = [];

    // first load or when page equals 1.
    if (props.currentPage === 1)
      res = pagesArray.slice(props.currentPage - 1, range);

    // click to switch page.
    if (props.currentPage != 1) {
      // when not last page.
      if (props.currentPage != totalPages.value) {
        // when page number is under range number, keep in range.
        if (totalPages.value <= range) res = pagesArray.slice(0, range);
        // when total pages over than range, and page number is under range number.
        else if (totalPages.value > range && props.currentPage < range)
          res = pagesArray.slice(0, range);
        // when is last 2 page.
        else if (totalPages.value - props.currentPage === 1)
          res = pagesArray.slice(
            props.currentPage - (range - 1),
            totalPages.value
          );
        // not equal above.
        else
          res = pagesArray.slice(props.currentPage - 3, props.currentPage + 2);
      }
      // when is last page.
      if (props.currentPage === totalPages.value)
        res = pagesArray.slice(
          props.currentPage - range < 0 ? 0 : props.currentPage - range,
          totalPages.value
        );
    }

    return res;
  });
</script>
