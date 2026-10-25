<template>
  <TheHero />

  <div class="page-container mt-40 mb-10 sm:mb-40">
    <div class="flex flex-col sm:flex-row justify-between w-full gap-30">
      <TheThumbnails
        v-for="product in products"
        :key="product.id"
        :image="product.image"
        :alt="product.name"
        :to="product.to"
        class="w-full"
      />
    </div>

    <div
      class="bg-primary flex flex-col items-center py-6 sm:py-20 mt-40 rounded-lg relative overflow-hidden"
    >
      <!-- <img
        src="@/assets/home/desktop/pattern-circles.svg"
        alt="Decorative Circles"
        aria-hidden="true"
        class="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-60"
      /> -->

      <div class="xl:hidden flex justify-center mb-10 w-60">
        <img src="@/assets/home/desktop/image-speaker-zx9.png" alt="ZX9 Speaker" class="w-40" />
      </div>

      <div class="hidden xl:flex justify-center mb-10 lg:absolute -bottom-3 left-24">
        <img src="@/assets/home/desktop/image-speaker-zx9.png" alt="ZX9 Speaker" class="w-80" />
      </div>

      <div
        class="text-center xl:text-left relative text-white max-w-sm xl:ml-auto flex flex-col justify-center h-full"
      >
        <div class="text-4xl sm:text-6xl font-bold mb-6">
          ZX9 <br />
          Speaker
        </div>
        <div class="text-lg mb-6">
          Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
        </div>

        <div class="xl:w-fit">
          <TheButton variant="secondary" @click="redirect('/product/zx9-speaker')"
            >See product</TheButton
          >
        </div>
      </div>
    </div>

    <div class="mt-10 rounded-lg relative">
      <div class="absolute top-1/2 tranform -translate-y-1/2 p-6 sm:left-40 sm:w-100 space-y-8">
        <div class="text-3xl font-bold uppercase leading-none">ZX7 Speaker</div>

        <TheButton variant="outline" @click="redirect('/product/zx7-speaker')"
          >See product</TheButton
        >
      </div>

      <div>
        <img
          src="@/assets/home/mobile/image-speaker-zx7.jpg"
          alt="ZX7 Speaker"
          class="w-full rounded-lg sm:hidden"
        />
      </div>

      <div>
        <img
          src="@/assets/home/tablet/image-speaker-zx7.jpg"
          alt="ZX7 Speaker"
          class="w-full rounded-lg hidden sm:block lg:hidden"
        />
      </div>

      <div>
        <img
          src="@/assets/home/desktop/image-speaker-zx7.jpg"
          alt="ZX7 Speaker"
          class="w-full rounded-lg hidden lg:block"
        />
      </div>
    </div>

    <div class="grid sm:grid-cols-2 gap-10 mt-10">
      <div>
        <img
          src="@/assets/home/desktop/image-earphones-yx1.jpg"
          alt="YX1 Earphones"
          class="w-full rounded-lg"
        />
      </div>

      <div>
        <div
          class="bg-gray-100 h-full rounded-lg flex flex-col sm:items-center justify-center relative p-6"
        >
          <div class="text-left space-y-8">
            <div class="text-3xl font-bold uppercase leading-none">YX1 Earphones</div>

            <TheButton variant="outline" @click="redirect('/product/yx1-earphones')"
              >See product</TheButton
            >
          </div>
        </div>
      </div>
    </div>

    <TheMan />
  </div>
</template>

<script setup>
import TheHero from '@/components/TheHero.vue'
import TheThumbnails from '@/components/TheThumbnails.vue'
import headphonesImage from '@/assets/shared/desktop/image-category-thumbnail-headphones.png'
import speakersImage from '@/assets/shared/desktop/image-category-thumbnail-speakers.png'
import earphonesImage from '@/assets/shared/desktop/image-category-thumbnail-earphones.png'
import TheButton from '@/components/TheButton.vue'
import TheMan from '@/components/TheMan.vue'

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
