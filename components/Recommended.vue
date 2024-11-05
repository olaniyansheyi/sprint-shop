<template>
  <div class="w-full flex flex-col items-start">
    <h1 v-if="products.length" class="text-2xl text-left font-bold mb-4">
      Recommended
    </h1>

    <div class="w-full h-fit overflow-x-auto overflow-y-hidden">
      <div class="w-fit h-fit flex justify-center gap-4 lg:gap-8">
        <Product
          v-for="product in products"
          :key="product.id + product.title"
          :product="product"
          
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


import { useProductsStore } from '~/stores/products';

interface ProductType {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: { rate: number; count: number };
}

const productsStore  = useProductsStore();
const products = ref<ProductType[]>([]);

// Fetch recommended products when the component mounts or when query changes
const fetchProducts = async () => {
  const data = await productsStore.getRecommendations();
  products.value = data;
};

onMounted(() => {
  productsStore.fetchProducts();
});

// Watch for changes in the query to fetch new recommendations
watch(() => query, fetchProducts);

// Handle navigation to product details (if needed)
const navigateToProduct = (productId: number) => {
</script>
