import { NuxtLink } from '#build/components';
<template>
  <header class="flex h-[57px] bg-white border-b items-center">
    <!-- logo img -->
    <div class="ml-5 mr-3">
      <NuxtLink to="/">logo</NuxtLink>
    </div>
    <!-- search function -->
    <div class="border rounded-full w-48 flex pt-1.5 pb-1.5 bg-main-gray">
      <!-- icon -->
      <div class="pl-3 pr-1.5">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
      </div>
      <!-- input -->
      <div class="pr-3">
        <input
          class="w-full text-sm placeholder:text-slate-600 bg-main-gray focus:outline-none"
          type="text"
          placeholder="Search" />
      </div>
    </div>
  </header>
</template>
