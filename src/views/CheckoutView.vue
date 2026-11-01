<template>
  <div class="bg-gray-200">
    <div class="page-container">
      <div class="mt-20 py-10">
        <button
          type="button"
          class="hover:underline cursor-pointer opacity-50"
          @click="router.back()"
        >
          Go Back
        </button>
      </div>

      <form
        class="flex flex-col xl:flex-row justify-between w-full pb-10 gap-10"
        novalidate
        @submit.prevent="submit"
      >
        <div class="bg-white xl:w-8/12 p-10 rounded-lg space-y-14">
          <div class="text-3xl font-bold uppercase">checkout</div>

          <div>
            <div class="text-primary uppercase mb-4">billing details</div>
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-12 sm:col-span-6">
                <TheInputs
                  v-model="form.name"
                  label="Nome"
                  :error="errors.name"
                  @input="errors.name = ''"
                  placeholder="Antonio Pagano"
                  autocomplete="name"
                />
              </div>

              <div class="col-span-12 sm:col-span-6">
                <TheInputs
                  v-model="form.email"
                  type="email"
                  label="Email"
                  :error="errors.email"
                  @input="errors.email = ''"
                  placeholder="antonio.pagano@example.com"
                  autocomplete="email"
                />
              </div>

              <div class="col-span-12 sm:col-span-6">
                <TheInputs
                  v-model="form.phone"
                  type="tel"
                  label="Telefono"
                  :error="errors.phone"
                  @input="errors.phone = ''"
                  placeholder="+39 123 456 7890"
                />
              </div>
            </div>
          </div>

          <div>
            <div class="text-primary uppercase mb-4">shipping info</div>
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-12">
                <TheInputs
                  v-model="form.address"
                  label="Address"
                  :error="errors.address"
                  @input="errors.address = ''"
                  placeholder="Via Roma, 123"
                  autocomplete="street-address"
                />
              </div>

              <div class="col-span-12 sm:col-span-6">
                <TheInputs
                  v-model="form.zip"
                  label="ZIP Code"
                  :error="errors.zip"
                  @input="errors.zip = ''"
                  placeholder="12345"
                  autocomplete="postal-code"
                />
              </div>

              <div class="col-span-12 sm:col-span-6">
                <TheInputs
                  v-model="form.city"
                  label="City"
                  :error="errors.city"
                  @input="errors.city = ''"
                  placeholder="Rome"
                  autocomplete="address-level2"
                />
              </div>

              <div class="col-span-12 sm:col-span-6">
                <TheInputs
                  v-model="form.country"
                  label="Country"
                  :error="errors.country"
                  @input="errors.country = ''"
                  placeholder="Italy"
                  autocomplete="country-name"
                />
              </div>
            </div>
          </div>

          <div>
            <div class="text-primary uppercase mb-4">payment details</div>
            <div class="grid grid-cols-12 gap-4">
              <div class="col-span-12 sm:col-span-6">
                <div class="text-sm font-bold mb-2">Payment Method</div>
              </div>

              <div class="col-span-12 sm:col-span-6">
                <TheInputs
                  v-model="form.paymentMethod"
                  type="radio"
                  :options="[
                    { value: 'emoney', label: 'e-Money' },
                    { value: 'cod', label: 'Cash on Delivery' },
                  ]"
                />
              </div>

              <div class="col-span-12 sm:col-span-6 mt-2" v-if="form.paymentMethod === 'emoney'">
                <TheInputs
                  v-model="form.eMoneyNumber"
                  label="e-Money Number"
                  :error="errors.eMoneyNumber"
                  @input="errors.eMoneyNumber = ''"
                  placeholder="0000 0000 0000"
                  inputmode="numeric"
                />
              </div>

              <div class="col-span-12 sm:col-span-6 mt-2" v-if="form.paymentMethod === 'emoney'">
                <TheInputs
                  v-model="form.eMoneyPIN"
                  type="password"
                  label="e-Money PIN"
                  :error="errors.eMoneyPIN"
                  @input="errors.eMoneyPIN = ''"
                  placeholder="123"
                  inputmode="numeric"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white xl:w-4/12 p-10 rounded-lg h-fit">
          <div class="text-lg font-bold uppercase">summary</div>
          <div class="space-y-4 mt-8">
            <div
              v-for="item in cart.items"
              :key="item.slug"
              class="flex justify-between items-center"
            >
              <div class="flex items-center gap-4">
                <img
                  :src="products[item.slug]?.image"
                  :alt="item.name"
                  class="w-16 h-16 object-cover"
                />
                <div>
                  <div class="font-bold">{{ item.short_name }}</div>
                  <div class="text-sm opacity-50">
                    ${{ (item.price * item.quantity).toFixed(2) }}
                  </div>
                </div>
              </div>

              <div class="text-sm opacity-50">x{{ item.quantity }}</div>
            </div>
          </div>
          <div class="flex justify-between items-center mt-8">
            <div class="text-sm opacity-50">Total</div>
            <div class="font-bold">${{ cart.totalPrice.toFixed(2) }}</div>
          </div>
          <TheButton
            variant="primary"
            class="w-full uppercase mt-4"
            type="submit"
            :disabled="loading || !cart.items.length"
          >
            {{ loading ? 'Processing...' : 'continue & pay' }}
          </TheButton>
        </div>
      </form>

      <!-- Overlay -->
      <div v-if="isOrderComplete" class="fixed inset-0 bg-black/50 z-40" @click="goHome" />

      <!-- Modale -->
      <div
        v-if="isOrderComplete"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-title"
        class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg bg-white rounded-lg p-10 space-y-6 shadow-lg"
      >
        <div
          class="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-3xl"
        >
          ✓
        </div>

        <h2 id="order-title" class="text-3xl font-bold uppercase">Thank you<br />for your order</h2>
        <p class="opacity-50">You will receive an email confirmation shortly.</p>

        <div class="bg-gray-200 rounded-lg p-6 space-y-4 max-h-64 overflow-y-auto">
          <div
            v-for="item in order.items"
            :key="item.slug"
            class="flex justify-between items-center"
          >
            <div class="flex items-center gap-4">
              <img
                :src="products[item.slug]?.image"
                :alt="item.name"
                class="w-12 h-12 object-cover"
              />
              <div>
                <div class="font-bold">{{ item.short_name }}</div>
                <div class="text-sm opacity-50">${{ (item.price * item.quantity).toFixed(2) }}</div>
              </div>
            </div>
            <div class="text-sm opacity-50">x{{ item.quantity }}</div>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <span class="uppercase opacity-50">Grand total</span>
          <span class="font-bold text-lg">${{ order.total.toFixed(2) }}</span>
        </div>

        <TheButton variant="primary" class="w-full uppercase" @click="goHome">
          back to home
        </TheButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart.js'
