<template>
  <header class="border-b border-gray-200">
    <div class="container mx-auto px-4 py-4 flex items-center justify-between">
      <div class="flex items-center gap-x-1">
        <img :src="appLogo" :alt="`${appName} Logo`" class="w-auto h-8" />
        <span class="font-semibold">{{ appName }}</span>
      </div>
      <div class="flex items-center">
        <template v-if="isLoggedIn">
          <div class="relative">
            <button @click="toggleDropdown" class="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none">
              <span>{{ userName }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            <div v-if="isDropdownOpen" class="mt-2 py-1 w-48 absolute right-0 bg-slate-500 rounded-md shadow-lg z-10">
              <a href="#" class="px-4 py-2 block text-sm text-gray-700 hover:bg-gray-100">Profile</a>
              <a href="#" class="px-4 py-2 block text-sm text-gray-700 hover:bg-gray-100">My NFTs</a>
              <a @click="logout" href="#" class="px-4 py-2 block text-sm text-gray-700 hover:bg-gray-100">Logout</a>
            </div>
          </div>
        </template>
        <template v-else>
          <a href="#" class="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Login</a>
          <a href="#" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium ml-3">Sign Up</a>
        </template>
      </div>
    </div>
  </header>
</template>
  
<script setup lang="ts">
import { ref, inject } from "vue";

const appName: string = inject('appName') as string;
const appLogo: string = inject('appLogo') as string;

const isLoggedIn = ref(false);
const userName = ref('John Doe');
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const logout = () => {
  // ...
  isLoggedIn.value = false;
  isDropdownOpen.value = false;
};
</script>