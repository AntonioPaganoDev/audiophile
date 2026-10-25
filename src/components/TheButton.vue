<template>
  <button
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center gap-2 font-semibold uppercase transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer',
      sizeClasses[size] || 'py-2',
      {
        'bg-primary text-white hover:bg-primary-light': variant === 'primary',

        'bg-black text-white hover:bg-ink/70': variant === 'secondary',

        'bg-white text-black border border-black hover:bg-black hover:text-white':
          variant === 'outline',

        'bg-transparent text-gray-500 hover:text-primary p-0 normal-case font-medium tracking-normal':
          variant === 'link',
      },
    ]"
    @click="$emit('click', $event)"
  >
    <slot />

    <svg v-if="variant === 'link'" class="w-4 h-4" fill="none" stroke="#D87D4A" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'outline', 'link'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['click'])

const sizeClasses = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}
</script>
<!--
  UTILIZZO:

  <TheButton variant="primary">See product</TheButton>
  <TheButton variant="outline">See product</TheButton>
  <TheButton variant="link">Shop</TheButton>

  <TheButton variant="primary" size="lg" @click="handleClick">
    See product
  </TheButton>
-->
