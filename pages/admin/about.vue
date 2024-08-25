<template>
  <div>
    <AdminUIMainContainer>
      <AdminUILoading></AdminUILoading>
      <main
        class="py-3 px-3 md:px-8 rounded-md mr-auto ml-auto max-w-4xl bg-white">
        <template v-if="data">
          <!-- option content -->
          <div class="flex mt-4 border-b pb-3 w-full max-sm:flex-wrap">
            <div class="w-full content-center">
              <p></p>
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

          <!-- styling content -->
          <div class="mb-5 pb-5">
            <CommonTheCkeditor
              :data="data.content"
              @update:editorData="editorData"></CommonTheCkeditor>
          </div>
        </template>
      </main>
    </AdminUIMainContainer>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'admin',
    pageTransition: false,
  });

  const { loadingSwitch } = useLoadingState();

  const data = await $fetch<any>('/api/pages/aboutPageUpdate', {
    method: 'GET',
  });

  const publish: Ref<boolean> = ref(data?.publish);
  const content: Ref<string> = ref('<div></div>');

  async function update() {
    loadingSwitch(true);
    const data = await $fetch<boolean>('/api/pages/aboutPageUpdate', {
      method: 'POST',
      body: {
        content: content.value,
      },
    });

    if (data || !data)
      setTimeout(() => {
        loadingSwitch(false);
      }, 1000);
    if (!data) alert('someting wrong, please try again.');
  }

  function editorData(el: string) {
    content.value = el;
  }
</script>
