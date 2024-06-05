function getTime(el: string) {
  let res: string = '';
  const time = new Date(el);
  res = `${time.getFullYear()}/${
    time.getMonth() + 1
  }/${time.getDate()} ${time.getHours()}:${
    time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()
  }`;
  return res;
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      sortDate: getTime,
    },
  };
});
