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
  </div>
</template>

<script setup lang="ts">
  const props = defineProps(['title', 'subtitle', 'sort']);
  const items: Ref<Object> = ref({
    title: props.title ? props.title : '',
    subtitle: props.subtitle ? props.subtitle : '',
    sort: props.sort ? props.sort : '',
  });
  const emit = defineEmits(['items']);

  onBeforeMount(() => {
    emit('items', items);
  });
</script>
