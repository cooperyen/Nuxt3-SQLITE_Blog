<template>
  <header class="relative top-0 select-none">
    <div
      class="md:fixed top-0 py-3 w-full md:max-h-20 h-full md:min-h-20 bg-main-blue border-b z-20 relative">
      <div
        class="max-w-screen-2xl flex mx-auto justify-between items-center h-full">
        <!-- bar menu for mobile -->
        <div class="ml-5 text-white text-xl md:hidden">
          <font-awesome-icon
            class="cursor-pointer"
            @click="moblieShowMenu = !moblieShowMenu"
            :icon="['fas', 'bars']" />
        </div>

        <div class="ml-5 flex items-center">
          <NuxtLink
            class="flex items-center"
            to="/">
            <!-- logo img -->
            <div class="md:mr-5 mr-2">
              <img
                class="max-h-9 md:max-h-12 w-full"
                :src="'/' + logo?.fileName" />
            </div>

            <div class="text-white">
              <h2 class="max-md:text-xs">華生水資源</h2>
              <span class="text-sm md:text-xl">BLOG</span>
            </div>
          </NuxtLink>
          <!-- search function desket-->

          <!-- desket -->
          <div
            @click="switchSearch"
            class="max-h-10 cursor-pointer border ml-6 rounded-full w-48 flex pt-1.5 pb-1.5 bg-white max-xl:mr-5 max-md:hidden">
            <!-- icon -->
            <div class="pl-3 pr-1.5">
              <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            </div>
            <!-- search click -->
            <div class="pr-3">
              <input
                class="w-full cursor-pointer text-sm placeholder:text-slate-600 bg-white focus:outline-none"
                type="text"
                autocomplete="off"
                readonly
                placeholder="Search" />
            </div>
          </div>
        </div>

        <!-- search function mobile-->

        <!-- mobile menu  -->
        <div class="cursor-pointer pl-3 pr-1.5 text-white mr-5 md:hidden">
          <font-awesome-icon
            @click="switchSearch"
            :icon="['fas', 'magnifying-glass']" />
        </div>

        <!-- info for desket -->
        <div class="flex max-md:hidden">
          <div class="mr-5 text-white">
            <NuxtLink :to="'/about'"> 關於華生 </NuxtLink>
          </div>
          <!-- info content -->
          <ClientInfoFull class="mr-5"></ClientInfoFull>
        </div>
      </div>
    </div>

    <!-- info for mobile -->
    <div
      v-show="moblieShowMenu"
      class="animate-top-to-bottom w-full bg-white px-6 py-6 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] absolute z-10 md:top-20 border-b-4 border-main-blue">
      <ul>
        <li
          class="mb-5 last-of-type:mb-0"
          v-for="link in mobileMeunLinks"
          :key="link.to">
          <NuxtLink :to="link.to">{{ link.title }}</NuxtLink>
        </li>
      </ul>
    </div>

    <!-- unvisible block -->
    <div class="h-20 max-md:hidden"></div>
  </header>

  <!-- search content -->
  <div
    v-show="showSearch"
    id="search_result"
    class="z-30 backdrop-blur-sm bg-gray-400/70 fixed w-full h-full lef-0 top-0">
    <!-- content -->
    <div
      class="bg-white w-[calc(100%_-_40px)] md:h-2/3 md:max-w-3xl h-5/6 fixed left-1/2 -translate-x-1/2 md:top-32 top-10 rounded-lg overflow-y-auto">
      <!-- search area -->
      <div class="flex sticky top-0 bg-white">
        <!-- content -->
        <div class="flex my-5 ml-5 w-full rounded-lg py-1.5 bg-light-gray">
          <div class="pl-3 pr-1.5">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </div>
          <div class="w-full">
            <input
              class="text-inherit md:text-sm w-full placeholder:text-slate-600 bg-light-gray focus:outline-none"
              type="text"
              v-model="searchInput"
              @input="searchArticles"
              @compositionend="searchArticles"
              autocomplete="off"
              placeholder="Search" />
          </div>
        </div>
        <!-- close -->
        <div class="mx-3 flex items-center">
          <font-awesome-icon
            @click="switchSearch"
            class="text-2xl w-full cursor-pointer"
            :icon="['fas', 'circle-xmark']" />
        </div>
      </div>

      <!-- search resault -->
      <div class="px-2 md:px-5 max-md:px-4">
        <template
          v-for="(target, index) in searchReturn"
          :key="index">
          <div
            class="last:border-b-0 border-b py-3 last:pb-5"
            v-if="dosome(target.content)">
            <NuxtLink :to="'/article/' + target.id">
              <div>
                <span class="bg-tag rounded-lg px-1 mb-2 text-xs">
                  {{ $sortDate(target.createdAt) }}
                </span>
                <p class="px-1 font-bold mt-1">{{ target.title }}</p>
                <!-- <p>{{ dosome(target.content) }}</p> -->
                <div v-text="dosome(target.content)"></div>
              </div>
            </NuxtLink>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { $sortDate } = useNuxtApp();
  const { data: logo } = await useFetch<any>('/api/option/logoHandler');
  const router = useRoute();
  const searchInput: Ref<string> = ref('');
  const searchReturn: Ref<any> = ref('');
  const showSearch: Ref<boolean> = ref(false);
  const emit = defineEmits(['update:showSearch']);
  const moblieShowMenu: Ref<boolean> = ref(false);
  const windowWidth: Ref<number> = ref(0);
  const windowScroll: Ref<number> = ref(0);

  const mobileMeunLinks = [
    { to: '/', title: '首頁' },
    { to: '/about', title: '關於華生' },
    { to: '/tags', title: '所有標籤' },
    { to: '/articles', title: '所有文章' },
  ];

  watch(
    () => router.path,
    () => {
      moblieShowMenu.value = false;
      showSearch.value = false;
      searchInput.value = '';
      emit('update:showSearch', showSearch.value);
    }
  );

  async function searchArticles() {
    const target = searchInput.value.toLowerCase().trim();
    // if the input value equals empty then reset searchReturn and quit function.
    if (target === '') return (searchReturn.value = '');

    const data = await $fetch<any>('/api/article/findManyArticles', {
      method: 'GET',
      query: {
        where: {
          content: target,
        },
        select: {
          id: true,
          title: true,
          createdAt: true,
          sort: true,
          content: true,
        },
      },
    });

    if (data?.state === 200) return (searchReturn.value = data.data);
    else return null;
  }

  /**
   *  when open/close the search container process.
   */
  function switchSearch() {
    showSearch.value = !showSearch.value;
    searchInput.value = '';
    searchReturn.value = '';
    emit('update:showSearch', showSearch.value);
  }

  function dosome(el: string) {
    const data = el.replace(/<[^<>]*>/g, '').replace(/&nbsp;/gi, '');

    const start = data
      .toLocaleLowerCase()
      .indexOf(searchInput.value.toLocaleLowerCase());

    if (start === -1) return null;

    const res = data.slice(start, start + 10) + '...';

    return res;
  }

  onBeforeMount(() => {
    if (import.meta.client) {
      windowWidth.value = window.innerWidth;
    }

    window.addEventListener('resize', function () {
      windowWidth.value = window.innerWidth;
      moblieShowMenu.value = false;
    });

    window.addEventListener('scroll', function () {
      windowScroll.value = window.scrollY;
    });
  });
</script>
