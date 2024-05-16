<template>
  <main class="pr-3 pl-3 mr-auto ml-auto max-w-5xl">
    <template v-if="datas">
      <!-- option content -->
      <div class="flex mt-4 border-b pb-3 w-full max-sm:flex-wrap">
        <div class="w-full content-center">
          <p>
            To avoid data loss, make sure to save your data before leaving the
            page.
          </p>
        </div>
        <div class="justify-end w-full flex max-sm:mt-4">
          <div
            class="mr-1 ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 content-center">
            <p>Publish</p>
          </div>
          <UISwitchBTN
            class="border-r-2 mr-2 pr-2"
            :status="data.publish"
            @update:status="publish = $event"></UISwitchBTN>
          <UISubmitBTN
            class="content-center"
            @click="update"
            >Update</UISubmitBTN
          >
        </div>
      </div>

      <!-- post option content -->
      <EditPostForm
        :title="datas.title"
        :subtitle="datas.subtitle"
        :sort="datas.sort"
        @items="check"></EditPostForm>

      <!-- styling content -->
      <UILayoutAlignCenter>
        <TheCkeditor
          :data="datas.content"
          @update:editorData="editorData"></TheCkeditor>
      </UILayoutAlignCenter>
    </template>
  </main>
</template>

<script setup lang="ts">
  const postsUrl: string = '/api/test_find_post_data';
  const router = useRouter();
  const route = useRoute();
  const { data, pending, error } = await useFetch<any>(postsUrl, {
    query: { id: route.params.id },
  });
  const publish: Ref<boolean> = ref(data.value.publish);

  const content: Ref<string> = ref('<div></div>');
  interface items {
    title?: string;
    subtitle?: string;
    sort?: string;
  }
  const items: Ref<items> = ref({
    title: 'string',
    subtitle: 'string',
  });

  const datas = computed(() => {
    let res;
    res = data.value;
    return res;
  });

  function editorData(el: string) {
    content.value = el;
  }

  onBeforeMount(() => {
    if (!datas.value) router.push('/');
  });
  onMounted(() => {
    // console.log(data);
  });

  function check(el: object) {
    items.value = el;
  }

  async function update() {
    // let posts : Array<Provider>;
    const url: string = '/api/postUpdate';
    const posts: object | any = await $fetch(url, {
      method: 'POST',
      body: {
        ...items.value,
        content: content.value,
        id: route.params.id,
        publish: publish.value,
      },
    });

    console.log(posts);
  }

  // onBeforeMount(() => {
  //   if (!data.value) back();
  // });

  // async function back() {
  //   await navigateTo('/');
  // }
</script>

<style lang="scss">
  h1 {
    color: $primary;
  }
</style>
