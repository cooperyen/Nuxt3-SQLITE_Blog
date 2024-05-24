<template>
  <section class="mt-20">
    <div class="flex">
      <div
        class="px-2 border-b border-gray-300 py-2"
        :class="{
          'w-1/4': title.en === 'create' || title.en === 'title',
          'w-2/4': title.en === 'publish',
          'w-1/2': title.en === 'id',
        }"
        v-for="(title, indxe) in titles"
        :key="indxe">
        <p>{{ title.en }}</p>
      </div>
    </div>
    <div
      class="flex border-b border-gray-300 py-2"
      v-for="(post, index) in postList"
      :key="index">
      <div class="w-1/2 px-2">
        <p>{{ post.id }}</p>
      </div>
      <div class="w-1/4 px-2">
        <p>{{ post.title }}</p>
      </div>
      <div class="w-1/4 px-2">
        <p>{{ getTime(post.createdAt) }}</p>
      </div>
      <div class="w-2/4 px-2">
        <UISwitchBTN
          :status="post.publish"
          :disabled="true">
        </UISwitchBTN>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const postsUrl: string = '/api/post/browserPostList';
  const nums: Ref<number> = ref(10);

  interface postType {
    post: { title: string; createdAt: string; publish: boolean; id: string };
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
    { ch: 'id', en: 'id' },
    { ch: '文章抬頭', en: 'title' },
    { ch: '建立日期', en: 'create' },
    { ch: '發布', en: 'publish' },
  ];

  function getTime(el: string) {
    let res: any = '';
    const time = new Date(el);
    res = `${time.getDate()}/${
      time.getMonth() + 1
    }/${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}`;
    return res;
  }
</script>
