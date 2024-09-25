<template>
  <div>
    <AdminUIMainContainer>
      <AdminUILoading></AdminUILoading>
      <main
        class="py-3 px-3 md:px-8 rounded-md mr-auto ml-auto max-w-4xl bg-white">
        <template v-if="aboutDate">
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
              :data="aboutDate?.content"
              pageTitle="aboutPage"
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
  const aboutAPI = '/api/pages/aboutPageHandler';
  const aboutFetch = await $fetch<any>(aboutAPI, {
    method: 'GET',
  });

  const aboutDate = computed(() => {
    if (aboutFetch?.state === 200) return aboutFetch.data;
    else return null;
  });

  const content: Ref<string> = ref('<div></div>');

  async function update() {
    loadingSwitch(true);
    const data = await $fetch<boolean>(aboutAPI, {
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
