<template>
  <div>
    <div class="max-w-7xl mx-auto mt-20 text-center">
      <!-- title -->
      <div class="text-3xl font-bold">Tags</div>
      <div class="mt-10 text-xl">
        目前標籤有 {{ Object.keys(tagsList).length }} 個
      </div>
    </div>

    <!-- tags -->
    <div
      class="max-w-4xl mx-auto mt-10 grid gap-x-2 gap-y-2 md:grid-cols-6 grid-cols-4 text-center break-words">
      <div
        :class="index"
        class=""
        v-for="(index, val) in tagsList"
        :key="val">
        {{ val }}
      </div>
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
      distributeTextStyle[unduplicatedDistribute[0]] = 'text-4xl font-bold';
      distributeTextStyle[unduplicatedDistribute[1]] = 'text-lg';
    }

    if (unduplicatedDistribute.length === 3) {
      distributeTextStyle[unduplicatedDistribute[0]] = 'text-5xl';
      distributeTextStyle[unduplicatedDistribute[1]] = 'text-xl font-medium';
      distributeTextStyle[unduplicatedDistribute[2]] = 'text-lg';
    }

    if (unduplicatedDistribute.length === 4) {
      distributeTextStyle[unduplicatedDistribute[0]] = 'text-5xl';
      distributeTextStyle[unduplicatedDistribute[1]] = 'text-2xl font-medium';
      distributeTextStyle[unduplicatedDistribute[2]] = 'text-xl';
      distributeTextStyle[unduplicatedDistribute[3]] = 'text-lg';
    }

    if (unduplicatedDistribute.length === 5) {
      distributeTextStyle[unduplicatedDistribute[0]] = 'text-4xl';
      distributeTextStyle[unduplicatedDistribute[1]] = 'text-3xl font-semibold';
      distributeTextStyle[unduplicatedDistribute[2]] = 'text-2xl font-medium';
      distributeTextStyle[unduplicatedDistribute[3]] = 'text-xl';
      distributeTextStyle[unduplicatedDistribute[4]] = 'text-lg';
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
