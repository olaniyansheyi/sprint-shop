<template>
  <div class="w-full flex flex-col items-start justify-center px-2">
    <!-- Product and Image Section -->
    <div
      class="flex flex-col lg:flex-row gap-3 text-secondary w-full relative cursor-pointer bg-white"
    >
      <div
        class="w-full lg:w-[50%] py-5 rounded-2xl bg-[#F8FAFC] flex justify-center items-center"
      >
        <img class="w-[40%] bg-[#F8FAFC]" :src="product?.image" />
      </div>

      <div
        class="w-full lg:w-[40%] border border-gray-200 rounded-xl flex flex-col gap-4 p-4"
      >
        <!-- Rating Section -->
        <div class="w-full flex gap-x-2 my-2">
          <svg
            width="30"
            height="30"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8.99008 2.67502C9.36342 1.77752 10.6368 1.77752 11.0101 2.67502L12.7451 6.84752L17.2484 7.20835C18.2184 7.28585 18.6118 8.49585 17.8726 9.12918L14.4418 12.0683L15.4893 16.4625C15.7151 17.4092 14.6859 18.1567 13.8559 17.65L10.0001 15.295L6.14425 17.65C5.31425 18.1567 4.28508 17.4083 4.51092 16.4625L5.55842 12.0683L2.12758 9.12918C1.38842 8.49585 1.78175 7.28585 2.75175 7.20835L7.25508 6.84752L8.99008 2.67502Z"
              fill="#FBBF24"
            />
          </svg>
          <p class="text-[#666666] text-[14px] lg:text-[20px]">
            {{ product?.rating.rate }}
          </p>
          <p class="text-[#666666] text-[14px] lg:text-[20px] underline">
            {{ product?.rating.count }} reviews
          </p>
        </div>

        <!-- Quantity and Cart Button Section -->
        <div class="w-full flex flex-col items-start gap-3 justify-center">
          <div
            class="w-fit px-4 py-2 bg-[#F8F8F8] rounded-full flex gap-x-3 items-center justify-center"
          >
            <button @click="handleDecrement(product?.id)">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.5">
                  <rect
                    x="0.5"
                    y="0.5"
                    width="23"
                    height="23"
                    rx="11.5"
                    fill="white"
                  />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="23"
                    height="23"
                    rx="11.5"
                    stroke="#E5E7EB"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7 12C7 11.8674 7.04789 11.7402 7.13313 11.6464C7.21838 11.5527 7.33399 11.5 7.45455 11.5H16.5455C16.666 11.5 16.7816 11.5527 16.8669 11.6464C16.9521 11.7402 17 11.8674 17 12C17 12.1326 16.9521 12.2598 16.8669 12.3536C16.7816 12.4473 16.666 12.5 16.5455 12.5H7.45455C7.33399 12.5 7.21838 12.4473 7.13313 12.3536C7.04789 12.2598 7 12.1326 7 12Z"
                    fill="#111827"
                  />
                </g>
              </svg>
            </button>
            <p class="text-[#666666] text-[14px] lg:text-[16px]">
              {{ product?.quantity }}
            </p>
            <button @click="handleIncrement(product?.id)">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="23"
                  height="23"
                  rx="11.5"
                  fill="white"
                />
                <rect
                  x="0.5"
                  y="0.5"
                  width="23"
                  height="23"
                  rx="11.5"
                  stroke="#E5E7EB"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 7C12.1206 7 12.2362 7.04789 12.3214 7.13313C12.4067 7.21838 12.4545 7.33399 12.4545 7.45455V11.5455H16.5455C16.666 11.5455 16.7816 11.5933 16.8669 11.6786C16.9521 11.7638 17 11.8794 17 12C17 12.1206 16.9521 12.2362 16.8669 12.3214C16.7816 12.4067 16.666 12.4545 16.5455 12.4545H12.4545V16.5455C12.4545 16.666 12.4067 16.7816 12.3214 16.8669C12.2362 16.9521 12.1206 17 12 17C11.8794 17 11.7638 16.9521 11.6786 16.8669C11.5933 16.7816 11.5455 16.666 11.5455 16.5455V12.4545H7.45455C7.33399 12.4545 7.21838 12.4067 7.13313 12.3214C7.04789 12.2362 7 12.1206 7 12C7 11.8794 7.04789 11.7638 7.13313 11.6786C7.21838 11.5933 7.33399 11.5455 7.45455 11.5455H11.5455V7.45455C11.5455 7.33399 11.5933 7.21838 11.6786 7.13313C11.7638 7.04789 11.8794 7 12 7Z"
                  fill="#111827"
                />
              </svg>
            </button>
          </div>
          <button
            @click="onAddToCart"
            class="flex items-center rounded-full justify-center bg-[#111827] gap-x-2 p-2 px-4"
          >
            <p
              class="text-[#FFFFFF] text-[14px] lg:text-[16px] whitespace-nowrap"
            >
              Add to cart
            </p>
          </button>
        </div>
      </div>
    </div>

    <!-- Product Details Section -->
    <div class="w-full flex justify-between items-start my-3 flex-col px-2">
      <span class="w-full flex justify-between items-start">
        <h1
          class="w-[70%] max-h-[20%] text-[16px] lg:text-[28px] font-semibold truncate text-ellipsis overflow-hidden"
        >
          {{ product?.title }}
        </h1>
      </span>
      <p class="text-[#666666] text-[12px] lg:text-[16px]">
        {{ product?.category }}
      </p>
      <p class="lg:w-[50%] text-[#666666] text-[12px] lg:text-[16px]">
        {{ product?.description }}
      </p>
    </div>

    <Recommended />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import CartItem from "~/components/cartItem.vue";
import { useCartStore } from "~/stores/cart";
import { useProductsStore } from "~/stores/products";

type Product = {
  id: number;
  title: string;
  image: string;
  description: string;
  category: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
};

type CartItem = {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  category: string;
};

const mapProductToCartItem = (product: Product): CartItem => ({
  id: product.id,
  name: product.title,
  image: product.image,
  quantity: quantity.value,
  price: product.price,
  category: product.category,
});

// State and Route Params
const product = ref<Product | null>(null);
const quantity = ref(1);
const route = useRoute();
const productsStore = useProductsStore();
const cartStore = useCartStore();

// Fetch Product on Mount
onMounted(async () => {
  const productId = route.params.id;

  if (typeof productId === "string") {
    const numericProductId = Number(productId);
    if (!isNaN(numericProductId)) {
      product.value = await productsStore.fetchProductById(numericProductId);
    } else {
      console.error("Invalid product ID format");
    }
  }
});

// Event Handlers
const handleIncrement = (id: number) => cartStore.increaseQuantity(id);
const handleDecrement = (id: number) => {
  cartStore.decreaseQuantity(id);
};
const onAddToCart = () => {
  if (product.value) {
    cartStore.handleAddToCart(mapProductToCartItem(product.value));
  }
};
</script>
