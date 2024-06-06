<template>
  <div
    class="max-w-48 w-full h-screen shadow-[4px_0px_20px_0px_rgba(0,0,0,0.1)]">
    <div class="">
      <div class="mb-10">
        <h1 class="text-3xl text-center p-5">華生</h1>
      </div>
      <div>
        <ul>
          <NuxtLink
            class="text-md"
            v-for="(content, index) in menu"
            :key="index"
            :to="`/${content.path}`">
            <li
              :class="{ 'bg-gray-200': route.name === content.path }"
              class="px-5 py-5">
              <font-awesome-icon
                class="mr-2"
                :icon="['fas', content.icon]" />
              {{ content.title }}
            </li>
          </NuxtLink>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
  const menu = [
    {
      title: '文章管理',
      path: 'admin',
      icon: 'clipboard',
    },
    {
      title: '設定',
      path: 'option',
      icon: 'gear',
    },
  ];
</script>
