<template>
  <AdminUIMainContainer v-if="currentPage">
    <div class="overflow-x-scroll">
      <div class="flex min-w-[1000px]">
        <div
          class="px-5 border-b border-gray-300 py-5 text-gray-500"
          :class="trSize(title)"
          v-for="(title, indxe) in titles"
          :key="indxe">
          <strong>{{ title.en }}</strong>
        </div>
      </div>
      <div
        class="flex border-b last:border-none border-gray-300 py-2 min-w-[1000px]"
        v-for="post in article"
        :key="post.id">
        <!-- banner -->
        <div class="max-md:w-32 w-1/5 px-5 py-3">
          <CommonBannerHandler
            class=""
            :postId="post.id"></CommonBannerHandler>
        </div>
        <div class="flex items-center px-5 xl:w-1/4 w-1/5">
          <!-- <p class="text-sm"></p> -->
          <NuxtLink
            class="text-sm text-mian_color"
            target="_blank"
            :to="'/article/' + (post.customUrl ? post.customUrl : post.id)"
            >{{ post.id }}</NuxtLink
          >
        </div>
        <!-- title -->
        <div class="xl:w-1/2 w-1/3 px-5 flex items-center">
          <NuxtLink
            class="text-mian_color"
            :to="'/admin/editpost/' + post.id"
            >{{ post.title }}</NuxtLink
          >
        </div>
        <!-- time -->
        <div class="xl:w-1/4 w-1/5 px-5 flex items-center">
          <p>{{ $sortDate(post.createdAt) }}</p>
        </div>
        <!-- publish -->
        <div class="xl:w-1/4 w-1/5 px-5 flex items-center">
          <UISwitchBTN
            :status="post.publish"
            :disabled="true">
          </UISwitchBTN>
        </div>
        <!-- time -->
        <div class="w-1/5 px-5 flex items-center">
          <p
            class="cursor-pointer select-none"
            @click="openDeleteMenu(post)">
            刪除
          </p>
        </div>
      </div>
    </div>

    <!-- delete confirm -->
    <UILayoutTopLevelContent v-if="deleteData.open">
      <div class="">
        <p class="text-2xl">
          確定要刪除 <strong>{{ deleteData.title }}</strong> ?
        </p>
        <p class="mt-2">一旦刪除將無法恢復，如確定請勾選同意</p>
      </div>
      <div class="mt-5">
        <input
          class="mr-1 cursor-pointer"
          type="checkbox"
          v-model="deleteData.agree" />
        <label>同意</label>
      </div>
      <div class="flex w-full justify-center mt-5">
        <UILayoutAnswerBTN>
          <template
            v-if="deleteData.agree"
            #submit
            ><span
              class="text-white px-3"
              @click="processingDelete"
              >確定</span
            >
          </template>

          <template
            v-else
            #disable
            ><span class="px-3">確定</span>
          </template>

          <template #cancel>
            <span
              @click="resetDeleteValue"
              class="text-white px-3"
              >取消</span
            >
          </template>
        </UILayoutAnswerBTN>
      </div>
    </UILayoutTopLevelContent>
  </AdminUIMainContainer>
</template>

<script setup lang="ts">
  const { $sortDate } = useNuxtApp();
  const articleAPI: string = '/api/admin/articleHandler';
  const deletePostTitle: Ref<string> = ref('');

  const titles = [
    { ch: '首圖', en: 'Banner' },
    { ch: '文章ID', en: 'ID' },
    { ch: '文章抬頭', en: 'Title' },
    { ch: '建立日期', en: 'Create' },
    { ch: '發布', en: 'Publish' },
    { ch: '', en: '' },
  ];

  interface DeleteData {
    open: boolean;
    title: string;
    id: string;
    agree: boolean;
  }

  const deleteData = reactive<DeleteData>({
    open: false,
    title: '',
    id: '',
    agree: false,
  });
  const emit = defineEmits(['refresh']);
  const props = defineProps(['showPerPage', 'currentPage']);
  const currentPage = computed(async () => {
    if (props.currentPage) await doFetch();
    else return null;
  });

  interface Article {
    id: string;
    title: string;
    createdAt: string;
    publish: boolean;
    customUrl: string;
    open: boolean;
  }

  const article: Ref<Article[]> = ref([]);

  async function doFetch() {
    await fetchArticles();
  }

  async function fetchArticles() {
    try {
      const data = await $fetch<any>(articleAPI, {
        method: 'GET',
        query: {
          postNum: props.showPerPage,
          skip: (props.currentPage - 1) * props.showPerPage,
        },
      });
      article.value = data.data;
    } catch (error) {
      console.error('Failed to fetch article:', error);
    }
  }

  function openDeleteMenu(post: Article) {
    deleteData.open = true;
    deleteData.title = post.title;
    deleteData.id = post.id;
  }

  function resetDeleteValue() {
    deleteData.open = false;
    deleteData.title = '';
    deleteData.id = '';
    deleteData.agree = false;
    doFetch();
  }

  async function processingDelete() {
    const posts: object | any = await $fetch(articleAPI, {
      method: 'DELETE',
      query: {
        id: deleteData.id,
      },
    });

    if (posts) resetDeleteValue();
  }

  interface trSize {
    ch: string;
    en: string;
  }
  function trSize(el: trSize) {
    let res;
    switch (el.en.toLowerCase()) {
      case 'banner':
        res = 'w-1/5 max-md:w-32';
        break;
      case 'title':
        res = 'xl:w-1/2 w-1/3';
        break;
      case '':
        res = 'w-1/5';
        break;
      default:
        res = 'xl:w-1/4 w-1/5';
    }

    return res;
  }
</script>
