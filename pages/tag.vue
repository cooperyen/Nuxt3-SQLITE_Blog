<template>
  <div class="">
    <div class="max-w-7xl mx-auto md:mt-20 mt-10 text-center">
      <!-- title -->
      <div class="text-3xl font-bold">Tags</div>
      <div class="mt-10 text-xl">
        目前標籤有 {{ Object.keys(tagsList).length }} 個
      </div>
    </div>
    <!-- grid gap-x-2 md:gap-y-6 gap-y-14 lg:grid-cols-6 sm:grid-cols-4 grid-cols-3 text-center break-words items-baseline -->
    <!-- tags -->
    <div class="max-w-4xl mx-auto mt-10 text-center">
      <NuxtLink
        :to="`/tags/${val}`"
        :class="index"
        class="underline underline-offset-6 inline-block px-4 pb-8 break-all"
        v-for="(index, val) in tagsList"
        :key="val">
        <p>{{ val }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
  const postsUrl: string = '/api/post/postTags';

  const { data: tags, pending, error, refresh } = await useFetch<any>(postsUrl);

  const tagsList = computed(() => {
    interface arrayAsString {
      [key: string]: string;
    }

    interface arrayAsNumber {
      [key: string]: number;
    }

    const datas = tags.value;
    const aryCount: arrayAsNumber = {};

    datas.forEach((element: any) => {
      if (element.sort === '') return;

      const eachTags = element.sort.split(',');
      eachTags.forEach((vl: string) => {
        if (aryCount[vl]) aryCount[vl] += 1;
        else aryCount[vl] = 1;
      });
    });

    // lays for 5
    // 80 - 100
    // 60 - 80
    // 40 - 60
    // 20 - 40
    // 0  - 20
    const aryDistribute: arrayAsString = {};
    const totalUseTags = Object.values(aryCount).reduce((a, b) => a + b);
    Object.keys(aryCount).forEach((key: any) => {
      const usageTimes = aryCount[key];
      const percent = Math.floor((usageTimes / totalUseTags) * 100);
      if (percent > 80 && percent < 100) aryDistribute[key] = 'A';
      if (percent > 60 && percent < 80) aryDistribute[key] = 'B';
      if (percent > 40 && percent < 60) aryDistribute[key] = 'C';
      if (percent > 20 && percent < 40) aryDistribute[key] = 'D';
      if (percent > 0 && percent < 20) aryDistribute[key] = 'E';
    });

    const aryDistributeValues = Object.values(aryDistribute);

    const unduplicatedDistribute = aryDistributeValues.filter((val, index) => {
      return aryDistributeValues.indexOf(val) === index;
    });

    const distributeTextStyle: arrayAsString = {};

    if (unduplicatedDistribute.length === 2) {
      distributeTextStyle[unduplicatedDistribute[0]] =
        'text-4xl font-bold text-orange-500';
      distributeTextStyle[unduplicatedDistribute[1]] = 'text-md';
    }

    if (unduplicatedDistribute.length === 3) {
      distributeTextStyle[unduplicatedDistribute[0]] =
        'text-4xl font-bold text-orange-500';
      distributeTextStyle[unduplicatedDistribute[1]] = 'text-xl font-medium';
      distributeTextStyle[unduplicatedDistribute[2]] = 'text-md';
    }

    if (unduplicatedDistribute.length === 4) {
      distributeTextStyle[unduplicatedDistribute[0]] =
        'text-4xl font-bold text-orange-500';
      distributeTextStyle[unduplicatedDistribute[1]] = 'text-2xl font-medium';
      distributeTextStyle[unduplicatedDistribute[2]] = 'text-xl';
      distributeTextStyle[unduplicatedDistribute[3]] = 'text-md';
    }

    if (unduplicatedDistribute.length === 5) {
      distributeTextStyle[unduplicatedDistribute[0]] =
        'text-4xl font-bold text-orange-500';
      distributeTextStyle[unduplicatedDistribute[1]] = 'text-3xl font-semibold';
      distributeTextStyle[unduplicatedDistribute[2]] = 'text-2xl font-medium';
      distributeTextStyle[unduplicatedDistribute[3]] = 'text-xl';
      distributeTextStyle[unduplicatedDistribute[4]] = 'text-md';
    }

    const objKeyWithTextStyle = Object.keys(aryDistribute).map(function (key) {
      return { [key]: distributeTextStyle[aryDistribute[key]] };
    });

    const res: arrayAsString = {};

    for (let i = 0; i < objKeyWithTextStyle.length; i++) {
      const element = objKeyWithTextStyle[i];
      res[Object.keys(element)[0]] = element[Object.keys(element)[0]];
    }

    return res;
  });
</script>
