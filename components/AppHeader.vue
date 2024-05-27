<template>
  <header class="flex h-14 bg-white border-b items-center relative z-10">
    <!-- logo img -->
    <div class="ml-5 mr-3">
      <NuxtLink to="/">logo</NuxtLink>
    </div>
    <!-- search function -->
    <div class="border rounded-full w-48 flex pt-1.5 pb-1.5 bg-main-gray">
      <!-- icon -->
      <div class="pl-3 pr-1.5">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
      </div>
      <!-- search click -->
      <div class="pr-3">
        <input
          id="post_search"
          class="w-full cursor-pointer text-sm placeholder:text-slate-600 bg-main-gray focus:outline-none"
          type="text"
          @click="switchSearch"
          autocomplete="off"
          readonly
          placeholder="Search" />
      </div>
    </div>
  </header>

  <!-- search content -->
  <div
    v-if="showSearch"
    id="search_result"
    class="z-30 backdrop-blur-sm bg-gray-200/70 fixed w-full h-full lef-0 top-0">
    <!-- content -->
    <div
      class="max-w-xl bg-white fixed left-1/2 -translate-x-1/2 top-32 w-full min-h-48">
      <!-- search area -->
      <div>
        <input
          id="post_search"
          class="w-full text-sm placeholder:text-slate-600 bg-main-gray focus:outline-none"
          type="text"
          v-model="ss"
          autocomplete="off"
          placeholder="Search" />
      </div>
      <!-- search resault -->
      <div class="px-10">
        <div
          class="content py-3 last:pb-8"
          v-for="i in searchRes"
          :key="i">
          <NuxtLink :to="'post/' + i.id">
            <div class="items">
              <p>{{ i.title }}</p>
              <span>{{ i.createdAt }}</span>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const ss: Ref<string> = ref('');

  const postsUrl: string = '/api/post/shortPostFullList';
  const nums: Ref<number> = ref(10);
  const showSearch: Ref<boolean> = ref(false);
  const emit = defineEmits(['update:showSearch']);

  const {
    data: post,
    pending,
    error,
    refresh,
  } = await useFetch<any>(postsUrl, {
    query: { postNum: nums },
    lazy: true,
    immediate: true,
  });

  interface list {
    title: string;
    createdAt: string;
    content: string;
    id: string;
  }

  const searchRes = computed(() => {
    let res: any[] = [];
    const target = ss.value;

    if (target.length >= 2)
      post.value.forEach((element: list) => {
        const data = {
          title: element.title,
          createdAt: element.createdAt,
          id: element.id,
        };
        if (element.title.match(target)) res.push(data);
        else if (element.content.match(target)) res.push(data);
      });

    return res;
  });

  function switchSearch() {
    showSearch.value = !showSearch.value;
    emit('update:showSearch', showSearch.value);
  }
</script>
