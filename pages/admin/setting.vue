<template>
  <AdminUIMainContainer>
    {{ items }}
    <div class="flex">
      <div>
        <label>q</label>
        <input
          type="file"
          id="banner"
          name="img"
          ref="file"
          @change="updateLogo"
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

  async function updateLogo(e: any) {
    // if (!e.target.files.length) return;
    // let reader = new FileReader();

    file.value = (e.target as HTMLInputElement).files;
    console.log(file.value);
    const fd = new FormData();
    fd.append('file', file.value[0]);

    console.log(fd.get('file'));

    const posts: object | any = await $fetch('/api/option/logoUpdate', {
      method: 'POST',
      body: {
        img: fd,
      },
    });

    console.log(posts);

    // reader.readAsDataURL(e.target.files[0]);
    // reader.onload = async (es: any) => {
    //   // imageUrl.value = es.target.result;
    //   // emit('update:defaultBannerImg', es.target.result);
    //   // emit('update:image', e.target.files[0]);

    //   const posts: object | any = await $fetch('/api/option/logoUpdate', {
    //     method: 'POST',
    //     body: {
    //       img: e.target.files,
    //     },
    //   });

    //   console.log(posts);

    //   if (posts) {
    //     console.log('object');
    //   }
    // };
    // const posts: object | any = await $fetch('/api/option/logoUpdate', {
    //   method: 'POST',
    //   query: {
    //     id: deletePostId.value,
    //   },
    // });

    // if (posts) {
    //   resetDeleteValue();
    // }
  }
</script>
