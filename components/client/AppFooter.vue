<template>
  <footer class="w-full mb-10 mt-20 sm:px-20 px-10">
    <div class="max-w-3xl mx-auto">
      <div>
        <p>
          This site contains affiliate links to products. We may receive a
          commission for purchases made through these links. However, this does
          not impact our reviews and comparisons. We only suggest products we’ve
          reviewed, and in many instances also use, in order to help you make
          the best choices.
        </p>
      </div>
    </div>
    <div class="mt-10 text-center">
      <p>©{{ year }} 華生水資源有限公司 All Rights Reserved.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
  const date = new Date();
  const year = date.getFullYear();
</script>
