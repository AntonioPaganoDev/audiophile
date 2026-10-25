<template>
  <div class="relative">
    <div class="absolute inset-0">
      <div class="page-container relative h-full">
        <div
          class="absolute left-1/2 lg:left-0 top-28 sm:top-1/2 tranform -translate-x-1/2 lg:translate-x-0 sm:-translate-y-1/2 w-80 sm:w-90 lg:w-100 space-y-8 p-6 sm:p-0"
        >
          <div class="text-white text-sm uppercase opacity-50 text-center lg:text-start">
            new product
          </div>
          <div
            class="text-white text-4xl sm:text-5xl font-bold uppercase leading-none text-center lg:text-start"
          >
            xx99 mark ii headphones
          </div>
          <div class="text-white opacity-50 text-sm w-full text-center lg:text-start">
            Experience natural, lifelike audio and exceptional build quality made for the passionate
            music enthusiast.
          </div>

          <div class="flex justify-center lg:hidden">
            <TheButton
              variant="primary"
              size="sm"
              @click="redirect('/product/xx99-mark-ii-headphones')"
              >See product</TheButton
            >
          </div>

          <div class="hidden lg:flex lg:justify-start">
            <TheButton
              variant="primary"
              size="md"
              @click="redirect('/product/xx99-mark-ii-headphones')"
              >See product</TheButton
            >
          </div>
        </div>
      </div>
    </div>

    <img src="@/assets/home/mobile/image-header.jpg" alt="Hero Image" class="w-full sm:hidden" />
    <img
      src="@/assets/home/tablet/image-header.jpg"
      alt="Hero Image"
      class="w-full hidden sm:block lg:hidden"
    />
    <img
      src="@/assets/home/desktop/image-header.jpg"
      alt="Hero Image"
      class="w-full hidden lg:block"
    />
  </div>
</template>

<script setup>
import TheButton from './TheButton.vue'

const redirect = (to) => {
  if (to) {
    window.location.href = to
  }
}
</script>
