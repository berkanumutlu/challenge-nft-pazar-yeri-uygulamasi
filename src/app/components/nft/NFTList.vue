<template>
  <div  v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <NFTItemSkeleton v-if="isLoading" v-for="index in 8" :key="'skeleton-' + index" />
  </div>
  <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    <NFTItem v-for="item in items" :key="item.id" :item="item" class="my-4" />
  </div>
</template>

<script setup>
import NFTItem from "@/components/nft/NFTItem.vue";
import NFTItemSkeleton from "@/skeletons/NFTItemSkeleton.vue";

defineProps({
  items: {
    type: Array,
    required: true
  },
  isLoading: {
    type: Boolean,
    required: true
  }
});
</script>