<template>
  <div class="w-full">
    <h2 class="mb-2 px-4 xl:px-0 text-3xl font-semibold text-left">Featured NFTs</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 md:gap-y-4 px-4">
      <NFTItem v-for="(item, index) in nftItems" :key="index" :item="item" class="my-12" />
    </div>
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <div class="w-full bg-gray-200 animate-pulse h-[250px] rounded-lg"></div>
      <div class="w-full bg-gray-200 animate-pulse h-[250px] rounded-lg"></div>
      <div class="w-full bg-gray-200 animate-pulse h-[250px] rounded-lg"></div>
      <div class="w-full bg-gray-200 animate-pulse h-[250px] rounded-lg"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import NFTItem from "@/components/nft/NFTItem.vue";

const { $axios } = useNuxtApp();
const nftItems = ref([]);
const loading = ref(true);

const fetchNFTs = async () => {
  loading.value = true;
  
  try {
    const requestPayload = {
      filters: {
        select: ["id", "title", "slug", "description", "price", "priceCurrency", "media", "createdBy"],
        selectInclude: ["id", "firstName", "lastName", "fullName", "avatar"],
        where: {
          isFeatured: true,
          status: true
        },
        limit: 4,
        order: {
          createdAt: "DESC"
        }
      }
    };
    const response = await $axios.post('/nft/list', requestPayload);

    if (response?.data?.status === 200) {
      nftItems.value = response?.data?.data?.items ?? [];
    } else {
      console.error("Unexpected response:", response);
    }
  } catch (error) {
    console.error("Error fetching NFTs:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchNFTs();
});
</script>