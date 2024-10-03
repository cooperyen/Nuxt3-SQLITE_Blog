<template>
  <footer
    class="w-full mb-10 md:mt-20 mt-10 md:pt-10 pt-5 px-10 border-t-2 border-main-blue">
    <div class="max-w-3xl mt-5 mx-auto">
      <div
        class="text-sm md:flex md:items-center justify-center max-md:text-center">
        <div class="max-w-40 max-md:mx-auto max-md:mb-3">
          <nuxt-img
            width="160"
            height="90"
            format="webp"
            class="w-full select-none"
            alt="華生飲水LOGO"
            :src="'/' + logoName" />
        </div>
        <div>
          <ul>
            <li
              class="mb-1 last:mb-0 break-all"
              v-for="(value, key) in content"
              :key="key">
              {{ key }} : {{ value }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="md:mt-20 mt-10 text-center text-gray-400 text-sm">
      <p>
        ©{{ year }}
        <a
          class="text-main-blue underline underline-offset-4"
          href="https://www.hwaseng.com.tw/"
          target="_blank"
          >華生水資源有限公司</a
        >
        All Rights Reserved.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
  const date = new Date();
  const year = date.getFullYear();
  const logoName = '華生飲水.svg';
  const content = {
    Email: 'services@hwaseng.com.tw',
    公司地址: '台北市內湖區行忠路66巷2號',
    服務專線: '02-2796-6060',
  };
</script>
