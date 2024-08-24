<template>
  <footer class="w-full mb-10 mt-20 px-10 border-t-2 border-main-blue">
    <div class="max-w-3xl mt-5 mx-auto">
      <div>
        <p class="text-sm">
          This site contains affiliate links to products. We may receive a
          commission for purchases made through these links. However, this does
          not impact our reviews and comparisons. We only suggest products we’ve
          reviewed, and in many instances also use, in order to help you make
          the best choices.
        </p>
      </div>
    </div>
    <div class="mt-5 text-center text-gray-400 text-xs">
      <p>©{{ year }} 華生水資源有限公司 All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
  const date = new Date();
  const year = date.getFullYear();
</script>
