<template>
  <UISubmitBTN
    v-if="$slots.submit"
    class="mr-1"
    ><slot name="submit"></slot
  ></UISubmitBTN>
  <UIDisableBTN
    v-if="$slots.disable"
    class="mr-1"
    ><slot name="disable"></slot
  ></UIDisableBTN>
  <UICancelBTN class="ml-1"><slot name="cancel"></slot></UICancelBTN>
</template>
