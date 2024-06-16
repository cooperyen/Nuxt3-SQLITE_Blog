<template>
  {{ counter }}
  <div class="lg:flex">
    <AdminMenu class="bg-white"></AdminMenu>
    <div
      class="max-lg:mt-16 absolute first-line:max-lg:mr-auto h-screen bg-[#efefef] overflow-y-hidden top-0 right-0 w-full lg:w-[calc(100%-12rem)]">
      <div class="lg:ml-2 overflow-y-scroll h-full lg:px-10 px-3">
        <div class="my-12">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // import { useSearchStore } from '@/store/index';

  // const store = useSearchStore();
  // console.log(store.state);

  const counter = useCounter();
  console.log(counter.value);
</script>
