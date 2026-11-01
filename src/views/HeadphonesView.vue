<template>
  <div class="my-20">
    <div
      class="text-3xl sm:text-[40px] font-bold uppercase leading-none text-center mb-24 bg-ink py-26"
    >
      <span class="text-white">headphones</span>
    </div>

    <div class="page-container">
      <div class="flex flex-col lg:flex-row justify-between w-full gap-x-30 gap-y-10 mb-20">
        <div class="w-full">
          <img
            src="@/assets/product-xx99-mark-two-headphones/mobile/image-category-page-preview.jpg"
            alt="XX99 Mark II Headphones"
            class="mx-auto rounded-lg sm:hidden"
          />

          <img
            src="@/assets/product-xx99-mark-two-headphones/tablet/image-category-page-preview.jpg"
            alt="XX99 Mark II Headphones"
            class="mx-auto rounded-lg hidden sm:block lg:hidden"
          />

          <img
            src="@/assets/product-xx99-mark-two-headphones/desktop/image-category-page-preview.jpg"
            alt="XX99 Mark II Headphones"
            class="mx-auto rounded-lg hidden lg:block"
          />
        </div>

        <div class="text-center lg:text-start w-full">
          <div class="flex flex-col justify-center h-full space-y-8">
            <div class="text-sm uppercase opacity-50 text-primary">new product</div>
            <div class="text-3xl sm:text-[40px] font-bold uppercase leading-none">
              xx99 mark ii headphones
            </div>

            <div class="opacity-50">
              The new xx99 Mark II headphones is the pinnacle of pristine audio. It redefines your
              premium headphone experience by reproducing the balanced depth and precision of
              studio- quality sound.
            </div>

            <div>
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
      </div>

      <div class="flex flex-col lg:flex-row justify-between w-full gap-x-30 gap-y-10 mb-20">
        <div class="text-center lg:text-start w-full order-2 lg:order-1">
          <div class="flex flex-col justify-center h-full space-y-8">
            <div class="text-3xl sm:text-[40px] font-bold uppercase leading-none">
              xx99 mark i headphones
            </div>

            <div class="opacity-50">
              As the gold standard for headphones, the classic xx99 Mark I offers detailed and
              accurate audio reproduction for audiophiles, mixing engineers, and music aficionados
              alike in studios and on the go.
            </div>

            <div>
              <TheButton
                variant="primary"
                class="w-fit"
                @click="redirect('/product/xx99-mark-i-headphones')"
              >
                See product
              </TheButton>
            </div>
          </div>
        </div>

        <div class="w-full order-1 lg:order-2">
          <img
            src="@/assets/product-xx99-mark-one-headphones/mobile/image-category-page-preview.jpg"
            alt="XX99 Mark I Headphones"
            class="mx-auto rounded-lg sm:hidden"
          />

          <img
            src="@/assets/product-xx99-mark-one-headphones/tablet/image-category-page-preview.jpg"
            alt="XX99 Mark I Headphones"
            class="mx-auto rounded-lg hidden sm:block lg:hidden"
          />

          <img
            src="@/assets/product-xx99-mark-one-headphones/desktop/image-category-page-preview.jpg"
            alt="XX99 Mark I Headphones"
            class="mx-auto rounded-lg hidden lg:block"
          />
        </div>
      </div>

      <div class="flex flex-col lg:flex-row justify-between w-full gap-x-30 gap-y-10 mb-40">
        <div class="w-full">
          <img
            src="@/assets/product-xx59-headphones/mobile/image-category-page-preview.jpg"
            class="mx-auto rounded-lg sm:hidden"
          />

          <img
            src="@/assets/product-xx59-headphones/tablet/image-category-page-preview.jpg"
            class="mx-auto rounded-lg hidden sm:block lg:hidden"
          />

          <img
            src="@/assets/product-xx59-headphones/desktop/image-category-page-preview.jpg"
            class="mx-auto rounded-lg hidden lg:block"
          />
        </div>

        <div class="text-center lg:text-start w-full">
          <div class="flex flex-col justify-center h-full space-y-8">
            <div class="text-3xl sm:text-[40px] font-bold uppercase leading-none">
              xx59 headphones
            </div>

            <div class="opacity-50">
              Enjoy your audio almost anywhere and customize it to your specific tastes with the
              xx59 headphones. The stylish yet durable versatile wireless headset is a brilliant
              companion at home or on the move.
            </div>

            <div>
              <TheButton
                variant="primary"
                class="w-fit"
                @click="redirect('/product/xx59-headphones')"
              >
                See product
              </TheButton>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row justify-between w-full gap-30 mb-40">
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
