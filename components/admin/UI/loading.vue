<template>
  <Transition>
    <div
      class="bg-[rgba(0,0,0,0.2)] w-full h-screen fixed left-0 top-0 z-50 flex items-center">
      <div class="h-5 w-5 mx-auto">
        <font-awesome-icon
          class="animate-spin text-2xl text-purple-800"
          :icon="['fas', 'spinner']" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts"></script>
