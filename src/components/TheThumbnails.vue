<template>
  <div
    class="bg-gray-100 w-87.5 h-52 rounded-lg flex flex-col items-center justify-center relative"
  >
    <div class="absolute -top-14">
      <img :src="image" :alt="alt" class="w-42" />
    </div>
    <div class="text-center mt-16">
      <p class="text-lg font-bold uppercase">{{ alt }}</p>
      <div class="flex items-center justify-center mt-2 cursor-pointer">
        <TheButton variant="link" size="sm" @click="redirect(to)"> Shop </TheButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import TheButton from './TheButton.vue'
defineProps({
  image: {
    type: String,
  },
  alt: {
    type: String,
  },
  to: {
    type: String,
  },
})

const redirect = (to) => {
  if (to) {
    window.location.href = to
  }
}
</script>
