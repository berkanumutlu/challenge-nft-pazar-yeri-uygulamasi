<template>
  <v-card class="w-full">
    <v-text-field
      v-model="searchQuery"
      :loading="loading"
      append-inner-icon="mdi-magnify"
      density="compact"
      label="Search NFTs"
      variant="solo"
      hide-details
      single-line
      @click:append-inner="onClick"
      @keyup.enter="onClick"
    ></v-text-field>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const searchQuery = ref('');
const loading = ref(false);

const router = useRouter();

const onClick = () => {
  if (!searchQuery.value.trim()) return;

  loading.value = true;

  setTimeout(() => {
    loading.value = false;

    router.push({ 
      path: '/nft/list', 
      query: { search: searchQuery.value.trim() } 
    });
  }, 500);
};
</script>
