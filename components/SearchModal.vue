<template>
  <Dialog :open="open" @update:open="closeDialog" class="relative z-10">
    <DialogBackdrop
      transition
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    />

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <DialogPanel
          transition
          class="relative transform overflow-hidden p-4 rounded-lg bg-white text-left shadow-xl transition-all"
        >
          <div data-testid="modal" class="flex flex-col w-full relative">
            <button
              data-testid="close-button"
              @click="closeDialog"
              class="self-end p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2em"
                height="2em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M16.95 8.464a1 1 0 0 0-1.414-1.414L12 10.586L8.464 7.05A1 1 0 1 0 7.05 8.464L10.586 12L7.05 15.536a1 1 0 1 0 1.414 1.414L12 13.414l3.536 3.536a1 1 0 1 0 1.414-1.414L13.414 12z"
                />
              </svg>
            </button>

            <form
              @submit.prevent
              class="w-full bg-[#F8FAFC] rounded-2xl relative text-black mb-6"
            >
              <input
                required
                v-model="searchQuery"
                @input="handleSearch"
                type="text"
                class="pl-10 pr-4 py-4 bg-[#F8FAFC] rounded-xl outline-none w-full bg-transparent placeholder:text-gray-400"
                placeholder="Search Products"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="absolute left-3 top-1/2 transform -translate-y-1/2"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39M11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7"
                />
              </svg>
            </form>

            <div
              v-if="filteredProducts.length"
              class="bg-[#F8FAFC] w-full h-[40vh] overflow-auto rounded-xl flex justify-center lg:items-start flex-wrap lg:justify-start my-3 gap-x-1 gap-y-2"
            >
              <SearchProduct
                v-for="product in filteredProducts"
                :key="product.id"
                :product="product"
              />
            </div>
            <div v-else class="flex items-center justify-center my-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="7em"
                height="7em"
                viewBox="0 0 16 16"
              >
                <path
                  fill="gray"
                  fill-rule="evenodd"
                  d="M1.75 1a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5zM1 4.75A.75.75 0 0 1 1.75 4H7a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 4.75m9 7.75a2.5 2.5 0 1 0 0-5a2.5 2.5 0 0 0 0 5m0 1.5c.834 0 1.607-.255 2.248-.691l1.472 1.471a.75.75 0 1 0 1.06-1.06l-1.471-1.472A4 4 0 1 0 10 14M1.75 7a.75.75 0 0 0 0 1.5H4A.75.75 0 0 0 4 7z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useProductsStore } from "~/stores/products";

import { debounce } from "lodash";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/vue";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: { rate: number; count: number };
}

const emit = defineEmits(["update:open"]);

const props = defineProps<{
  open: boolean;
}>();

const productsStore = useProductsStore();
const searchQuery = ref("");
const filteredProducts = ref<Product[]>(productsStore.products);

const debouncedHandleSearch = debounce((query: string) => {
  const filtered = productsStore.products.filter((product: Product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );
  filteredProducts.value = filtered;
  productsStore.saveQuery(query);
}, 100);

const handleSearch = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const query = target.value.toLowerCase();
  searchQuery.value = query;
  debouncedHandleSearch(query);
};

const closeDialog = () => {
  emit("update:open", false);
};

// Watch for changes in products to update filtered products
watch(productsStore.products, (newProducts) => {
  filteredProducts.value = newProducts;
});
</script>
