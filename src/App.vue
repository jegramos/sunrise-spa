<template>
  <div id="app-wrapper" class="flex flex-col h-screen dark:theme-dark">
    <menu-bar></menu-bar>
    <!-- Start Main Content -->
    <div class="pt-24 bg-theme-base text-theme-base flex-grow">
      <router-view></router-view>
    </div>
    <!-- End Main Content-->
    <footer-component></footer-component>
  </div>
</template>

<script setup>
import MenuBar from './components/AppNavBar.vue'
import FooterComponent from './components/AppFooter.vue'
import { useInitTheme } from './composables/theme'
import { onMounted } from 'vue'

onMounted(() => {
  useInitTheme()
})
</script>
