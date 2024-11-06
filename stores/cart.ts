import { defineStore } from "pinia";
import usePersistState from "~/composables/usePersistState";

interface CartItem {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
  category: string;
}

export const useCartStore = defineStore("cart", {
  // Initialize the cart using the usePersistState hook
  state: () => {
    const { state: cart } = usePersistState<CartItem[]>("cart", []);
    return { cart: cart.value };
  },
  getters: {
    cartItemCount: (state) => state.cart.length,
    totalPriceCost: (state) =>
      state.cart.reduce(
        (acc: number, item: CartItem) => acc + item.quantity * item.price,
        0
      ),
  },
  actions: {
    handleAddToCart(product: CartItem) {
      const productIndex = this.cart.findIndex(
        (item: CartItem) => item.id === product.id
      );

      if (productIndex === -1) {
        // Add product if it doesn't exist in the cart
        this.cart.push({ ...product, quantity: 1 });
      } else {
        // Increase quantity if product already exists
        this.cart[productIndex].quantity += 1;
      }
    },
    handleDeleteFromCart(productId: number) {
      this.cart = this.cart.filter((item: CartItem) => item.id !== productId);
    },
    isInCart(productId: number) {
      return this.cart.some(
        (item: CartItem) => String(item.id) === String(productId)
      );
    },
    increaseQuantity(productId: number) {
      const item = this.cart.find((item: CartItem) => item.id === productId);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity(productId: number) {
      const item = this.cart.find((item: CartItem) => item.id === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    handleClearCart() {
      this.cart = [];
    },
  },
});
