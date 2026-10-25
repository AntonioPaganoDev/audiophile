<template>
  <component :is="layout">
    <router-view :key="route.fullPath" />
  </component>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from '@/layout/DefaultLayout.vue'

const auth = useAuthStore()

const route = useRoute()
const layout = computed(() => route.meta.layout || DefaultLayout)

onMounted(() => {
  auth.init()
})
</script>
