<template>
  <template v-if="Object(data).length > 0">
    <UILayoutAlignCenter>
      <div class="pt-14 relative">
        <div
          class="before:content-[''] before:w-[4px] before:bg-sky-100 before:absolute before:block before:h-full before:top-20">
          <!-- title -->
          <UILayoutTimeLineChild
            class="ml-[32px] before:-ml-10 before:h-5 before:w-5 before:bg-sky-600 pb-8">
            <h2 class="text-4xl font-bold">{{ sortName }}</h2>
          </UILayoutTimeLineChild>
          <!-- list -->
          <div
            v-for="(datas, years) in year"
            :key="years">
            <!-- post year -->
            <UILayoutTimeLineChild
              class="ml-[30px] before:-ml-9 before:h-[15px] before:w-[15px] before:bg-sky-500 mt-16 mb-6">
              <h4 class="text-2xl font-bold">
                {{ years }}
              </h4>
            </UILayoutTimeLineChild>
            <!-- each post -->
            <UILayoutTimeLineChild
              class="ml-[34px] before:-ml-9 before:h-[8px] before:w-[8px] before:bg-sky-300 py-5"
              v-for="(data, index) in datas"
              :key="index">
              <div class="flex items-center">
                <p class="mr-2 text-sm">{{ getShortDate(data.createdAt) }}</p>
                <h4 class="text-4xl">
                  {{ data.title }}
                </h4>
              </div>
            </UILayoutTimeLineChild>
          </div>
        </div>
      </div>
    </UILayoutAlignCenter>
  </template>
</template>

<script setup lang="ts">
  const { $sortDate } = useNuxtApp();
  const postsUrl: string = '/api/post/timeLine';
  const route = useRoute();
  const router = useRouter();
  const sortName = route.params.id;

  const { data, pending, error, refresh } = await useFetch(postsUrl, {
    query: { sort: sortName },
    lazy: true,
    immediate: true,
  });

  interface list {
    title: string;
    createdAt: string;
    id: string;
  }

  interface year {
    [key: number]: Array<list>;
  }

  const year = computed(() => {
    const list: Array<list> = Object(data.value);
    let res: Array<year> = [{}];

    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      const year = getYear(element.createdAt);
      res[0][year] = [];
    }

    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      const year = getYear(element.createdAt);
      res[0][year].push(element);
    }
    return res[0];
  });

  function getYear(time: string) {
    const date = new Date(time);
    return date.getFullYear();
  }

  function getShortDate(time: string) {
    const date = new Date(time);
    return `${date.getMonth() + 1}-${date.getDate()}`;
  }

  onBeforeMount(() => {
    if (Object(data.value) <= 0) router.replace('/');
  });
</script>
