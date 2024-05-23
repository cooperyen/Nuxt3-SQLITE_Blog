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
        <template v-if="title != 'sort'">
          <input
            class="border-2 w-full rounded-md py-2 px-3"
            v-model="items[title]"
            @input="emit('items', items)" />
        </template>
        <template v-else>
          <div class="border-2 w-full rounded-md py-1 px-1 flex items-center">
            <ul class="flex px-1 m-0 text-center">
              <li
                class="list-none text-center rounded-md py-2 px-3 mr-3 bg-mian_color text-white"
                v-for="list in items[title].split(',')"
                :key="list">
                <p>{{ list }}</p>
              </li>
            </ul>
            <input
              class="min-w-3 border-2 rounded-md py-2 px-2"
              placeholder="新增"
              ref="sorts"
              @keyup.enter="addSort" />
          </div>
        </template>
      </div>
    </div>
    <!--  -->
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

  interface Provider {
    title: string;
    subtitle: string;
    sort: string;
  }
  const items: Ref<Provider> = ref({
    title: props.title ? props.title : '',
    subtitle: props.subtitle ? props.subtitle : '',
    sort: props.sort ? props.sort : '',
  });

  const sorts: Ref<any> = ref('1');

  const emit = defineEmits([
    'items',
    'update:image',
    'update:defaultBannerImg',
  ]);

  function addSort() {
    const xxx = sorts.value[0].value;
    const e = new RegExp('[@$!%*?&#=\'"]');
    if (xxx.match(e)) alert('禁止特殊符號 @$!%*?&#=\'"');
    else {
      items.value.sort += `,${sorts.value[0].value}`;
      sorts.value[0].value = '';

      emit('items', items.value);
    }
  }

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
