<template>
  <div class="fixed bg-[rgba(0,0,0,0.20)] z-50 left-0 top-0 w-full h-full">
    <div
      class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-w-96 w-full text-center">
      <div class="bg-white p-5 mx-2 rounded-md">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
