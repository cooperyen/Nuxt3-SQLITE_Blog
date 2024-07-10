import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';

export const useLoadingState = defineStore('useLoadingState', () => {
  const loadingState: Ref<boolean> = ref(false);

  function loadingSwitch(val:boolean) {
    loadingState.value = val;
  }

  return {
    loadingState,
    loadingSwitch
  };
});