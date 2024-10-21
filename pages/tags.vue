<template>
  <UILayDefaultContainer>
    <div class="max-w-7xl mx-auto mt-20 text-center">
      <!-- title -->
      <div class="text-3xl font-bold">Tags</div>
      <div class="mt-5 md:mt-10 text-xl">
        目前標籤有 {{ tagsList ? Object.keys(tagsList).length : 0 }} 個
      </div>
    </div>

    <!-- tags -->
    <div
      class="max-w-4xl mx-auto mt-10 text-center"
      v-if="tagsList">
      <NuxtLink
        :to="`/tag/${val}`"
        :class="css"
        class="underline underline-offset-6 inline-block px-4 pb-8 break-all"
        v-for="(css, val) in tagsList"
        :key="val">
        <p>{{ val }}</p>
      </NuxtLink>
    </div>
  </UILayDefaultContainer>
</template>

<script setup lang="ts">
  const { data: tags, error } = await useFetch<any>('/api/article/postTags');

  const tagsList = computed(() => {
    interface arrayAsString {
      [key: string]: string;
    }

    interface arrayAsNumber {
      [key: string]: number;
    }

    const datas = tags.value;
    const aryCount: arrayAsNumber = {};


    if (!error.value)
      datas.forEach((element: any) => {
        if (element.sort === '') return;

        const eachTags = element?.sort.split(',');
        eachTags.forEach((vl: string) => {
          if (vl != '') {
            if (aryCount[vl]) aryCount[vl] += 1;
            else aryCount[vl] = 1;
          }
        });
      });

    const topFiveTags = Object.keys(aryCount)
      .sort((a, b) => {
        return aryCount[b] - aryCount[a];
      })
      .splice(0, 5);

    const distributeTextStyle: arrayAsString = {};

    if (topFiveTags.length === 2) {
      distributeTextStyle[topFiveTags[0]] =
        'text-4xl font-bold text-orange-500';
      distributeTextStyle[topFiveTags[1]] = 'text-md';
    }

    if (topFiveTags.length === 3) {
      distributeTextStyle[topFiveTags[0]] =
        'text-4xl font-bold text-orange-500';
      distributeTextStyle[topFiveTags[1]] = 'text-xl font-medium';
      distributeTextStyle[topFiveTags[2]] = 'text-md';
    }

    if (topFiveTags.length === 4) {
      distributeTextStyle[topFiveTags[0]] =
        'text-4xl font-bold text-orange-500';
      distributeTextStyle[topFiveTags[1]] = 'text-2xl font-medium';
      distributeTextStyle[topFiveTags[2]] = 'text-xl';
      distributeTextStyle[topFiveTags[3]] = 'text-md';
    }

    if (topFiveTags.length >= 5) {
      distributeTextStyle[topFiveTags[0]] =
        'text-4xl font-bold text-orange-500';
      distributeTextStyle[topFiveTags[1]] =
        'text-3xl font-semibold text-blue-500';
      distributeTextStyle[topFiveTags[2]] =
        'text-2xl font-medium text-green-500';
      distributeTextStyle[topFiveTags[3]] = 'text-xl';
      distributeTextStyle[topFiveTags[4]] = 'text-md';
    }

    return distributeTextStyle;
  });
</script>
