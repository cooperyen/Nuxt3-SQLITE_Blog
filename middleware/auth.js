const { $locally } = useNuxtApp(); // make sure this is at the top or as close as possible to the top

export default defineNuxtRouteMiddleware(async (to, from) => {
  // localstorage value.
  const auth = ref($locally.getItem('auth'));
  const authValue = auth.value;
  console.log(authValue);

  // only run client side.
  if (!process.client) return;

  // have auth value and check with database.
  if (authValue) {
    const id = JSON.parse(authValue).id;
    const res = await $fetch('/api/auth/loginCheck', {
      query: {
        id,
      },
    });

    if (!res) return reLogin();
  } else {
    return reLogin();
  }
});

function reLogin() {
  $locally.removeItem('auth');
  return navigateTo('/admin/login');
}
