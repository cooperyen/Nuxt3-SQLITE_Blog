<template>
  <AppHeader />
  <article v-if="data">
    <UILayoutAlignCenter class="justify-center mt-10 px-5">
      <div
        id="title"
        class="">
        <!-- title -->
        <h1 class="text-4xl font-bold">{{ data.title }}</h1>
        <!-- subtitle -->
        <h2 class="text-2xl mt-3">{{ data.subtitle }}</h2>
        <!-- time -->
        <div class="text-base mt-3 flex items-center text-gray-500">
          <div><font-awesome-icon :icon="['fas', 'calendar-days']" /></div>
          <p class="pl-2.5">{{ getTime(data.createdAt) }}</p>
        </div>
        <!-- sort -->
        <div class="mt-1 text-base items-center flex text-gray-500">
          <div>
            <font-awesome-icon :icon="['fas', 'box']" />
          </div>
          <ul class="flex pl-2 m-0 items-center">
            <li
              class="list-none"
              v-for="(val, index) in data.sort.split(',')"
              :key="index">
              {{ index === 0 ? '' : '、' }}{{ val }}
            </li>
          </ul>
        </div>
      </div>
      <SeparatorLine class="mt-5" />
      <div
        v-html="data.content"
        class="ck-content"></div>
    </UILayoutAlignCenter>
  </article>
</template>

<script setup lang="ts">
  import { type DirectiveBinding } from 'vue';
  const postsUrl: string = '/api/test_find_post_data';
  const route = useRoute();
  const { data, pending, error } = await useFetch<any>(postsUrl, {
    query: { id: route.params.id },
  });

  // const vShadowHtml = {
  //   mounted: (el: HTMLElement, binding: DirectiveBinding) => {
  //     let shadow: ShadowRoot | null = el.shadowRoot;
  //     if (shadow == null) {
  //       shadow = el.attachShadow({ mode: 'open' });
  //     }
  //     shadow.innerHTML = binding.value;
  //   },
  //   updated: (el: HTMLElement, binding: DirectiveBinding) => {
  //     let shadow: ShadowRoot | null = el.shadowRoot;
  //     if (shadow == null) {
  //       shadow = el.attachShadow({ mode: 'open' });
  //     }
  //     shadow.innerHTML = binding.value;
  //   },
  // };

  function getTime(el: string) {
    let res: any = '';
    const time = new Date(el);
    res = `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
    return res;
  }

  onBeforeMount(() => {
    if (!data.value) back();
  });

  async function back() {
    await navigateTo('/');
  }
</script>

<style lang="scss" scoped>
  @import './../../assets/scss/ckeditor.scss';
</style>
