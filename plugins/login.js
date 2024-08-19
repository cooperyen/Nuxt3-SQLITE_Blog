export default defineNuxtPlugin(() => {
  return {
    provide: {
      locally: {
        getItem(item) {
          if (import.meta.client) {
            return localStorage.getItem(item);
          } else {
            return undefined;
          }
        },

        setItem(item, value) {
          if (import.meta.client) return localStorage.setItem(item, value);
        },

        removeItem(item) {
          if (import.meta.client) return localStorage.removeItem(item);
        },
      },
    },
  };
});
