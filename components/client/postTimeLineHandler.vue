<template>
  <div class="px-4 md:px-5 max-w-4xl mx-auto relative mt-20">
    <div
      class="relative before:w-1 before:absolute before:h-full before:content-[''] before:bg-gray-100 before:top-5">
      <!-- title -->
      <div
        v-if="tag"
        class="mb-16 before:-left-1.5 before:top-2.5 before:w-4 before:h-4 before:absolute before:content-[''] before:rounded-full before:bg-gray-500">
        <h2 class="pl-6 text-2xl font-bold">{{ tag }}</h2>
      </div>
      <!-- timeline -->
      <div
        class="mb-16 relative"
        v-for="year in sortYears"
        :key="year">
        <!-- Year -->
        <div
          :class="{
            'before:-left-1.5 before:top-2.5 before:w-4 before:h-4': !tag,
          }"
          class="mb-16 before:-left-1 before:top-2.5 before:w-3 before:h-3 before:absolute before:content-[''] before:rounded-full before:bg-gray-400">
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
              class="flex border-b border-dashed pb-6 before:-left-0.5 md:before:top-6 before:top-3.5 before:w-2 before:h-2 before:absolute before:content-[''] before:rounded-full before:bg-gray-300">
              <!-- date -->
              <div class="inline pt-1 md:pt-3.5 pl-5 max-md:pl-4">
                <span>{{ item.createdAt }}</span>
              </div>
              <!-- title and link -->
              <div class="inline pl-5 max-md:pl-3">
                <NuxtLink
                  :to="'/post/' + getlinks(item)"
                  class="max-md:text-xl max-md:leading-relaxed text-3xl text-cyan-700 underline underline-offset-8 leading-relaxed">
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
    console.log(val);
    return val.customUrl != '' && val.customUrl ? val.customUrl : val.id;
  }
</script>
