<template>
  <!-- items container -->
  <div class="w-full mb-8 mt-10">
    <!-- input items -->
    <div
      class="w-full mb-3"
      v-for="(content, title) in items"
      :key="title">
      <!-- item -->
      <div class="mb-1">
        <p>
          {{ title }}
        </p>
      </div>
      <!-- input -->
      <div class="rounded-md">
        <input
          class="border-2 w-full rounded-md py-1 px-1"
          v-model="items[title]"
          @input="emit('items', items)" />
      </div>
    </div>
    <div>
      <input
        type="file"
        id="banner"
        name="img"
        ref="file"
        @change="banner"
        accept="image/*" />
    </div>
  </div>
  {{ imageFile }}
  {{ imageUrl }}
</template>

<script setup lang="ts">
  const props = defineProps(['title', 'subtitle', 'sort']);
  // const banner: Ref<string> = ref('');
  const items: Ref<Object> = ref({
    title: props.title ? props.title : '',
    subtitle: props.subtitle ? props.subtitle : '',
    sort: props.sort ? props.sort : '',
  });
  const emit = defineEmits(['items']);
  const imageFile: Ref<any> = ref('');
  const imageUrl: Ref<any> = ref('');

  async function banner(e: any) {
    if (!e.target.files.length) return;
    const url: string = '/api/uploadBannerImg';
    imageFile.value = e.target.files[0];
    console.log(e.target.files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(imageFile.value);
    reader.onload = async (es: any) => {
      imageUrl.value = es.target.result;

      const posts: object = await $fetch(url, {
        method: 'POST',
        body: {
          i: imageUrl.value,
        },
      });
    };
    // console.log(el.target.files[0]);
    // const x = window.URL.createObjectURL(el.target.files[0]);
    // const formDate = new FormData();
    // formDate.append('file-to-upload', el.target.files[0]);
  }

  onBeforeMount(() => {
    emit('items', items);
  });
</script>
