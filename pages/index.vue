<template>
  <div>
    <Spinner v-if="isLoading" />
    <div
      v-else
      class="h-fit overflow-auto px-2 lg:px-8 flex flex-col items-start gap-y-8"
    >
      <h1 class="text-2xl text-left font-bold mb-4">Shop Now</h1>
      <Products v-if="productsStore.products.length" />
      <Recommended />
    </div>
  </div>
</template>

<script setup>
import { useProductsStore } from "~/stores/products";

const isLoading = ref(false);
const productsStore = useProductsStore();

onMounted(async () => {
  isLoading.value = true;
  try {
    const data = await productsStore.fetchProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>
