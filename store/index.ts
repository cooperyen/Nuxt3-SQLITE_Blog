import { defineStore, acceptHMRUpdate } from 'pinia';
import { ref } from 'vue';
import type { Ref } from 'vue';

export const useSearchStore = defineStore('main', () => {
  const state: Ref<boolean> = ref(false);

  return {
    state,
  };
});
