<template>
  <div class="container mx-auto px-4 py-8">
    <v-container>
      <h1 class="text-h4 font-weight-bold mb-6 text-center">NFT List</h1>
      <FilterSection @filter-applied="onFilterApplied" :loading="isNFTsLoading" />
      <NFTList :items="nftItems" class="my-12 nft-list" />
      <Pagination 
        v-if="!isNFTsLoading && nftItems.length > 0" 
        :meta="meta" 
        @page-change="onPageChange" 
      />
    </v-container>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import FilterSection from "@/components/partials/FilterSection.vue";
import NFTList from "@/components/nft/NFTList.vue";
import Pagination from "@/components/partials/Pagination.vue";

const { $axios } = useNuxtApp();
const route = useRoute();
const router = useRouter();

const nftItems = ref([]);
const meta = ref({});
const currentFilters = ref({});
const isNFTsLoading = ref(false);

const fetchNFTs = async (filters = currentFilters.value) => {
  isNFTsLoading.value = true;
  try {
    const response = await $axios.post('/nft/list', filters);
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
  } finally {
    isNFTsLoading.value = false;
  }
};

const updateURLParams = (filters) => {
  const query = {
    page: filters.filters.skip / filters.filters.limit + 1,
    ...filters.filters.where
  };
  router.push({ query });
};

const onFilterApplied = (filters) => {
  fetchNFTs(filters);
  updateURLParams(filters);
};

const onPageChange = (page) => {
  const updatedFilters = {
    ...currentFilters.value,
    filters: {
      ...currentFilters.value.filters,
      skip: (page - 1) * (meta.value.perPage ?? 12),
      limit: meta.value.perPage ?? 12
    }
  };
  fetchNFTs(updatedFilters);
  updateURLParams(updatedFilters);
};

const getInitialFilters = () => {
  const { page, ...otherParams } = route.query;
  const pageNumber = parseInt(page) ?? 1;

  return {
    filters: {
      select: ["id", "title", "slug", "description", "price", "priceCurrency", "media", "createdBy"],
      selectInclude: ["id", "firstName", "lastName", "fullName", "avatar"],
      where: {
        status: true,
        ...otherParams
      },
      limit: 12,
      skip: (pageNumber - 1) * 12,
      order: {
        createdAt: "DESC"
      }
    }
  };
};

onMounted(() => {
  const initialFilters = getInitialFilters();
  fetchNFTs(initialFilters);
});

watch(() => route.query, (newQuery) => {
  const scrollSection = document.querySelector(".nft-list");
  if (scrollSection) {
    scrollSection.scrollIntoView({
      behavior: "smooth"
    });
  }
  if (Object.keys(newQuery).length > 0) {
    const updatedFilters = getInitialFilters();
    fetchNFTs(updatedFilters);
  }
}, { deep: true });
</script>