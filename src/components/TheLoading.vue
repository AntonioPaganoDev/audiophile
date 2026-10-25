<template>
  <div class="flex flex-col items-center justify-center gap-2">
    <div
      :class="[
        'animate-spin rounded-full border-solid border-gray-300 border-t-blue-600',
        sizeClasses[size],
      ]"
    ></div>
    <p v-if="text" class="text-sm text-gray-500">{{ text }}</p>
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'md', // 'sm' | 'md' | 'lg'
  },
  text: {
    type: String,
    default: '',
  },
})

const sizeClasses = {
  sm: 'h-5 w-5 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-4',
}
</script>
