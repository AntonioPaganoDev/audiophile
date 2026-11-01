<template>
  <footer class="py-10 bg-ink text-white space-y-10">
    <div class="page-container space-y-10">
      <div class="w-full flex flex-col lg:flex-row justify-between lg:items-center gap-0 sm:gap-10">
        <div class="flex justify-center sm:justify-start">
          <img src="@/assets/shared/desktop/logo.svg" alt="Audiophile Logo" />
        </div>

        <div>
          <div
            class="flex flex-col sm:flex-row sm:space-x-10 space-y-4 lg:space-y-0 uppercase text-sm w-full mt-10 sm:mt-0 justify-center sm:justify-start text-center sm:text-start"
          >
            <router-link to="/" class="hover:text-primary">home</router-link>
            <router-link to="/headphones" class="hover:text-primary">headphones</router-link>
            <router-link to="/speakers" class="hover:text-primary">speakers</router-link>
            <router-link to="/earphones" class="hover:text-primary">earphones</router-link>
          </div>
        </div>
      </div>

      <div class="opacity-50 text-sm lg:w-1/2 text-center sm:text-start mx-auto sm:mx-0">
        Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music
        lovers and sound specialists who are devoted to helping you get the most out of personal
        audio. Come and visit our demo facility - we’re open 7 days a week.
      </div>

      <div class="flex flex-col sm:flex-row space-y-5 sm:space-y-0 justify-between items-center">
        <div class="opacity-50 text-sm text-center sm:text-start">
          Copyright {{ currentYear }}. All rights reserved.
        </div>

        <div class="flex space-x-4">
          <img src="@/assets/shared/desktop/icon-facebook.svg" alt="Facebook" />
          <img src="@/assets/shared/desktop/icon-twitter.svg" alt="Twitter" />
          <img src="@/assets/shared/desktop/icon-instagram.svg" alt="Instagram" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>
