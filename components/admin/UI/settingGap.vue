<template>
  <div class="mb-5">
    <div class="mb-3 mt-3 flex items-end">
      <p class="text-xl">
        <slot name="title"></slot>
      </p>
      <p class="ml-5">
        <slot name="desc"></slot>
      </p>
    </div>

    <slot></slot>
    
    <UISeparatorLine></UISeparatorLine>
  </div>
</template>
