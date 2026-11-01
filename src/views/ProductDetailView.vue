<template>
  <div class="my-20 page-container">
    <div class="py-10">
      <button
        type="button"
        @click="router.back()"
        class="hover:underline cursor-pointer opacity-50"
      >
        Go Back
      </button>
    </div>

    <div>
      <div class="flex flex-col md:flex-row justify-between w-full gap-x-30 gap-y-10 mb-20">
        <div class="w-full">
          <img
            :src="products[route.params.id].image"
            :alt="products[route.params.id].name"
            class="rounded-lg w-96 mx-auto md:mx-0"
          />
        </div>

        <div class="w-full">
          <div class="flex flex-col justify-center h-full space-y-8">
            <div
              v-if="products[route.params.id].isNew"
              class="text-sm uppercase opacity-50 text-primary"
            >
              new product
            </div>
            <div class="text-3xl sm:text-[40px] font-bold uppercase leading-none">
              {{ products[route.params.id].name }}
            </div>

            <div class="opacity-50">{{ products[route.params.id].description }}aa</div>

            <div>
              <span class="text-lg font-bold"
                >$ {{ products[route.params.id].price.toLocaleString() }}</span
              >
            </div>

            <div class="flex items-center gap-4">
              <div class="flex items-center space-x-2 bg-gray-200 px-2 py-1 rounded w-28">
                <button @click="decreaseQuantity" class="px-2 py-1 bg-gray-200 w-10 cursor-pointer">
                  -
                </button>
                <div class="w-8 text-center">{{ quantity }}</div>
                <button @click="increaseQuantity" class="px-2 py-1 bg-gray-200 w-10 cursor-pointer">
                  +
                </button>
              </div>

              <TheButton variant="primary" class="w-fit uppercase" @click="addToCart">
                add to cart
              </TheButton>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row justify-between w-full gap-x-30 gap-y-10 mb-40">
        <div class="w-full">
          <div class="text-3xl font-bold uppercase mb-8">features</div>
          <div class="opacity-50">
            {{ products[route.params.id].features }}
          </div>
        </div>

        <div class="w-full">
          <div class="text-3xl font-bold uppercase mb-8">in the box</div>
          <div class="opacity-50">
            <ul>
              <li
                v-for="item in products[route.params.id].includes"
                :key="item.item"
                class="flex items-center gap-8 mb-2"
              >
                <span class="font-semibold text-primary"> {{ item.quantity }} x </span>
                <span>
                  {{ item.item }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row justify-between mb-40 gap-x-6">
      <div class="flex flex-col justify-between">
        <div v-for="value in products[route.params.id].gallery.slice(0, 2)" :key="value">
          <img :src="value" class="rounded-lg w-full mb-6 md:mb-0" />
        </div>
      </div>

      <div>
        <img :src="products[route.params.id].gallery[2]" class="rounded-lg w-full" />
      </div>
    </div>

    <div class="mb-60">
      <div class="text-3xl font-bold text-center mb-8 uppercase">you may also like</div>
      <div class="flex flex-col md:flex-row justify-between w-full gap-10">
        <div
          v-for="product in randomProductsBesidesCurrent()"
          :key="product.id"
          class="flex flex-col items-center gap-6 w-full"
        >
          <img :src="product.image" class="rounded-lg w-full h-60 lg:h-full object-cover" />
          <div class="text-2xl font-bold uppercase md:h-24 2xl:h-auto text-center">
            {{ product.name }}
          </div>
          <TheButton variant="primary" @click="redirect(product.key)">see product </TheButton>
        </div>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row justify-between w-full gap-x-10 gap-y-30 mb-40">
      <TheThumbnails
        v-for="product in products_category"
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
import earphonesImage from '@/assets/shared/desktop/image-category-thumbnail-earphones.png'
import TheButton from '@/components/TheButton.vue'
import { useRouter, useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart.js'
import { ref } from 'vue'
import { products } from '@/data/products'

const router = useRouter()
const route = useRoute()

const cart = useCartStore()

const quantity = ref(1)

const products_category = [
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

const randomProductsBesidesCurrent = () => {
  const currentProductId = route.params.id
  const productIds = Object.keys(products).filter((id) => id !== currentProductId)
  const randomProducts = []

  while (randomProducts.length < 3 && productIds.length > 0) {
    const randomIndex = Math.floor(Math.random() * productIds.length)
    const randomProductId = productIds[randomIndex]
    randomProducts.push({ key: randomProductId, ...products[randomProductId] })
    productIds.splice(randomIndex, 1)
  }

  return randomProducts
}

const addToCart = () => {
  cart.addItem(products[route.params.id], quantity.value, route.params.id)
}

const decreaseQuantity = () => {
  if (quantity.value > 1) quantity.value--
}

const increaseQuantity = () => {
  quantity.value++
}

const redirect = (to) => {
  if (to) router.push(`/product/${to}`)
}
</script>
