<template>
  <header class="lg:max-w-48 w-full lg:fixed">
    <div
      class="h-svh lg:relative fixed z-50 max-lg:h-16 w-full lg:h-screen shadow-[4px_0px_20px_0px_rgba(0,0,0,0.1)]">
      <div class="h-full">
        <div class="w-full h-full md:flex md:flex-col">
          <div
            class="lg:mb-10 max-lg:flex max-lg:items-center justify-between max-lg:p-3 max-lg:h-full relative z-10 bg-white">
            <div class="max-lg:ml-3">
              <h1 class="text-3xl lg:text-center lg:p-5 max-lg:text-xl">
                華生
              </h1>
            </div>
            <div
              @click="clickShow = !clickShow"
              class="text-xl max-lg:mr-3 lg:hidden cursor-pointer">
              <font-awesome-icon
                v-show="!clickShow"
                :icon="['fas', 'bars']" />
              <font-awesome-icon
                v-show="clickShow"
                :icon="['fas', 'xmark']" />
            </div>
          </div>

          <!-- drop menu -->
          <transition
            enter-from-class="translate-y-[-150%] opacity-0"
            leave-to-class="translate-y-[-150%] opacity-0"
            enter-active-class="transition duration-300"
            leave-active-class="transition duration-300">
            <div
              v-show="showItems"
              class="md:flex-grow md:flex md:flex-col bg-white max-lg:border-t-2 max-lg:border-t-gray-100 max-lg:shadow-[0px_4px_8px_0px_rgba(0,0,0,0.3)] z-0 relative">
              <div class="md:flex-grow">
                <ul class="px-0 max-md:py-3">
                  <NuxtLink
                    @click="clickShow = !clickShow"
                    class="text-md"
                    v-for="(content, index) in menu"
                    :key="index"
                    :to="`/${content.path}`">
                    <li
                      :class="{
                        'bg-gray-200': route.path === `/${content.path}`,
                      }"
                      class="px-5 py-5">
                      <font-awesome-icon
                        class="mr-2"
                        :icon="['fas', content.icon]" />
                      {{ content.title }}
                    </li>
                  </NuxtLink>
                </ul>
              </div>

              <div class="md:flex-grow-0 text-center w-full py-5 max-md:border-gray-200 max-md:border-t ">
                <button
                  class="text-gray-900 lg:text-gray-400 hover:text-gray-900">
                  登出
                </button>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <!-- invisialbe -->
    <div class="max-lg:h-16"></div>
  </header>
</template>

<script setup lang="ts">
  import { useWindowSize } from '@vueuse/core';
  const { width, height } = useWindowSize();
  const route = useRoute();
  const show: Ref<boolean> = ref(false);
  const clickShow: Ref<boolean> = ref(false);

  const clickShows = computed(() => {
    clickShow.value = width.value <= 1024 ? true : false;
    return clickShow;
  });
  const showItems = computed(() => {
    if (width.value > 1024) {
      show.value = true;
      clickShow.value = false;
    }
    if (width.value <= 1024) show.value = false;
    if (clickShow.value) show.value = true;
    return show.value;
  });

  const menu = [
    {
      title: '文章管理',
      path: 'admin',
      icon: 'clipboard',
    },
    {
      title: '設定',
      path: 'admin/setting',
      icon: 'gear',
    },
    {
      title: '關於華生',
      path: 'admin/about',
      icon: 'gear',
    },
  ];
</script>
