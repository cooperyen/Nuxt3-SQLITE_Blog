<template>
  <AdminUIMainContainer>
    {{ items }}
    <div class="flex">
      <div>
        <label>123</label>
        <AdminUIInputStyle
          :value="items['logo']"
          @update:value="(e) => reduceData('logo', e)">
        </AdminUIInputStyle>
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
</script>
