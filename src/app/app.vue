<template>
  <NuxtLayout>
    <v-app>
      <NuxtPage />
    </v-app>
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
  ogImage: '/logo/og-iamge.jpg',
  twitterCard: 'summary_large_image'
});
useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
      crossorigin: ''
    }
  ],
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
});
</script>