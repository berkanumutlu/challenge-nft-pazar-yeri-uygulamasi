<template>
  <v-card class="mb-6 !border-gray-200 !bg-gray-800 !rounded-lg">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="3">
          <v-select
            v-model="filters.mediaType"
            :items="mediaTypeOptions"
            label="Media Type"
            outlined
            dense
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
          >
            <template v-slot:prepend>
              <v-text-field
                :value="filters.priceRange[0]"
                class="mt-0 pt-0"
                hide-details
                single-line
                type="number"
                style="width: 100px"
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
                @change="$set(filters.priceRange, 1, Number($event))"
              ></v-text-field>
            </template>
          </v-range-slider>
          </div>
        </v-col>
        <v-col cols="12" md="2">
          <div class="h-full flex items-center justify-end">
            <v-btn @click="applyFilters" class="!bg-primary/30">Apply Filters</v-btn>
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
  mediaType: '',
  priceRange: [0, 2000]
});

const mediaTypeOptions = [
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
        ...(filters.mediaType && { mediaType: filters.mediaType }),
        price: {
          $gte: filters.priceRange[0],
          $lte: filters.priceRange[1]
        }
      },
      limit: 12,
      skip: 0,
      order: {
        createdAt: "DESC"
      }
    }
  };

  router.push({ 
    query: { 
      mediaType: filters.mediaType,
      minPrice: filters.priceRange[0],
      maxPrice: filters.priceRange[1]
    } 
  });

  emit('filter-applied', requestPayload);
};
</script>