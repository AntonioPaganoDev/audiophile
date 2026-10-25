<template>
  <div class="page-container min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white p-8 rounded-xl shadow w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6">Login</h1>

      <div v-if="error" class="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
        {{ error }}
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="you@example.com"
            class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50"
        >
          {{ loading ? 'Loading...' : 'Login' }}
        </button>
      </form>

      <p class="text-center text-sm text-gray-500 mt-6">
        Don't have an account?
        <router-link to="/register" class="text-black font-medium hover:underline">
          Register
        </router-link>
      </p>

      <button
        @click="continueAsGuest"
        class="w-full text-sm opacity-50 hover:text-black underline mt-2"
      >
        Continue as guest
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const error = ref(null)
const loading = ref(false)

const redirectPath = computed(() => route.query.redirect || '/')

async function handleLogin() {
  error.value = null
  loading.value = true
  try {
    await auth.login(email.value, password.value)
    router.push(redirectPath.value)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

function continueAsGuest() {
  router.push(redirectPath.value === '/' ? '/' : '/')
  // nota: attualmente non hai ancora rotte protette attive (checkout è commentato),
  // quindi "guest" torna sempre alla home o al redirect stesso — vedi nota sotto
}
</script>
