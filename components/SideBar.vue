<template>
  <div
    class="w-full bg-white h-full z-20 left-0 overflow-y-auto border-r border-gray-300"
  >
    <div class="w-full h-full relative">
      <div class="pt-10 px-6 space-y-4">
        <div class="flex flex-col gap-y-4">
          <NavLink to="/">
            <h1 class="text-4xl font-bold mb-4 text-[#27141A]">
              Sprint Sh<span class="text-[#E6B41D]">o</span>p
            </h1>
          </NavLink>
        </div>
        <Categories />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
