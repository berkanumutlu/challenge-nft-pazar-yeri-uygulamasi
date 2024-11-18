<template>
    <footer class="mt-auto relative bg-footer-bg-color border-t border-gray-200">
      <div class="absolute top-0 left-0 w-full h-[2px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-secondary/50 to-secondary-hover/50"></div>
      <div class="container mx-auto px-4 py-6 flex items-center justify-between">
        <div class="text-gray-300">
          © 2024 <span class="font-semibold">{{ appName }}</span>
        </div>
        <div class="space-x-4 flex items-center">
          <a href="https://www.linkedin.com/in/berkanumutlu" target="_blank" rel="noopener noreferrer" class="text-text-secondary-color hover:text-primary">
            <span class="sr-only">LinkedIn</span>
            <v-icon>mdi-linkedin</v-icon>
          </a>
          <a href="https://github.com/berkanumutlu/challenge-nodejs-nft-marketplace-app" target="_blank" rel="noopener noreferrer" class="text-text-secondary-color hover:text-primary">
            <span class="sr-only">GitHub</span>
            <v-icon>mdi-github</v-icon>
          </a>
        </div>
      </div>
    </footer>
</template>

<script setup lang="ts">
import { inject } from "vue";

const appName: string = inject('appName') as string;
</script>