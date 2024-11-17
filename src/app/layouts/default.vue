<template>
  <v-app>
    <div class="flex flex-col min-h-screen">
      <Header />
      <div class="flex-grow">
        <slot />
      </div>
      <Footer />
    </div>
  </v-app>
</template>

<script setup lang="ts">
import Header from "@/components/shared/Header.vue";
import Footer from "@/components/shared/Footer.vue";
</script>