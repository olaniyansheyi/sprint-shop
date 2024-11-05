<template>
  <div class="h-[70vh] w-full overflow-y-auto overflow-x-hidden">
    <div
      class="w-full flex justify-center lg:items-start flex-wrap lg:justify-start my-3 gap-x-1 gap-y-2 lg:gap-10"
    >
      <Product
        v-if="products.length"
        v-for="product in products"
        :key="product.id + product.title"
        :product="product"
      />
      <div v-else class="flex items-center justify-center">
        <h1 class="font-semibold text-[12px] whitespace-nowrap">
          No Products Found
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from "~/stores/products";

// Define the product interface
interface product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: { rate: number; count: number };
}

const products = computed(() => productsStore.products);

onMounted(async () => {
  try {
    await productsStore.fetchProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
  }
});

// Fetch products from context
const productsStore = useProductsStore();
</script>
