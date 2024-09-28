<template>
  <div>
    <AdminUILoading></AdminUILoading>
    <div class="bg-gray-200 h-screen w-full">
      <div class="flex md:h-full md:items-center mx-auto max-w-96 max-md:px-2">
        <div class="w-full bg-white rounded-md px-5 pt-3 pb-6 max-md:mt-10">
          <!-- title -->
          <div class="text-center text-xl">華生BLOG</div>
          <!-- content -->
          <div
            class="mt-2 relative border-2 rounded-md"
            :class="{ 'border-red-600': remind }">
            <p
              v-show="account"
              class="absolute top-1.5 left-2 text-xs text-gray-500">
              帳號
            </p>
            <input
              @click="(remind = false), (wrongRemind = false)"
              autocomplete="off"
              :class="{ 'pb-1 pt-5': account }"
              class="px-2 py-3 w-full rounded-md text-black"
              type="text"
              v-model="account"
              placeholder="帳號" />
          </div>
          <div class="mt-2 relative border-2 rounded-md flex items-center">
            <p
              v-show="password"
              class="absolute top-1.5 left-2 rounded-md text-xs text-gray-500">
              密碼
            </p>
            <input
              @click="wrongRemind = false"
              @keyup.enter="login"
              autocomplete="off"
              :class="{ 'pb-1 pt-5': password }"
              class="px-2 py-3 w-full text-black"
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="密碼" />
            <button
              class="mx-2"
              @click="showPassword = !showPassword">
              <font-awesome-icon
                v-show="!showPassword"
                :icon="['fas', 'eye-slash']" />
              <font-awesome-icon
                v-show="showPassword"
                :icon="['fas', 'eye']" />
            </button>
          </div>
          <div
            v-show="wrongRemind"
            class="text-sm text-red-600 mt-1 ml-1">
            帳號密碼錯誤
          </div>
          <!-- login button -->
          <div class="text-center w-full mt-5">
            <button
              @click="login"
              :class="!clickable ? 'bg-green-400' : 'bg-gray-400'"
              class="rounded-md px-4 py-1">
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'admin-login',
    pageTransition: false,
  });

  import { useLoadingState } from '@/stores/globalStates';
  const { loadingSwitch } = useLoadingState();

  const { $symbolRegExp, $locally } = useNuxtApp(); // make sure this is at the top or as close as possible to the top
  const router = useRouter();
  const account: Ref<string> = ref('');
  const remind: Ref<boolean> = ref(false);
  const wrongRemind: Ref<boolean> = ref(false);
  const password: Ref<string> = ref('');
  const showPassword: Ref<boolean> = ref(false);
  const loginProcess: Ref<boolean> = ref(false);

  const clickable = computed(() => {
    if (password.value && account.value && !wrongRemind.value) return false;
    else return true;
  });

  function longinValueCheck() {
    let val = false;

    if (loginProcess.value || clickable.value) val = true;
    if (!checkSymbol()) val = true;

    return val;
  }

  async function doLogin() {
    loginProcess.value = true;

    interface res {
      state: boolean;
      id?: string;
    }

    const res = await $fetch<res>('/api/auth/login', {
      method: 'GET',
      query: {
        account: account.value,
        password: password.value,
      },
    });


    if (!res?.state) {
      loginProcess.value = false;
      wrongRemind.value = true;
      loadingSwitch(false);
    } else {
      $locally.setItem('auth', JSON.stringify({ id: res.id }));
      navigateTo('/admin');
    }
  }

  function login() {
    loadingSwitch(true);
    if (longinValueCheck()) {
      loadingSwitch(false);
    } else {
      doLogin();
    }
  }

  // createUser();
  async function createUser() {
    const res = await $fetch('/api/test-create-user', {
      method: 'GET',
    });
    // console.log(res);
  }

  async function getIP() {
    const currentIP = await fetch('https://api.ipify.org?format=json');
    const res = await currentIP.json();
    return res.ip;
  }

  function checkSymbol() {
    if (account.value.match($symbolRegExp) === null) return true;
    else {
      remind.value = true;
      return false;
    }
  }

  onBeforeUnmount(() => {
    loadingSwitch(false);
  });
</script>
