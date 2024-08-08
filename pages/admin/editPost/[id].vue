<template>
  <div>
    <AdminUILoading></AdminUILoading>
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
                class="mr-1 ms-3 text-sm font-medium text-gray-900 content-center">
                <p>Publish</p>
              </div>
              <UISwitchBTN
                class="border-r-2 mr-2 pr-2"
                :status="data.publish"
                @update:status="publish = $event"></UISwitchBTN>
              <UISubmitBTN
                class="content-center py-1"
                @click="update">
                <span class="px-3">Update</span>
              </UISubmitBTN>
            </div>
          </div>

          <div class="mt-3 border-b pb-3">
            <div>
              文章ID <span class="bg-slate-200 ml-2 px-2">{{ postId }}</span>
            </div>
            <div class="flex items-center mt-3">
              文章ID
              <AdminCustomUrlCheck
                class="px-2"
                @update:customUrl="customUrlUpdate"
                :customUrl="data.customUrl"></AdminCustomUrlCheck>
            </div>
          </div>

          <!-- post option content -->
          <AdminEditPostForm
            :warning="warning"
            :title="datas.title"
            :subtitle="datas.subtitle"
            :sort="datas.sort"
            :defaultBannerImg="defaultBannerImg"
            :postId="postId"
            @update:warning="(e:boolean) => (warning = e)"
            @update:image="(el:string) => (bannerImg = el)"
            @update:defaultBannerImg="(el:string) => (defaultBannerImg = el)"
            @update:postData="postData"></AdminEditPostForm>
          <!-- styling content -->
          <div class="mb-5 pb-5">
            <CommonTheCkeditor
              :data="datas.content"
              @update:editorData="editorData"></CommonTheCkeditor>
          </div>
          {{ datas.content }}
        </template>
      </UILayoutAlignCenter>
    </main>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'admin',
    middleware: 'auth',
  });

  import { useLoadingState } from '@/stores/globalStates';
  const { loadingSwitch } = useLoadingState();

  const warning: Ref<boolean> = ref(false);

  const description =
    'To avoid data loss, make sure to save your data before leaving the page.';

  const router = useRouter();
  const route = useRoute();
  const postsUrl: string = '/api/findPostData';
  const postId: string | string[] = route.params.id;
  const showLoadinmg: Ref<boolean> = ref(false);
  const { data, pending, error } = await useFetch<any>(postsUrl, {
    query: { id: postId },
  });

  const datas = computed(() => {
    let res;
    res = data.value;
    return res;
  });

  const content: Ref<string> = ref('<div></div>');
  const bannerImg: Ref<string> = ref('');
  const defaultBannerImg: Ref<string> = ref('');

  // custom url
  const customUrl: Ref<string> = ref(data.value.customUrl);
  function customUrlUpdate(el: string) {
    customUrl.value = el;
  }

  async function dsaads() {
    const res = await $fetch('/api/findBannerImg', {
      method: 'POST',
      body: { id: route.params.id },
    });
    if (res === 'fail') defaultBannerImg.value = '/postImg/default_banner.jpg';
    else defaultBannerImg.value = res;
  }

  interface items {
    title: string;
    subtitle: string;
    sort?: string;
    customUrl?: string;
  }

  const items: Ref<items> = ref({
    title: 'string',
    subtitle: 'string',
  });

  const publish: Ref<boolean> = ref(data.value?.publish);

  function editorData(el: string) {
    content.value = el;
  }

  // post data
  interface postData {
    value: object;
  }
  function postData(el: any) {
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
    const e = new RegExp('^[ ]+$');
    if (
      e.test(items.value.subtitle) ||
      items.value.subtitle === '' ||
      e.test(items.value.title) ||
      items.value.title === ''
    ) {
      warning.value = true;
      loadingSwitch(false);
    } else {
      const url: string = '/api/postUpdate';

      const posts: object | any = await $fetch(url, {
        method: 'POST',
        body: {
          ...items.value,
          customUrl: customUrl.value,
          content: content.value,
          id: postId,
          publish: publish.value,
        },
      });
      if (posts.state === 'ok') {
        setTimeout(() => {
          router.replace('/admin');
        }, 1000);
      }
    }
  }

  function update() {
    loadingSwitch(true);
    updateContent();
    bannerUpdate(bannerImg.value);
  }

  onBeforeMount(() => {
    dsaads();
    if (!datas.value) router.replace('/admin');
  });

  onBeforeUnmount(() => {
    loadingSwitch(false);
  });
</script>
