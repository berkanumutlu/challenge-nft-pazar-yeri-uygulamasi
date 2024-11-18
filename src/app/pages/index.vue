<template>
  <div
    class="p-12 w-full h-full relative rounded-lg text-center !bg-primary bg-cover bg-center bg-no-repeat bg-[url('https://img.freepik.com/free-vector/flat-design-nft-concept-illustration_23-2148952486.jpg?t=st=1731870995~exp=1731874595~hmac=aee15fdcaa9fb5d25579ed949323bb574797949dfea89f461a1b34b10d52465d&w=1380')]"
  >
    <div class="w-full h-full absolute top-0 bottom-0 left-0 right-0 object-cover bg-black/90">
      <div class="flex h-full items-center justify-center">
        <div class="w-1/2 space-y-12 flex flex-col items-center justify-center z-[1]">
          <h1 class="text-5xl font-bold tracking-tight text-text-secondary-color dark:text-text-primary-color sm:text-7xl">
            NFT <span class="!text-primary block lg:inline-block">Marketplace</span>
          </h1>
          <div class="text-lg tracking-tight !text-secondary/70 dark:text-primary">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </div>
          <SearchInput class="w-1/2" />
          <FeaturedNFTs />
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import SearchInput from "@/components/ui/SearchInput.vue";
import FeaturedNFTs from "@/components/nft/FeaturedNFTs.vue";

useSeoMeta({
  title: 'Home Page',
  description: 'Home page description'
});
</script>