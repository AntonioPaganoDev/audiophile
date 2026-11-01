<template>
  <nav class="h-20 bg-ink text-white z-10 fixed left-0 right-0 top-0">
    <div class="mx-auto flex h-full page-container items-center justify-between">
      <div class="flex items-center gap-6">
        <!-- Hamburger (solo sotto lg) -->
        <button
          type="button"
          class="lg:hidden cursor-pointer"
          :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-menu"
          @click="toggleMenu"
        >
          <svg
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          >
            <path v-if="!isMenuOpen" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <img src="@/assets/shared/desktop/logo.svg" alt="Audiophile Logo" />
      </div>

      <!-- Link desktop -->
      <div class="hidden lg:flex space-x-10 uppercase text-sm justify-center w-full">
        <router-link
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :class="isActive(link.to) ? 'text-primary' : 'text-white'"
          class="hover:text-primary"
        >
          {{ link.label }}
        </router-link>
      </div>

      <div class="flex items-center space-x-6">
        <!-- Login/logout: solo desktop (su mobile stanno nel menu) -->
        <div class="hidden lg:flex items-center">
          <div v-if="auth.loading" class="w-16 h-4 bg-gray-700 rounded animate-pulse" />

          <button
            v-else-if="auth.isAuthenticated"
            @click="handleLogout"
            class="text-sm hover:text-primary uppercase cursor-pointer"
          >
            logout
          </button>

          <router-link
            v-else
            :to="{ path: '/login', query: { redirect: route.fullPath } }"
            class="text-sm uppercase hover:text-primary"
          >
            login
          </router-link>
        </div>

        <!-- Carrello -->
        <div @click="openCart()" class="relative">
          <span
            v-if="cart.items.length > 0"
            class="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs cursor-pointer"
            >{{ cart.items.length }}</span
          >
          <div class="w-6">
            <img src="@/assets/shared/desktop/icon-cart.svg" alt="Cart" class="cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  </nav>

  <!-- Overlay menu: parte sotto la navbar, così l'hamburger resta cliccabile -->
  <div
    v-if="isMenuOpen"
    class="fixed inset-x-0 bottom-0 top-20 bg-black/50 z-40 lg:hidden"
    @click="isMenuOpen = false"
  />

  <!-- Menu mobile -->
  <div
    v-if="isMenuOpen"
    id="mobile-menu"
    class="fixed inset-x-0 top-20 z-50 bg-white text-black rounded-b-lg shadow-lg p-6 lg:hidden"
    @click="isMenuOpen = false"
  >
    <ul class="flex flex-col gap-6 uppercase font-bold text-sm">
      <li v-for="link in links" :key="link.to">
        <router-link
          :to="link.to"
          :class="isActive(link.to) ? 'text-primary' : 'text-black'"
          class="block hover:text-primary"
        >
          {{ link.label }}
        </router-link>
      </li>
    </ul>

    <div class="mt-6 pt-6 border-t border-gray-200 uppercase text-sm font-bold">
      <div v-if="auth.loading" class="w-16 h-4 bg-gray-200 rounded animate-pulse" />

      <button
        v-else-if="auth.isAuthenticated"
        @click="handleLogout"
        class="hover:text-primary uppercase cursor-pointer"
      >
        logout
      </button>

      <router-link
        v-else
        :to="{ path: '/login', query: { redirect: route.fullPath } }"
        class="hover:text-primary"
      >
        login
      </router-link>
    </div>
  </div>

  <!-- Overlay carrello -->
  <div v-if="isCartOpen" @click="isCartOpen = false" class="fixed inset-0 bg-black/50 z-40"></div>

  <!-- Pannello carrello -->
  <div v-if="isCartOpen" class="pointer-events-none fixed inset-x-0 top-30 z-50">
    <div class="mx-auto flex page-container justify-end">
      <div class="pointer-events-auto w-full sm:w-96 bg-white text-black p-4 shadow-lg rounded-lg">
        <div v-if="cart.items.length === 0">The cart is empty</div>

        <div v-else class="space-y-8">
          <div class="flex items-center justify-between">
            <div class="whitespace-nowrap font-bold uppercase text-lg">
              cart ({{ cart.items.length }})
            </div>
            <div
              @click="cart.clearCart()"
              class="opacity-50 hover:underline cursor-pointer whitespace-nowrap"
            >
              Remove all
            </div>
          </div>

          <ul>
            <li
              v-for="item in cart.items"
              :key="item.slug"
              class="flex justify-between items-center mb-4"
            >
              <div class="flex items-center gap-2">
                <img
                  :src="products[item.slug]?.image"
                  :alt="item.name"
                  class="w-12 h-12 object-cover"
                />

                <div>
                  <div class="font-bold">{{ item.short_name }}</div>
                  <div class="text-sm opacity-50">
                    ${{ (item.price * item.quantity).toFixed(2) }}
                  </div>
                </div>
              </div>

              <div class="flex items-center space-x-2 bg-gray-200 px-2 py-1 rounded w-28">
                <button
                  @click="cart.decreaseQuantity(item.slug)"
                  class="px-2 py-1 bg-gray-200 w-10 cursor-pointer"
                >
                  -
                </button>

                <div class="w-8 text-center">{{ item.quantity }}</div>

                <button
                  @click="cart.increaseQuantity(item.slug)"
                  class="px-2 py-1 bg-gray-200 w-10 cursor-pointer"
                >
                  +
                </button>
              </div>
            </li>
          </ul>

          <div class="flex justify-between items-center mt-4">
            <span class="font-bold uppercase opacity-50">total</span>
            <span class="font-bold">${{ cart.totalPrice.toFixed(2) }}</span>
          </div>

          <TheButton variant="primary" class="w-full uppercase" @click="goToCheckout()">
            checkout
          </TheButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart.js'
import { products } from '@/data/products'
import TheButton from '@/components/TheButton.vue'

const auth = useAuthStore()
const route = useRoute()
const cart = useCartStore()
const router = useRouter()

const isCartOpen = ref(false)
const isMenuOpen = ref(false)

// link definiti una volta sola e usati in desktop e mobile
const links = [
  { to: '/', label: 'home' },
  { to: '/headphones', label: 'headphones' },
  { to: '/speakers', label: 'speakers' },
  { to: '/earphones', label: 'earphones' },
]

const isActive = (to) => (to === '/' ? route.path === '/' : route.path.startsWith(to))

async function handleLogout() {
  isMenuOpen.value = false
  await auth.logout()
  router.push('/login')
}

const toggleMenu = () => {
  isCartOpen.value = false
  isMenuOpen.value = !isMenuOpen.value
}

const openCart = () => {
  if (router.currentRoute.value.path === '/checkout') return
  isMenuOpen.value = false
  isCartOpen.value = !isCartOpen.value
}

const goToCheckout = () => {
  isCartOpen.value = false
  router.push('/checkout')
}

// blocca lo scroll se è aperto il menu OPPURE il carrello
watch([isCartOpen, isMenuOpen], ([cartOpen, menuOpen]) => {
  document.body.style.overflow = cartOpen || menuOpen ? 'hidden' : ''
})

// chiude il menu quando cambia pagina
watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false
  },
)

// se ridimensioni oltre lg con il menu aperto, lo chiude (evita lo scroll bloccato)
const closeOnDesktop = () => {
  if (window.innerWidth >= 1024) isMenuOpen.value = false
}

onMounted(() => window.addEventListener('resize', closeOnDesktop))

onUnmounted(() => {
  window.removeEventListener('resize', closeOnDesktop)
  document.body.style.overflow = ''
})
</script>
