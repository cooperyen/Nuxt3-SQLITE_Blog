<template>
  <div class="lg:flex">
    <AdminMenu></AdminMenu>
    <div class="max-lg:mr-auto h-screen overflow-y-hidden top-0 right-0 w-full">
      <div class="lg:ml-2 overflow-y-scroll h-full px-10">
        <div class="mt-20">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
