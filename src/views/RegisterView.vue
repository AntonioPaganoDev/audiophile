<template>
  <div class="page-container min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white p-8 rounded-xl shadow w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6">Create Account</h1>

      <div v-if="success" class="bg-green-50 text-green-600 p-3 rounded mb-4 text-sm">
        Check your email to confirm your account!
      </div>

      <div v-if="error" class="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
        {{ error }}
      </div>

      <div class="space-y-4">
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
          @click="handleRegister"
          :disabled="loading || success"
          class="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50"
        >
          {{ loading ? 'Loading...' : 'Register' }}
        </button>
      </div>

      <p class="text-center text-sm text-gray-500 mt-6">
        Already have an account?
        <router-link to="/login" class="text-black font-medium hover:underline">
          Login
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
// const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref(null)
const loading = ref(false)
const success = ref(false)

async function handleRegister() {
  error.value = null
  loading.value = true
  try {
    await auth.register(email.value, password.value)
    success.value = true
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>
