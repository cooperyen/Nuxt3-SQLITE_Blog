<template>
  <UILayDefaultContainer>
    <h1>about</h1>
    {{ data.content }}
    <div
      class="ck-content"
      v-html="data.content"></div>
  </UILayDefaultContainer>
</template>

<script setup lang="ts">
  useHead({
    title: '關於我',
    link: [
      {
        rel: 'stylesheet',
        href: 'https://cdn.ckeditor.com/ckeditor5/42.0.1/ckeditor5.css',
      },
    ],
  });

  const data = await $fetch<any>('/api/pages/aboutPageUpdate', {
    method: 'GET',
  });
</script>
