<template>
    <div class="container mx-auto px-4 py-8">
        <v-container>
            <h1 class="text-h4 font-weight-bold mb-6 text-center">NFT List</h1>
            <FilterSection @filter-applied="onFilterApplied" />
            <NFTList :items="nftItems" class="my-12" />
            <Pagination :meta="meta" @page-change="onPageChange" />
        </v-container>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import FilterSection from "@/components/partials/FilterSection.vue";
import NFTList from "@/components/nft/NFTList.vue";
import Pagination from "@/components/partials/Pagination.vue";

const { $axios } = useNuxtApp();

const nftItems = ref([]);
const meta = ref({});
const currentFilters = ref({});

const fetchNFTs = async (filters = currentFilters.value) => {
  try {
    const response = await $axios.post('/nft/list', filters)
    if (response.data.success && response.data.status === 200) {
      const responseData = response.data;
      nftItems.value = responseData?.data?.items;
      meta.value = responseData?.data?.meta;
      currentFilters.value = filters;
    } else {
      console.error("Unexpected response:", response.data);
    }
  } catch (error) {
    console.error('Error fetching NFTs:', error);
  }
};

const onFilterApplied = (filters) => {
  fetchNFTs(filters);
};

const onPageChange = (page) => {
  const updatedFilters = {
    ...currentFilters.value,
    filters: {
      ...currentFilters.value.filters,
      skip: (page - 1) * meta.value.perPage
    }
  };
  fetchNFTs(updatedFilters);
}

onMounted(() => {
  const initialFilters = {
    filters: {
      select: ["id", "title", "slug", "price", "priceCurrency", "media", "createdBy"],
      selectInclude: ["id", "firstName", "lastName", "fullName", "avatar"],
      where: {
        status: true
      },
      limit: 12,
      skip: 0,
      order: {
        createdAt: "DESC"
      }
    }
  };
  fetchNFTs(initialFilters);
});
</script>