<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { provide } from "vue";

const config = useRuntimeConfig();
provide('appName', config.public.appName as string);
provide('appLogo', config.public.appLogo as string);

useSeoMeta({
  titleTemplate: (title) => (title ? `${title} - ${config.public.appName}` : config.public.appName),
  // title: config.public.appName,
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: config.public.appLogo,
  twitterCard: 'summary_large_image'
});
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
});
</script>