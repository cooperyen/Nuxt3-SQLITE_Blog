import { useSearchStore } from '@/store/index';

export default defineNuxtRouteMiddleware((to, from) => {
  const isLoggedIn = useState('isLoggedIn', () => false);
  const store = useSearchStore();
  console.log(store.state);

  if (isLoggedIn.value) {
    return;
  }

  // return navigateTo('/admin/login');
});
