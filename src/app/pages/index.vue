<template>
  <div class="w-full h-full relative text-center !bg-black/90 bg-cover bg-center bg-no-repeat bg-[url('https://img.freepik.com/free-vector/flat-design-nft-concept-illustration_23-2148952486.jpg?t=st=1731870995~exp=1731874595~hmac=aee15fdcaa9fb5d25579ed949323bb574797949dfea89f461a1b34b10d52465d&w=1380')]">
    <div class="w-full h-full flex items-center justify-center bg-black/90">
      <div class="container mx-auto px-4 lg:px-0 py-12 xl:py-0 space-y-12 z-[1]">
        <h1 class="text-3xl sm:text-5xl font-bold tracking-tight text-text-secondary-color dark:text-text-primary-color">
          NFT <span class="!text-primary block lg:inline-block">Marketplace</span>
        </h1>
        <div class="text-base sm:text-lg tracking-tight !text-secondary/70 dark:text-primary">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br />
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </div>
        <SearchInput class="w-full sm:w-2/3 lg:w-1/2 justify-self-center" />
        <FeaturedNFTs />
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