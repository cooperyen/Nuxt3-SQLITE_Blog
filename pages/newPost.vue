<template>
  <main class="pr-3 pl-3 mr-auto ml-auto max-w-5xl">
    <div class="flex mt-4 border-b pb-3 w-full max-sm:flex-wrap">
      <div class="w-full content-center">
        <p>
          To avoid data loss, make sure to save your data before leaving the
          page.
        </p>
      </div>
      <div class="justify-end w-full flex max-sm:mt-4">
        <UISubmitBTN
          @click="create"
          class="content-center"
          >create</UISubmitBTN
        >
      </div>
    </div>
    <EditPostForm @items="check"></EditPostForm>
    <UILayoutAlignCenter>
      <TheCkeditor @update:editorData="editorData"></TheCkeditor>
    </UILayoutAlignCenter>
    {{ items }}
    {{ content }}
  </main>
</template>

<script setup lang="ts">
  const router = useRouter();

  const content: Ref<string> = ref('<div></div>');
  interface itemss {
    title?: string;
    subtitle?: string;
    sort?: string;
  }
  const items: Ref<itemss> = ref({
    title: '',
    subtitle: '',
    sort: '',
  });

  function editorData(el: string) {
    content.value = el;
  }

  function check(event: object) {
    items.value = event;
  }

  async function create() {
    const url: string = '/api/test-new-post';
    console.log({
      ...items.value,
      content: content.value,
    });
    const posts: object | any = await $fetch(url, {
      method: 'POST',
      body: {
        ...items.value,
        content: content.value,
      },
    });
    if (posts.state === 'ok') router.push(`/editpost/${posts.id}`);
    if (posts.state === 'fail') alert('save fail');
  }
</script>

<style lang="scss">
  h1 {
    color: $primary;
  }
</style>
