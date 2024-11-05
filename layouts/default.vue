<template>
  <div class="w-full layout bg-white h-screen">
    <div class="w-full h-full items-center justify-center lg:gap-x-4">
      <section class="w-full h-full flex justify-between overflow-hidden">
        <!-- Sidebar -->
        <aside class="hidden lg:flex w-[20%] h-full">
          <SideBar />
        </aside>

        <!-- Main content -->
        <main class="w-full lg:w-[78%] h-full overflow-auto pb-4">
          <ShopHeader />
          <!-- Slot for nested pages -->
          <NuxtPage />
        </main>
      </section>
    </div>
  </div>
</template>
