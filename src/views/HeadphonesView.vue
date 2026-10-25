<template>
  <div class="mb-40 mt-20">
    <div class="text-[40px] font-bold uppercase leading-none text-center mb-24 bg-black py-26">
      <span class="text-white">headphones</span>
    </div>

    <div class="page-container flex justify-between w-full gap-30 mb-20">
      <div class="w-full">
        <img
          src="@/assets/product-xx99-mark-two-headphones/desktop/image-product.jpg"
          alt="XX99 Mark II Headphones"
          class="mx-auto rounded-lg"
        />
      </div>

      <div class="w-full">
        <div class="flex flex-col justify-center h-full space-y-8">
          <div class="text-sm uppercase opacity-50 text-primary">new product</div>
          <div class="text-[40px] font-bold uppercase leading-none w-1/2">
            xx99 mark ii headphones
          </div>

          <div class="opacity-50">
            The new xx99 Mark II headphones is the pinnacle of pristine audio. It redefines your
            premium headphone experience by reproducing the balanced depth and precision of studio-
            quality sound.
          </div>

          <TheButton
            variant="primary"
            class="w-fit"
            @click="redirect('/product/xx99-mark-ii-headphones')"
          >
            See product
          </TheButton>
        </div>
      </div>
    </div>

    <div class="page-container flex justify-between w-full gap-30 mb-20">
      <div class="w-full">
        <div class="flex flex-col justify-center h-full space-y-8">
          <div class="text-[40px] font-bold uppercase leading-none w-1/2">
            xx99 mark i headphones
          </div>

          <div class="opacity-50">
            As the gold standard for headphones, the classic xx99 Mark I offers detailed and
            accurate audio reproduction for audiophiles, mixing engineers, and music aficionados
            alike in studios and on the go.
          </div>

          <TheButton
            variant="primary"
            class="w-fit"
            @click="redirect('/product/xx99-mark-i-headphones')"
          >
            See product
          </TheButton>
        </div>
      </div>

      <div class="w-full">
        <img
          src="@/assets/product-xx99-mark-one-headphones/desktop/image-product.jpg"
          alt="XX99 Mark I Headphones"
          class="mx-auto rounded-lg"
        />
      </div>
    </div>

    <div class="page-container flex justify-between w-full gap-30 mb-40">
      <div class="w-full">
        <img
          src="@/assets/product-xx59-headphones/desktop/image-product.jpg"
          alt="XX59 Headphones"
          class="mx-auto rounded-lg"
        />
      </div>

      <div class="w-full">
        <div class="flex flex-col justify-center h-full space-y-8">
          <div class="text-[40px] font-bold uppercase leading-none w-1/2">xx59 headphones</div>

          <div class="opacity-50">
            Enjoy your audio almost anywhere and customize it to your specific tastes with the xx59
            headphones. The stylish yet durable versatile wireless headset is a brilliant companion
            at home or on the move.
          </div>

          <TheButton variant="primary" class="w-fit" @click="redirect('/product/xx59-headphones')">
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
import speakersImage from '@/assets/shared/desktop/image-category-thumbnail-speakers.png'
import earphonesImage from '@/assets/shared/desktop/image-category-thumbnail-earphones.png'
import TheButton from '@/components/TheButton.vue'

const products = [
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
