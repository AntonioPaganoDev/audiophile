<template>
  <div class="mb-40 mt-20">
    <div class="text-[40px] font-bold uppercase leading-none text-center mb-24 bg-black py-26">
      <span class="text-white">speakers</span>
    </div>

    <div class="page-container flex justify-between w-full gap-30 mb-20">
      <div class="w-full">
        <img
          src="@/assets/product-zx9-speaker/desktop/image-product.jpg"
          alt="ZX9 Speaker"
          class="mx-auto rounded-lg"
        />
      </div>

      <div class="w-full">
        <div class="flex flex-col justify-center h-full space-y-8">
          <div class="text-sm uppercase opacity-50 text-primary">new product</div>
          <div class="text-[40px] font-bold uppercase leading-none w-1/2">zx9 speaker</div>

          <div class="opacity-50">
            Upgrade your sound system with the all new zx9 active speaker. It’s a bookshelf speaker
            system that offers truly wireless connectivity - creating new possibilities for more
            pleasing and practical audio setups.
          </div>

          <TheButton variant="primary" class="w-fit" @click="redirect('/product/zx9-speaker')">
            See product
          </TheButton>
        </div>
      </div>
    </div>

    <div class="page-container flex justify-between w-full gap-30 mb-40">
      <div class="w-full">
        <div class="flex flex-col justify-center h-full space-y-8">
          <div class="text-[40px] font-bold uppercase leading-none w-1/2">zx7 speaker</div>

          <div class="opacity-50">
            Stream high quality sound wirelessly with minimal to no loss. The zx7 speaker uses
            high-end audiophile components that represents the top of the line powered speakers for
            home or studio use.
          </div>

          <TheButton variant="primary" class="w-fit" @click="redirect('/product/zx7-speaker')">
            See product
          </TheButton>
        </div>
      </div>

      <div class="w-full">
        <img
          src="@/assets/product-zx7-speaker/desktop/image-product.jpg"
          alt="ZX7 Speaker"
          class="mx-auto rounded-lg"
        />
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
import earphonesImage from '@/assets/shared/desktop/image-category-thumbnail-earphones.png'
import headphonesImage from '@/assets/shared/desktop/image-category-thumbnail-headphones.png'
import TheButton from '@/components/TheButton.vue'

const products = [
  {
    id: 1,
    name: 'Headphones',
    image: headphonesImage,
    to: '/headphones',
  },
  {
    id: 3,
    name: 'Earphones',
    image: earphonesImage,
    to: '/earphones',
  },
]

const redirect = (to) => {
  if (to) {
    window.location.href = to
  }
}
</script>
