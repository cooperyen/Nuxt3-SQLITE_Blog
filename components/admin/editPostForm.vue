<template>
  <!-- items container -->
  <div class="w-full mb-8 mt-10">
    <!-- input items -->
    <div
      class="w-full mb-3"
      v-for="(content, title, index) in items"
      :key="title">
      <!-- item -->
      <div
        class="mb-1"
        v-if="title != 'sort' && props.postId != ''">
        <p>{{ title }}</p>
      </div>
      <!-- input -->
      <div class="rounded-md">
        <template v-if="title != 'sort'">
          <input
            :class="{ 'border-red-400': warning && items[title] === '' }"
            class="border-2 w-full rounded-md py-2 px-3"
            v-model="items[title]"
            @click="warning ? emit('update:warning', false) : ''"
            @input="emit('update:postData', items)" />
        </template>
        <template v-else-if="props.postId">
          <div class="border-2 w-full rounded-md py-1 px-1 flex items-center">
            <ul class="flex px-1 m-0 text-center">
              <template
                v-for="list in items[title].split(',')"
                :key="list">
                <li
                  class="list-none text-center rounded-md py-2 px-3 mr-3 bg-mian_color text-white"
                  v-if="list">
                  {{ list }}
                </li>
              </template>
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
    <div
      v-if="props.postId"
      class="mt-10 mb-10 pb-10 border-b">
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
        <!-- v-if="props.postId" -->
        <BannerHander
          class="max-w-xs"
          :postId="props.postId"
          :tempImg="imageUrl"></BannerHander>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps([
    'title',
    'subtitle',
    'sort',
    'defaultBannerImg',
    'postId',
    'data',
    'warning',
  ]);

  const imageUrl: Ref<string> = ref('');

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
    'update:postData',
    'update:image',
    'update:defaultBannerImg',
    'update:warning',
  ]);

  function addSort() {
    const xxx = sorts.value[0].value;
    const e = new RegExp('[@$!%*?&#=\'"]');
    if (xxx.match(e)) alert('禁止特殊符號 @$!%*?&#=\'"');
    else {
      items.value.sort += `,${sorts.value[0].value}`;
      sorts.value[0].value = '';

      emit('update:postData', items.value);
    }
  }

  async function banner(e: any) {
    if (!e.target.files.length) return;
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = async (es: any) => {
      imageUrl.value = es.target.result;
      emit('update:defaultBannerImg', es.target.result);
      emit('update:image', e.target.files[0]);
    };
  }

  onBeforeMount(() => {
    emit('update:postData', items);
  });
</script>
