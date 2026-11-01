<template>
  <div class="bg-ink h-full">
    <div class="page-container flex justify-between items-center py-80 lg:py-40 relative">
      <div
        class="space-y-8 sm:w-96 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:static lg:translate-0"
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

      <div>
        <img
          src="@/assets/home/desktop/generated-image-center.png"
          alt="Hero Image"
          class="lg:hidden absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-25"
        />

        <img
          src="@/assets/home/desktop/generated-image.png"
          alt="Hero Image"
          class="hidden lg:block"
        />
      </div>
    </div>
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
