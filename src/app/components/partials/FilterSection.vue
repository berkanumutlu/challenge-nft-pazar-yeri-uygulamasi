<template>
  <v-card class="mb-6 !border-gray-200 !bg-gray-800 !rounded-lg">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="3">
          <v-select
            v-model="filters.mediaFileType"
            :items="mediaFileTypeOptions"
            label="Media Type"
            outlined
            dense
            :disabled="loading"
          ></v-select>
        </v-col>
        <v-col cols="12" md="7">
          <div class="h-full flex items-center">
            <v-range-slider
              v-model="filters.priceRange"
              :max="2000"
              :min="0"
              :step="1"
              label="Price Range"
              :disabled="loading"
              class="!block md:!grid"
            >
              <template v-slot:prepend>
                <v-text-field
                  :value="filters.priceRange[0]"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 100px"
                  :disabled="loading"
                  @change="$set(filters.priceRange, 0, Number($event))"
                ></v-text-field>
              </template>
              <template v-slot:append>
                <v-text-field
                  :value="filters.priceRange[1]"
                  class="mt-0 pt-0"
                  hide-details
                  single-line
                  type="number"
                  style="width: 100px"
                  :disabled="loading"
                  @change="$set(filters.priceRange, 1, Number($event))"
                ></v-text-field>
              </template>
            </v-range-slider>
          </div>
        </v-col>
        <v-col cols="12" md="2">
          <div class="h-full flex items-center justify-center xl:justify-end">
            <v-btn 
              @click="applyFilters" 
              class="!bg-primary/30" 
              :disabled="loading"
            >
              Apply Filters
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const filters = reactive({
  mediaFileType: '',
  priceRange: [0, 2000]
});
defineProps({
  loading: {
    type: Boolean,
    required: true
  }
});

const mediaFileTypeOptions = [
  { title: 'All', value: '' },
  { title: 'Image', value: 'IMAGE' },
  { title: 'Video', value: 'VIDEO' }
];

const emit = defineEmits(['filter-applied']);

const applyFilters = async () => {
  const requestPayload = {
    filters: {
      select: ["id", "title", "slug", "price", "priceCurrency", "media", "createdBy"],
      selectInclude: ["id", "firstName", "lastName", "fullName", "avatar"],
      where: {
        status: true,
        ...(filters.mediaFileType && { mediaFileType: filters.mediaFileType }),
        price: [filters.priceRange[0], filters.priceRange[1]]
      },
      limit: 12,
      skip: 0,
      order: {
        createdAt: "DESC"
      }
    }
  };
  
  const query: Record<string, string | number> = {};
  if (filters.mediaFileType) {
    query.mediaFileType = filters.mediaFileType;
  }
  if (filters.priceRange[0] > 0) {
    query.minPrice = filters.priceRange[0];
  }
  if (filters.priceRange[1] < 2000) {
    query.maxPrice = filters.priceRange[1];
  }
  router.push({ query });

  emit('filter-applied', requestPayload);
};
</script>