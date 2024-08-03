<template>
  <div class="px-5 max-w-4xl mx-auto relative mt-20">
    <div
      class="relative before:w-1 before:absolute before:h-full before:content-[''] before:bg-gray-100 before:top-5">
      <!-- title -->
      <div class="mb-16 before:-left-1.5 before:top-2.5 before:w-4 before:h-4 before:absolute before:content-[''] before:rounded-full before:bg-gray-500">
        <h2 class="pl-6 text-2xl font-bold">{{ tag }}</h2>
      </div>
      <!-- timeline -->
      <div
        class="mb-16 relative"
        v-for="year in sortYears"
        :key="year">
        <!-- Year -->
        <div
          class="mb-16 before:-left-1 before:top-3 before:w-3 before:h-3 before:absolute before:content-[''] before:rounded-full before:bg-gray-400">
          <div class="pl-6">
            <p class="inline text-2xl font-bold">{{ year }}</p>
          </div>
        </div>

        <!-- content -->
        <template
          v-for="items in sortData[year]"
          :key="items">
          <div
            class="relative mt-6"
            v-for="item in items"
            :key="item">
            <div
              class="border-b border-dashed pb-6 before:-left-0.5 before:top-5 before:w-2 before:h-2 before:absolute before:content-[''] before:rounded-full before:bg-gray-300">
              <!-- date -->
              <div class="inline pl-5">
                <span>{{ item.createdAt }}</span>
              </div>
              <!-- title and link -->
              <div class="inline pl-5">
                <NuxtLink
                  :to="'/post/' + getlinks(item)"
                  class="text-3xl  text-cyan-700 underline underline-offset-8">
                  {{ item.title }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps(['data', 'target', 'tag']);
  const { $sortDate } = useNuxtApp();

  const sortData = computed(() => {
    const res: any = {};

    props.data.forEach((el: any) => {
      const date = new Date($sortDate(el.createdAt));
      const year = date.getFullYear();

      const singlePost = {
        id: el.id,
        createdAt: `${date.getMonth() + 1}/${date.getDate()}`,
        customUrl: el.customUrl,
        title: el.title,
      };
      if (!res[year]) {
        res[year] = {};
        res[year]['post'] = [singlePost];
      } else {
        res[year]['post'].push(singlePost);
      }
    });
    return res;
  });

  const sortYears = computed(() => {
    const res = Object.keys(sortData.value).sort((a, b) => {
      return Number(b) - Number(a);
    });
    return res;
  });

  function getlinks(val: any) {
    return val.customUrl != '' ? val.customUrl : val.id;
  }
</script>
