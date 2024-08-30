<template>
  <UILayDefaultContainer>
    <div
      v-if="aboutDate"
      class="w-full max-xl:px-5 max-w-4xl mr-auto ml-auto">
      <div
        class="ck-content"
        v-html="aboutDate?.content"></div>
    </div>
  </UILayDefaultContainer>
</template>

<script setup lang="ts">
  useHead({
    title: '關於華生 ｜ 華生水資源生技有限公司',
    meta: [
      {
        name: 'description',
        content: 'this.description',
      },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://cdn.ckeditor.com/ckeditor5/42.0.1/ckeditor5.css',
      },
    ],
  });

  const aboutFetch = await $fetch<any>('/api/pages/aboutPageHandler', {
    method: 'GET',
  });

  const aboutDate = computed(() => {
    if (aboutFetch.state === 200) return aboutFetch.data;
    else return null;
  });
</script>
