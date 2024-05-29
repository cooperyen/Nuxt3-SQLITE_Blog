<template>
  <section class="mt-20">
    <div class="flex">
      <div
        class="px-5 border-b border-gray-300 py-2"
        :class="trSize(title)"
        v-for="(title, indxe) in titles"
        :key="indxe">
        <p>{{ title.en }}</p>
      </div>
    </div>
    <div
      class="flex border-b border-gray-300 py-2"
      v-for="(post, index) in postList"
      :key="index">
      <!-- banner -->
      <div class="w-1/5 px-5 py-3">
        <BannerHander
          class=""
          :postId="post.id"></BannerHander>
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
        <p>刪除</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const postsUrl: string = '/api/post/browserPostList';
  const nums: Ref<number> = ref(10);

  interface postType {
    post: {
      title: string;
      createdAt: string;
      publish: boolean;
      id: string;
    };
  }
  const {
    data: postList,
    pending,
    error,
    refresh,
  } = await useFetch<postType>(postsUrl, {
    query: { postNum: nums },
    lazy: true,
    immediate: true,
  });

  const titles = [
    { ch: '首圖', en: 'Banner' },
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
      case 'id':
        res = 'xl:w-1/3 w-1/4';
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