import { products } from '@/data/products'
import TheInputs from '@/components/TheInputs.vue'
import TheButton from '@/components/TheButton.vue'

const router = useRouter()
const cart = useCartStore()
const loading = ref(false)
const isOrderComplete = ref(false)
const order = ref(null)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
  zip: '',
  city: '',
  country: '',
  paymentMethod: 'emoney',
  eMoneyNumber: '',
  eMoneyPIN: '',
})
const errors = reactive({
  name: '',
  email: '',
  phone: '',
  form: '',
  address: '',
  zip: '',
  city: '',
  country: '',
  eMoneyNumber: '',
  eMoneyPIN: '',
})

watch(
  () => form.paymentMethod,
  (method) => {
    if (method !== 'emoney') {
      form.eMoneyNumber = ''
      form.eMoneyPIN = ''
    }
  },
)

const required = (msg) => (v) => (v.trim() ? '' : msg)

const rules = {
  name: required('Add your name'),
  email: (v) => (/^\S+@\S+\.\S+$/.test(v) ? '' : 'Enter a valid email address'),
  phone: (v) => (/^\+?[\d\s-]{6,15}$/.test(v.trim()) ? '' : 'Enter a valid phone number'),
  address: required('Enter your address'),
  zip: required('Enter your ZIP code'),
  city: required('Enter your city'),
  country: required('Enter your country'),
  eMoneyNumber: (v) => (/^\d{12}$/.test(v.trim()) ? '' : 'Enter a 12-digit e-Money number'),
  eMoneyPIN: (v) => (/^\d{3}$/.test(v.trim()) ? '' : 'Enter a 3-digit PIN'),
}

function validate() {
  const fields = ['name', 'email', 'phone', 'address', 'zip', 'city', 'country']

  if (form.paymentMethod === 'emoney') {
    fields.push('eMoneyNumber', 'eMoneyPIN')
  } else {
    errors.eMoneyNumber = ''
    errors.eMoneyPIN = ''
  }

  fields.forEach((f) => (errors[f] = rules[f](form[f])))
  return fields.every((f) => !errors[f])
}

async function submit() {
  errors.form = ''
  if (!validate()) return

  // qui la chiamata a Supabase / Edge Function

  // 1. snapshot dell'ordine (prima di svuotare il carrello)
  order.value = {
    items: cart.items.map((item) => ({ ...item })),
    total: cart.totalPrice,
  }

  cart.clearCart()
  isOrderComplete.value = true
}

function goHome() {
  isOrderComplete.value = false
  router.push('/')
}

// blocca lo scroll come nella navbar
watch(isOrderComplete, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>
