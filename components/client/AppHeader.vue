<template>
  <header class="relative top-0">
    <div class="fixed top-0 w-full max-h-20 h-full bg-main-blue border-b z-10">
      <div
        v-show="show"
        class="max-w-screen-2xl flex mx-auto justify-between items-center h-full">
        <!-- bar menu for mobile -->
        <div
          v-if="!resize"
          class="ml-5 text-white text-xl">
          <font-awesome-icon
            class="cursor-pointer"
            @click="moblieShowMenu = !moblieShowMenu"
            :icon="['fas', 'bars']" />
        </div>
        <div class="ml-5 flex items-center">
          <NuxtLink class="flex items-center" to="/">
            <!-- logo img -->
            <div class="md:mr-5 mr-2">
              <img
                class="max-h-12 w-full"
                :src="'/' + logo?.fileName" />
            </div>

            <div class="text-white">
              <h2>華生水資源</h2>
              <span class="text-xl">BLOG</span>
            </div>
          </NuxtLink>
          <!-- search function desket-->
          <ClientOnly>
            <!-- desket -->
            <div
              v-if="resize"
              @click="switchSearch"
              class="max-h-10 cursor-pointer border ml-6 rounded-full w-48 flex pt-1.5 pb-1.5 bg-white max-xl:mr-5">
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
          </ClientOnly>
        </div>

        <!-- search function mobile-->
        <ClientOnly>
          <!-- mobile -->
          <div
            v-if="!resize"
            class="cursor-pointer pl-3 pr-1.5 text-white mr-5">
            <font-awesome-icon
              @click="switchSearch"
              :icon="['fas', 'magnifying-glass']" />
          </div>
        </ClientOnly>

        <!-- info for desket -->
        <div
          class="flex"
          v-if="resize">
          <div class="mr-5 text-white">
            <NuxtLink :to="'/about'"> 關於華生 </NuxtLink>
          </div>
          <!-- info content -->
          <ClientInfoFull class="mr-5"></ClientInfoFull>
        </div>
      </div>

      <!-- bg-main-blue -->
      <!-- info for mobile -->
      <div
        v-show="moblieShowMenu"
        class="w-full bg-white px-6 py-6 shadow-md">
        <ul>
          <li
            class="mb-5 last-of-type:mb-0"
            v-for="link in mobileMeunLinks"
            :key="link.to">
            <NuxtLink :to="link.to">{{ link.title }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <!-- unvisible block -->
    <div class="h-20"></div>
  </header>

  <!-- search content -->
  <div
    v-show="showSearch"
    id="search_result"
    class="z-30 backdrop-blur-sm bg-gray-400/70 fixed w-full h-full lef-0 top-0">
    <!-- content -->
    <div
      class="bg-white w-[calc(100%_-_40px)] md:max-w-3xl fixed left-1/2 -translate-x-1/2 md:top-32 top-5 min-h-48 rounded-lg">
      <!-- search area -->
      <div class="flex">
        <!-- content -->
        <div
          class="flex my-5 ml-5 w-full rounded-lg py-1.5 mr-10 bg-light-gray">
          <div class="pl-3 pr-1.5">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
          </div>
          <div class="w-full">
            <input
              class="text-sm w-full placeholder:text-slate-600 bg-light-gray focus:outline-none"
              type="text"
              v-model="searchInput"
              autocomplete="off"
              placeholder="Search" />
          </div>
        </div>
        <!-- close -->
        <div class="w-14 flex items-center">
          <font-awesome-icon
            @click="switchSearch"
            class="text-2xl w-full cursor-pointer"
            :icon="['fas', 'circle-xmark']" />
        </div>
      </div>

      <!-- search resault -->
      <div class="px-2 md:px-5 max-md:px-4">
        <div
          class="last:border-b-0 border-b py-3 last:pb-5"
          v-for="(target, index) in searchRes"
          :key="index">
          <NuxtLink :to="'/post/' + target.id">
            <div>
              <span class="bg-tag rounded-lg px-1 mb-2 text-xs">
                {{ $sortDate(target.createdAt) }}
              </span>
              <p class="px-1 font-bold mt-1">{{ target.title }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { $sortDate } = useNuxtApp();
  const router = useRoute();
  const postsUrl: string = '/api/post/shortPostFullList';
  const nums: Ref<number> = ref(10);
  const searchInput: Ref<string> = ref('');
  const showSearch: Ref<boolean> = ref(false);
  const emit = defineEmits(['update:showSearch']);
  const moblieShowMenu: Ref<boolean> = ref(false);

  const mobileMeunLinks = [
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

  const { data: logo } = await useFetch<any>('/api/option/getLogoImg');

  const {
    data: post,
    error,
    refresh,
  } = await useFetch<any>(postsUrl, {
    lazy: true,
    immediate: true,
  });

  interface list {
    title: string;
    createdAt: string;
    content?: string | any;
    id: string;
  }

  const searchRes = computed(() => {
    let res: Array<list> = [];
    const target = searchInput.value;

    if (target.length > 2)
      post.value.forEach((element: list) => {
        const data: list = {
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
    searchInput.value = '';
    emit('update:showSearch', showSearch.value);
  }
  const windowWidth: Ref<number> = ref(0);
  const windowScroll: Ref<number> = ref(0);

  const show: Ref<Boolean> = ref(false);

  const resize = computed(() => {
    show.value = true;
    if (windowWidth.value >= 768) return true;
    else return false;
  });

  onMounted(() => {
    if (process.client) {
      windowWidth.value = window.innerWidth;
    }

    window.addEventListener('resize', function () {
      windowWidth.value = window.innerWidth;
    });

    window.addEventListener('scroll', function () {
      windowScroll.value = window.scrollY;
    });
  });
</script>
