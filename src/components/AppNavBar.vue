<template>
  <nav class="top-0 z-100 fixed w-full bg-theme-section py-4 px-10 flex items-center justify-between">
    <!-- Start Logo & Title -->
    <div class="flex items-center">
      <img src="../assets/images/logo-dark.svg" height="25" width="25" alt="Logo" class="mr-2 hidden dark:block" />
      <img src="../assets/images/logo-light.svg" height="25" width="25" alt="Logo" class="mr-2 block dark:hidden" />
      <h5 class="font-bold leading-tight text-theme-primary text-xl">
        Web<span class="font-light text-theme-base">folio</span>
      </h5>
    </div>
    <!-- End Logo & Title -->
    <!-- Start DarkModeSwitch -->
    <app-dark-mode-switch></app-dark-mode-switch>
    <!-- End DarkModeSwitch -->
  </nav>
</template>

<script setup>
import AppDarkModeSwitch from '@/components/AppDarkModeSwitch.vue'
</script>
