<template>
  <div class="flex flex-col items-start gap-y-5 tracking-wider">
    <button class="py-4 text-left text-[#E6B41D] text-lg w-full">
      OUR CATEGORIES
    </button>

    <div
      v-if="productsStore.categories.length"
      class="flex flex-col items-start gap-y-5 tracking-wider text-secondary text-[14px] mb-10"
    >
      <NuxtLink
        v-for="category in productsStore.categories"
        :key="category"
        :to="`/category/${category}`"
      >
        <span class="capitalize">{{ category }} </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from "~/stores/products";

const productsStore = useProductsStore();

onMounted(async () => {
  try {
    await productsStore.fetchCategories();
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
  }
});
</script>
