<template>
  <AdminUIMainContainer>
    <div class="mx-5 py-5">
      <div class="flex items-center">
        <div>LOGO</div>
        <div class="max-w-24"><img :src="'./../' + logo" /></div>
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
            accept="image/*" />
        </div>
        <!-- <AdminUIInputStyle
          :value="items['logo']"
          @update:value="(e:any) => reduceData('logo', e)">
        </AdminUIInputStyle> -->
      </div>
      <UISeparatorLine></UISeparatorLine>
    </div>
  </AdminUIMainContainer>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'admin',
  });

  const { data: logo, refresh: logoRefresh } = await useFetch<any>(
    '/api/option/getLogoImg'
  );

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
      if (posts.code === 400) alert('Image size have to under 1MB');
      if (posts.code === 200) logoRefresh();
    } catch (err) {
      alert(err);
    }
  }
</script>
