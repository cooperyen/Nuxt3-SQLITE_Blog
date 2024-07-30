<template>
  <div>
    <div class="max-w-7xl mx-auto mt-20 text-center">
      <!-- title -->
      <div class="text-3xl font-bold">Tags</div>
      <div class="mt-10 text-xl">目前標籤有 {{ tagsList.length }} 個</div>
    </div>

    <!-- tags -->
    <div
      class="max-w-4xl mx-auto mt-10 grid gap-x-2 gap-y-2 md:grid-cols-10 grid-cols-4 text-center">
      <div
        class=""
        v-for="val in tagsList"
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
    const val = tags.value;
    const ary: Array<any> = [];
    val.forEach((element: any) => {
      if (element.sort != '') {
        const eachTags = element.sort.split(',');

        eachTags.forEach((vl: any) => {
          console.log(Object.keys(vl));

          if (ary.indexOf(vl) === -1) ary.push({ [vl]: 1 });
          else ary[vl] += 1;
        });
      }
    });

    return ary;
  });
</script>
