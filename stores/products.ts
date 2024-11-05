import { defineStore } from "pinia";
import usePersistState from "~/composables/usePersistState";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const useProductsStore = defineStore("products", () => {
  const products = ref<Product[]>([]);
  const categories = ref<string[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Destructuring the return of usePersistState
  const { state: query, setState: setQuery } = usePersistState<string>(
    "query",
    ""
  );

  const fetchCategories = async () => {
    isLoading.value = true;
    try {
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );
      const data = await response.json();
      categories.value = data;
      return data;
    } catch (err) {
      console.error("Error fetching categories:", err);
      error.value = "Categories could not be loaded";
    } finally {
      isLoading.value = false;
    }
  };

  const fetchProducts = async () => {
    isLoading.value = true;
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data: Product[] = await response.json();
      products.value = data;
      return data;
    } catch (err) {
      console.error("Error fetching products:", err);
      error.value = "Products could not be loaded";
    } finally {
      isLoading.value = false;
    }
  };

  const fetchProductsByCategory = async (category: string) => {
    isLoading.value = true;
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${category}`
      );
      const data: Product[] = await response.json();
      products.value = data;

      return data;
    } catch (err) {
      console.error("Error fetching products by category:", err);
      error.value = "Could not load products for the selected category";
    } finally {
      isLoading.value = false;
    }
  };

  const fetchProductById = async (id: number) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data: Product = await response.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch product:", err);
      return null;
    }
  };

  const filterByCategory = (category: string) => {
    if (category === "all") {
      return products.value;
    } else {
      const filteredProducts = products.value.filter(
        (product) => product.category === category
      );
      console.log(filteredProducts);
      products.value = filteredProducts;
      return filteredProducts;
    }
  };

  const getRecommendations = computed(() => {
    return products.value.filter((product) =>
      product.title.toLowerCase().includes(query.value.toLowerCase())
    );
  });

  const saveQuery = (keyword: string) => {
    setQuery(keyword); // Use the setQuery function to update the query state
  };

  return {
    products,
    categories,
    isLoading,
    error,
    query,
    fetchCategories,
    fetchProducts,
    fetchProductsByCategory,
    fetchProductById,
    filterByCategory,
    getRecommendations,
    saveQuery,
  };
});
