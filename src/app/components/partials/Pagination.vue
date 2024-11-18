<template>
  <v-container class="border-gray-200 bg-gray-800 rounded-lg">
    <v-row justify="space-between" align="center">
      <v-col cols="12" md="6" xl="3">
        <p class="text-center lg:!text-left">
          Showing {{ (meta.currentPage - 1) * meta.perPage + 1 }} to {{ Math.min(meta.currentPage * meta.perPage, meta.total) }} of {{ meta.total }} results
        </p>
      </v-col>
      <v-col cols="12" md="6" xl="9">
        <v-pagination
          v-model="localCurrentPage"
          :length="totalPages"
          :total-visible="7"
          @input="onPageChange"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  meta: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(["page-change"]);

const localCurrentPage = ref(props.meta.currentPage);
const totalPages = computed(() => props.meta.lastPage);
const route = useRoute();
const router = useRouter();

const onPageChange = (page: number) => {
  emit("page-change", page);
};

watch(localCurrentPage, (newValue) => {
  const { page, ...otherParams } = route.query;
  router.push({ query: { page: newValue, ...otherParams } });
});
</script>