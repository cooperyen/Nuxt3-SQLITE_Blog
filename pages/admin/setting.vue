<template>
  <AdminUIMainContainer>
    <div class="mx-5 py-5">
      <AdminUISettingGap>
        <template #title>LOGO</template>
        <template #desc>尺寸 300*100</template>
        <div class="flex items-center">
          <div class="bg-slate-600">
            <img
              class="max-h-40 w-full"
              :src="'./../' + img" />
          </div>
          <div class="ml-5">
            <label
              class="rounded-md border-2 p-1 cursor-pointer"
              for="banner"
              >Select file</label
            >
            <input
              type="file"
              id="banner"
              name="img"
              ref="file"
              style="visibility: hidden"
              @change="onFileChange"
              accept=".jpg,.png,.svg" />
          </div>
        </div>
      </AdminUISettingGap>

      <!-- <AdminUIInputStyle
          :value="items['logo']"
          @update:value="(e:any) => reduceData('logo', e)">
        </AdminUIInputStyle> -->

      <!-- <UISeparatorLine></UISeparatorLine> -->
    </div>
  </AdminUIMainContainer>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'admin',
    pageTransition: false,
  });

  const { data: logo, refresh: logoRefresh } = await useFetch<any>(
    '/api/option/logoHandler',
    { method: 'GET' }
  );

  const img = computed(() => {
    // console.log(logo.value.date);
    return `${logo.value?.fileName}?${Math.random()}`;
  });

  const items: Ref<any> = ref({
    logo: '',
  });

  function reduceData(target: string, data: string) {
    items.value[target] = data;
  }

  const file: Ref<any> = ref();

  function onFileChange(event: any) {
    file.value = event.target.files[0];
    updateLogo();
  }

  async function updateLogo() {
    const formData = new FormData();
    formData.append('image', file.value);

    try {
      const posts: object | any = await $fetch('/api/option/logoUpdate', {
        method: 'POST',
        body: formData,
      });

      if ((await posts.code) === 400) alert('Image size have to under 1MB');
      if ((await posts.code) === 200) logoRefresh();
    } catch (err) {
      alert(err);
    }
  }
</script>
