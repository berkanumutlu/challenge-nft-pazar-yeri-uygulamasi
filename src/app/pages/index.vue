<template>
  <div
  class="w-full h-full relative overflow-hidden rounded-lg bg-no-repeat p-12 text-center bg-cover bg-center"
  style="background-image: url('https://img.freepik.com/free-vector/flat-design-nft-concept-illustration_23-2148952486.jpg?t=st=1731870995~exp=1731874595~hmac=aee15fdcaa9fb5d25579ed949323bb574797949dfea89f461a1b34b10d52465d&w=1380');">
    <div class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden object-cover bg-black/90">
      <div class="flex h-full items-center justify-center">
        <div class="space-y-12 flex flex-col items-center justify-center text-center z-[1]">
          <h1 class="text-5xl font-bold tracking-tight text-text-secondary-color dark:text-text-primary-color sm:text-7xl">
            NFT <span class="!text-primary block lg:inline-block">Marketplace</span>
          </h1>
          <div class="text-lg tracking-tight !text-secondary/70 dark:text-primary">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br>
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </div>
          <SearchInput />
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import SearchInput from "@/components/ui/SearchInput.vue";

useSeoMeta({
  title: 'Home Page',
  description: 'Home page description'
});
</script>