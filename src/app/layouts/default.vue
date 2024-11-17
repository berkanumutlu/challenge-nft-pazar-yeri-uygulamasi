<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/components/shared/Header.vue";
import Footer from "@/components/shared/Footer.vue";
</script>