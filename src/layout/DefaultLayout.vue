<template>
  <div class="min-h-screen flex flex-col">
    <NavBar />
    <main class="flex-1">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import NavBar from '@/layout/TheNavbar.vue'
import TheFooter from '@/layout/TheFooter.vue'
</script>
