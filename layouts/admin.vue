<template>
  <div class="lg:flex">
    <AdminMenu></AdminMenu>
    <div
      class="max-lg:mr-auto h-screen bg-[#efefef] overflow-y-hidden top-0 right-0 w-full">
      <div class="lg:ml-2 overflow-y-scroll h-full px-10">
        <div class="my-12">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
