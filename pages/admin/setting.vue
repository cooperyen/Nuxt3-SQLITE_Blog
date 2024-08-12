<template>
  <AdminUIMainContainer>
    {{ items }}
    <div class="flex">
      <div>
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
          @change="onFileChange"
          accept="image/*" />
        <!-- <AdminUIInputStyle
          :value="items['logo']"
          @update:value="(e:any) => reduceData('logo', e)">
        </AdminUIInputStyle> -->
      </div>
    </div>
  </AdminUIMainContainer>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'admin',
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
    console.log('object');
    const formData = new FormData();
    formData.append('image', file.value);

    try {
      const posts: object | any = await $fetch('/api/option/logoUpdate', {
        method: 'POST',
        body: formData,
      });
      if (posts.code === 400) alert('Image size have to under 1MB');
    } catch (err) {
      alert(err);
    }
  }
</script>
