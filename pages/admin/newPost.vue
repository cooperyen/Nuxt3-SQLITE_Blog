<template>
  <div>
    <AdminUILoading></AdminUILoading>
    <main class="pr-3 pl-3 mr-auto ml-auto max-w-3xl">
      <div class="flex mt-4 border-b pb-3 w-full max-sm:flex-wrap">
        <div class="w-full content-center">
          <p>Setting post information.</p>
        </div>
        <div class="justify-end w-full flex max-sm:mt-4">
          <UISubmitBTN
            @click="create"
            class="content-center px-3"
            ><span class="px-3">新增</span></UISubmitBTN
          >
        </div>
      </div>
      <AdminEditPostForm
        :warning="warning"
        @update:warning="(e:any) => (warning = e)"
        @update:postData="postData"></AdminEditPostForm>
    </main>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'admin',
    pageTransition: false,
  });
  const router = useRouter();
  const warning: Ref<boolean> = ref(false);
  const postProcess: Ref<boolean> = ref(true);

  import { useLoadingState } from '@/stores/globalStates';
  const { loadingSwitch } = useLoadingState();

  interface itemss {
    title?: string;
    subtitle?: string;
  }
  const items: Ref<itemss> = ref({
    title: '',
    subtitle: '',
  });

  function postData(event: object) {
    items.value = event;
  }

  async function create() {
    loadingSwitch(true);
    // empty input values ​​are prohibited.
    if (!items.value.title || !items.value.subtitle) {
      warning.value = true;
      loadingSwitch(false);
    } else {
      // repeat execution is prohibited.
      try {
        if (!postProcess.value) return;
        postProcess.value = false;
        const posts: object | any = await $fetch('/api/admin/article', {
          method: 'POST',
          body: {
            ...items.value,
          },
        });
        if (posts)
          setTimeout(() => {
            router.replace(`/admin/editpost/${posts}`);
          }, 2000);
        else {
          loadingSwitch(false);
          throw createError({
            statusCode: 400,
            statusMessage:
              'update unsuccesses. please try again or check it later',
          });
        }
      } catch (error) {
        alert(error);
      }
    }
  }

  onBeforeUnmount(() => {
    loadingSwitch(false);
  });
</script>
