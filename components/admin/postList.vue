<template>
  <AdminUIMainContainer>
    <div class="flex">
      <div
        class="px-5 border-b border-gray-300 py-5 text-gray-500"
        :class="trSize(title)"
        v-for="(title, indxe) in titles"
        :key="indxe">
        <strong>{{ title.en }}</strong>
      </div>
    </div>
    <div
      class="flex border-b last:border-none border-gray-300 py-2"
      v-for="(post, index) in postList"
      :key="index">
      <!-- banner -->
      <div class="w-1/5 px-5 py-3">
        <CommonBannerHandler
          class=""
          :postId="post.id"></CommonBannerHandler>
      </div>
      <div class="flex items-center px-5 xl:w-1/4 w-1/5">
        <!-- <p class="text-sm"></p> -->
        <NuxtLink
          class="text-sm text-mian_color"
          target="_blank"
          :to="'/post/' + (post.customUrl ? post.customUrl : post.id)"
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
          @click="checkDeleteFun(post)">
          刪除
        </p>
      </div>
    </div>

    <!-- delete confirm -->
    <UILayoutTopLevelContent v-if="deletePostStatus">
      <div class="">
        <strong class="text-2xl">確定要刪除 {{ deletePostTitle }} ?</strong>
        <p class="mt-2">一旦刪除將無法恢復，如確定請勾選同意</p>
      </div>
      <div>
        <input
          type="checkbox"
          v-model="checked" />
        <label>同意</label>
      </div>
      <div class="flex w-full justify-center mt-5">
        <UILayoutAnswerBTN>
          <template
            v-if="checked"
            #submit
            ><span
              class="text-white px-3"
              @click="deletePostFun"
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
  const postsUrl: string = '/api/post/browserPostList';
  const deletePostStatus: Ref<boolean> = ref(false);
  const deletePostTitle: Ref<string> = ref('');
  const deletePostId: Ref<string> = ref('');
  const checked: Ref<boolean> = ref(false);
  const emit = defineEmits(['refresh']);
  const props = defineProps(['showPerPage', 'currentPage']);

  interface postType {
    post: {
      title: string;
      createdAt: string;
      publish: boolean;
      id: string;
      customUrl: string;
    };
  }

  const currentPage = computed(() => props.currentPage - 1);

  // const {
  //   data: postList,
  //   pending,
  //   error,
  //   refresh,
  // } = await useFetch<postType>(postsUrl, {
  //   query: {
  //     postNum: props.showPerPage,
  //     skip: (currentPage.value) * props.showPerPage,
  //   },

  //   watch:[currentPage]
  // });

  const {
    data: postList,
    refresh,
  } = await useAsyncData<postType>(
    'postsUrl',
    () =>
      $fetch(postsUrl, {
        query: {
          postNum: props.showPerPage,
          skip: currentPage.value * props.showPerPage,
        },
      }),
    {
      watch: [currentPage],
    }
  );

  // console.log(postList.value,1);

  function checkDeleteFun(post: postType['post']) {
    deletePostStatus.value = true;
    deletePostTitle.value = post.title;
    deletePostId.value = post.id;
  }

  function resetDeleteValue() {
    deletePostStatus.value = false;
    deletePostTitle.value = '';
    deletePostId.value = '';
    checked.value = false;
  }

  async function deletePostFun() {
    const posts: object | any = await $fetch('/api/post/deletePostData', {
      method: 'POST',
      query: {
        id: deletePostId.value,
      },
    });

    if (posts) {
      refresh();
      resetDeleteValue();
    }
  }

  const titles = [
    { ch: '首圖', en: 'Banner' },
    { ch: '文章ID', en: 'ID' },
    { ch: '文章抬頭', en: 'Title' },
    { ch: '建立日期', en: 'Create' },
    { ch: '發布', en: 'Publish' },
    { ch: '', en: '' },
  ];

  interface trSize {
    ch: string;
    en: string;
  }
  function trSize(el: trSize) {
    let res;
    switch (el.en.toLowerCase()) {
      case 'banner':
        res = 'w-1/5';
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
