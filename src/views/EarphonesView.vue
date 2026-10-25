<template>
  <div class="mb-40 mt-20">
    <div class="text-[40px] font-bold uppercase leading-none text-center mb-24 bg-black py-26">
      <span class="text-white">earphones</span>
    </div>

    <div class="page-container flex justify-between w-full gap-30 mb-40">
      <div class="w-full">
        <img
          src="@/assets/product-yx1-earphones/desktop/image-product.jpg"
          alt="YX1 Earphones"
          class="mx-auto rounded-lg"
        />
      </div>

      <div class="w-full">
        <div class="flex flex-col justify-center h-full space-y-8">
          <div class="text-sm uppercase opacity-50 text-primary">new product</div>
          <div class="text-[40px] font-bold uppercase leading-none w-1/2">yx1 earphones</div>

          <div class="opacity-50">
            Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless
            Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its
            active noise cancellation feature.
          </div>

          <TheButton variant="primary" class="w-fit" @click="redirect('/product/yx1-earphones')">
            See product
          </TheButton>
        </div>
      </div>
    </div>

    <div class="page-container flex justify-between w-full gap-30 mb-20">
      <TheThumbnails
        v-for="product in products"
        :key="product.id"
        :image="product.image"
        :alt="product.name"
        :to="product.to"
        class="w-full"
      />
    </div>

    <TheMan />
  </div>
</template>

<script setup>
import TheMan from '@/components/TheMan.vue'
import TheThumbnails from '@/components/TheThumbnails.vue'
import headphonesImage from '@/assets/shared/desktop/image-category-thumbnail-headphones.png'
import speakersImage from '@/assets/shared/desktop/image-category-thumbnail-speakers.png'
import TheButton from '@/components/TheButton.vue'

const products = [
  {
    id: 1,
    name: 'Headphones',
    image: headphonesImage,
    to: '/headphones',
  },
  {
    id: 2,
    name: 'Speakers',
    image: speakersImage,
    to: '/speakers',
  },
]

const redirect = (to) => {
  if (to) {
    window.location.href = to
  }
}
</script>
