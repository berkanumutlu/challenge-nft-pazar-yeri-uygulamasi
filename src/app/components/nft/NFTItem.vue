<template>
  <v-card
    :disabled="loading"
    :loading="loading"
    class="mx-auto my-12 w-full overflow-visible"
    max-width="370"
  >
    <template v-slot:loader="{ isActive }">
      <v-progress-linear :active="isActive" color="deep-green" height="4" indeterminate />
    </template>

    <div class="pt-2 px-4">
      <v-img height="250" :src="item?.media" cover class="rounded-lg" />
    </div>

    <v-card-item>
      <v-card-title>{{ item?.title }}</v-card-title>
    </v-card-item>

    <v-divider class="mx-4 mb-1"></v-divider>

    <div v-if="item.description" class="py-2 px-4 text-xs text-text-secondary-color/70 text-left overflow-hidden text-ellipsis whitespace-nowrap">{{ item.description }}</div>

    <v-card-subtitle>
      <div class="py-3 flex flex-row gap-x-2">
        <v-img max-width="32" height="32" :src="item?.User?.avatar" cover class="rounded-full border-2 border-secondary/50" />
        <div class="flex items-center">
          <span class="me-1 text-xs">{{ item?.User?.fullName }}</span>
          <v-icon color="error" icon="mdi-fire-circle" size="small" />
        </div>
      </div>
    </v-card-subtitle>

    <div class="!bg-[#226738] !text-white px-[16px] py-[3px] rounded-full absolute top-[-23px] left-1/2 z-20 transform -translate-x-1/2 flex items-center gap-x-2 whitespace-nowrap border-4 border-[#333] z-1">
      <span class="text-[20px] font-normal">{{ item?.price }}</span>
      <span class="text-[10px]">{{ item?.priceCurrency }}</span>
    </div>

    <v-card-actions>
      <v-btn text="Buy" block border @click="onClick" class="!bg-primary/10 hover:!bg-primary-hover !text-sm" />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const loading = ref(false);

const onClick = () => {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
  }, 2000);
};
</script>
