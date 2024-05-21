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
    <div class="mt-10 mb-10 pb-10 border-b">
      <div class="mb-5">
        <input
          class="w-0"
          type="file"
          id="banner"
          name="img"
          ref="file"
          style="visibility: hidden"
          @change="banner"
          accept="image/*" />

        <label
          class="rounded-md border-2 p-1 cursor-pointer"
          for="banner"
          >Select file</label
        >
      </div>
      <div>
        <img
          class="max-w-xs"
          :src="props.defaultBannerImg" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps(['title', 'subtitle', 'sort', 'defaultBannerImg']);
  // const banner: Ref<string> = ref('');
  const items: Ref<Object> = ref({
    title: props.title ? props.title : '',
    subtitle: props.subtitle ? props.subtitle : '',
    sort: props.sort ? props.sort : '',
  });
  const emit = defineEmits([
    'items',
    'update:image',
    'update:defaultBannerImg',
  ]);

  const imageUrl: Ref<string> = ref('');

  async function banner(e: any) {
    if (!e.target.files.length) return;
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = async (es: any) => {
      // imageUrl.value = es.target.result;
      emit('update:defaultBannerImg', es.target.result);
      emit('update:image', e.target.files[0]);
    };
  }

  onBeforeMount(() => {
    emit('items', items);
  });
</script>
