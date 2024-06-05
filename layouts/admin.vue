<template>
  <div class="lg:flex">
    <AdminMenu></AdminMenu>
    <div
      class="max-lg:mr-auto h-full lg:w-[calc(100%_-_14rem)] overflow-y-hidden top-0 right-0 absolute">
      <div class="lg:ml-2 overflow-y-scroll h-full">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
