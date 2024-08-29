<template>
  <div class="flex items-center w-full mt-1">
    <div class="sm:min-w-3 w-full border-2 rounded-md">
      <input
        class="w-full py-2 sm:px-2.5 px-3 rounded-md"
        placeholder="新增"
        v-model="customUrl"
        @input="valueCheck" />
    </div>
    <div
      v-if="!checkButton"
      class="border-2 rounded-md ml-2 py-2 px-2 break-keep cursor-pointer">
      <button @click="addCustomUrl">檢查</button>
    </div>
    <div class="ml-2">
      <font-awesome-icon
        :class="{ 'text-green-600': customUrlduplicateCheck }"
        :icon="['fas', 'circle-check']" />
    </div>
    <p v-show="customUrlduplicateRemind">diplicate</p>
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits(['update:customUrl']);
  const props = defineProps(['customUrl']);
  const customUrl: Ref<string> = ref(props.customUrl);
  const customUrlduplicateCheck: Ref<boolean> = ref(false);
  const customUrlduplicateRemind: Ref<boolean> = ref(false);
  const checkButton: Ref<boolean> = ref(true);

  async function addCustomUrl() {
    const url = customUrl.value;
    const e = new RegExp('[ @$!%*?&#=\'"]');
    let res: boolean = false;
    if (url.match(e)) alert('禁止特殊符號: 空格@$!%*?&#=\'"');
    if (!url.match(e)) {
      if (url === '') {
        res = true;
      }

      if (url != '') {
        const api: string = '/api/option/checkCustomizeURL';
        res = await $fetch<boolean>(api, {
          method: 'POST',
          body: {
            url,
          },
        });
      }

      customUrlduplicateCheck.value = res;
      if (!res) {
        customUrlduplicateRemind.value = true;
      } else {
        emit('update:customUrl', url);
      }
    }
  }

  function valueCheck() {
    if (customUrl.value != '') {
      customUrlduplicateCheck.value = false;
      customUrlduplicateRemind.value = false;
      checkButton.value = false;
    }
    if (customUrl.value === '') {
      customUrlduplicateCheck.value = true;
      customUrlduplicateRemind.value = false;
      checkButton.value = true;
      emit('update:customUrl', '');
    }
  }

  onMounted(() => {
    if (customUrl.value || customUrl.value === '') {
      customUrlduplicateCheck.value = true;
    }
  });
</script>
