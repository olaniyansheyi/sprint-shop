import { ref, onMounted, watch } from "vue";

export default function usePersistState<T>(
  storageKey: string,
  initialState: T
) {
  const state = ref<T>(initialState);

  // Make sure this runs only on the client side after mounting
  onMounted(() => {
    if (process.client) {
      const storedValue = localStorage.getItem(storageKey);
      if (storedValue) {
        state.value = JSON.parse(storedValue);
      } else {
        state.value = initialState; // Use initial state if nothing is in localStorage
      }
    }
  });

  // Watch the state and update localStorage when it changes
  watch(
    state,
    (newState) => {
      if (process.client) {
        localStorage.setItem(storageKey, JSON.stringify(newState));
      }
    },
    { deep: true } // Watch for deep changes if needed
  );

  return { state };
}
