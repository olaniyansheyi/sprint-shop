<template>
  <div
    class="h-fit overflow-auto px-2 lg:px-8 flex flex-col items-start gap-y-8"
  >
    <h1 class="text-2xl text-left font-bold mb-4 capitalize">{{ category }}</h1>
    <Products />
    <!-- <Recommended /> -->
    <Spinner v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "~/stores/products";

const route = useRoute();
const category = route.params.category;
const productsStore = useProductsStore();
const products = ref([]);

onMounted(async () => {
  console.log(category);
  await productsStore.fetchProductsByCategory(category);
});
</script>
