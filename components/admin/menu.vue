<template>
  <div
    class="max-w-48 w-full h-screen shadow-[4px_0px_20px_0px_rgba(0,0,0,0.1)]">
    <div class="">
      <div class="mb-10">
        <h1 class="text-3xl text-center p-5">華生</h1>
      </div>
      <div>
        <ul class="px-5">
          <li
            class="text-xl px-2 my-3"
            v-for="(cotent, index) in menu"
            :key="index">
            <NuxtLink to="/admin">{{ cotent.title }}</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const menu = [
    {
      title: '文章管理',
    },
    {
      title: '文章',
    },
  ];
</script>
