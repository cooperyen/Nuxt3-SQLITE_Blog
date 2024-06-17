export default defineNuxtPlugin(() => {
  return {
    provide: {
      symbolRegExp: new RegExp('[ @$!%*?&#=\'"]'),
    },
  };
});
