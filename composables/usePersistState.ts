import { ref, watch, onMounted } from "vue";

export default function usePersistState<T>(
  storageKey: string,
  initialState: T
) {
  const state = ref<T>(initialState);

  if (process.client) {
    onMounted(() => {
      const storedValue = localStorage.getItem(storageKey);
      if (storedValue) {
        state.value = JSON.parse(storedValue);
      } else {
        state.value = initialState;
      }
    });

    watch(
      state,
      (newState) => {
        localStorage.setItem(storageKey, JSON.stringify(newState));
      },
      { deep: true }
    );
  }

  return { state };
}
