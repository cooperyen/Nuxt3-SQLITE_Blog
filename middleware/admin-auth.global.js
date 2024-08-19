export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!import.meta.client) return;
  if (!to.path.startsWith('/admin') || to.path.endsWith('/admin/login')) return;

  // localstorage value.
  const auth = ref(localStorage.getItem('auth'));
  const authValue = auth.value;

  // // have auth value and check with database.
  if (authValue) {
    try {
      const id = JSON.parse(authValue).id;
      const res = await $fetch('/api/auth/loginCheck', {
        query: {
          id,
        },
      });

      if (!res) return reLogin();
    } catch (error) {
      console.error('Failed to fetch article:', error);
    }
  } else {
    return reLogin();
  }
});

function reLogin() {
  localStorage.removeItem('auth');
  return navigateTo('/admin/login');
}
