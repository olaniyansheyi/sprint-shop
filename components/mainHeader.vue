<template>
  <div class="w-full bg-white lg:hidden">
    <div
      class="w-full px-4 z-20 sticky top-0 right-0 mx-auto flex justify-between items-center"
    >
      <div class="w-full flex items-start gap-y-2 px-4 py-4">
        <NuxtLink to="/">
          <h1 class="text-3xl font-bold text-[#27141A]">
            Sprint Sh<span class="text-[#E6B41D]">o</span>p
          </h1>
        </NuxtLink>
      </div>

      <button @click="open = true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="2em"
          height="2em"
          viewBox="0 0 32 32"
        >
          <path
            fill="black"
            d="m6.76 6l.45.89L7.76 8H12v5H4V6zm.62-2H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9l-.72-1.45a1 1 0 0 0-.9-.55m15.38 2l.45.89l.55 1.11H28v5h-8V6zm.62-2H19a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-4l-.72-1.45a1 1 0 0 0-.9-.55M6.76 19l.45.89l.55 1.11H12v5H4v-7zm.62-2H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1H9l-.72-1.45a1 1 0 0 0-.9-.55m15.38 2l.45.89l.55 1.11H28v5h-8v-7zm.62-2H19a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-4l-.72-1.45a1 1 0 0 0-.9-.55"
          />
        </svg>
      </button>
    </div>

    <Dialog :open="open" @close="open = false" class="relative z-10">
      <DialogBackdrop class="fixed inset-0 bg-gray-500 bg-opacity-75" />
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <DialogPanel
            class="relative transform overflow-hidden p-4 rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <Categories />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/vue";

const open = ref(false);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
