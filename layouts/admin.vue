<template>
  <div class="lg:flex">
    <AdminMenu></AdminMenu>
    <div class="ml-auto max-lg:mr-auto h-full lg:w-[calc(100%_-_14rem)]">
      <div class="lg:mr-10 lg:ml-2">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
