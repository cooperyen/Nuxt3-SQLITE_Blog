<template>
  <main class="py-3 px-8 rounded-md mr-auto ml-auto max-w-4xl bg-white">
    <UILayoutAlignCenter>
      <template v-if="datas">
        <!-- option content -->
        <div class="flex mt-4 border-b pb-3 w-full max-sm:flex-wrap">
          <div class="w-full content-center">
            <p>
              {{ description }}
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
              @click="update">
              <span class="px-3">Update</span>
            </UISubmitBTN>
          </div>
        </div>

        <!-- post option content -->
        <AdminEditPostForm
          :title="datas.title"
          :subtitle="datas.subtitle"
          :sort="datas.sort"
          :defaultBannerImg="defaultBannerImg"
          :postId="postId"
          @update:image="(el:string) => (bannerImg = el)"
          @update:defaultBannerImg="(el:string) => (defaultBannerImg = el)"
          @update:postData="postData"></AdminEditPostForm>
        <!-- styling content -->
        <div class="mb-5 pb-5">
          <TheCkeditor
            :data="datas.content"
            @update:editorData="editorData"></TheCkeditor>
        </div>
      </template>
    </UILayoutAlignCenter>
  </main>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'admin',
  });

  const description =
    'To avoid data loss, make sure to save your data before leaving the page.';

  const router = useRouter();
  const route = useRoute();
  const postsUrl: string = '/api/findPostData';
  const postId: string | string[] = route.params.id;
  const { data, pending, error } = await useFetch<any>(postsUrl, {
    query: { id: postId },
  });

  const datas = computed(() => {
    let res;
    res = data.value;
    return res;
  });

  const content: Ref<string> = ref('<div></div>');
  interface items {
    title?: string;
    subtitle?: string;
    sort?: string;
  }

  const bannerImg: Ref<string> = ref('');
  const defaultBannerImg: Ref<string> = ref('');
  async function dsaads() {
    const res = await $fetch('/api/findBannerImg', {
      method: 'POST',
      body: { id: route.params.id },
    });
    if (res === 'fail') defaultBannerImg.value = '/postImg/default_banner.jpg';
    else defaultBannerImg.value = res;
  }

  const items: Ref<items> = ref({
    title: 'string',
    subtitle: 'string',
  });

  const publish: Ref<boolean> = ref(data.value?.publish);

  function editorData(el: string) {
    content.value = el;
  }

  function postData(el: object) {
    items.value = el;
  }

  function bannerUpdate(e: any) {
    if (!e) return;
    const url: string = '/api/uploadBannerImg';
    let reader = new FileReader();
    reader.readAsDataURL(e);
    reader.onload = (es: any) => {
      const img = es.target.result;

      $fetch(url, {
        method: 'POST',
        body: {
          postId: postId,
          base64: img,
        },
      });
    };
  }

  async function updateContent() {
    const url: string = '/api/postUpdate';
    const posts: object | any = await $fetch(url, {
      method: 'POST',
      body: {
        ...items.value,
        content: content.value,
        id: postId,
        publish: publish.value,
      },
    });
    if (posts.state === 'ok') {
      setTimeout(() => {
        router.replace('/admin');
      }, 600);
    }
  }

  function update() {
    updateContent();
    bannerUpdate(bannerImg.value);
  }

  onBeforeMount(() => {
    dsaads();
    if (!datas.value) router.push('/');
  });

  onMounted(() => {});
</script>
