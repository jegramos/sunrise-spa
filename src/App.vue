<template>
  <div id="app-wrapper" class="flex h-screen flex-col font-content">
    <nav-bar v-if="!route.meta.hideNavBar"></nav-bar>
    <!-- Start Main Content -->
    <div
      :class="`flex-grow bg-theme-base px-2 pb-10 text-theme-base sm:px-8 lg:px-16 ${
        route.meta.hideNavBar ? 'pt-8' : 'pt-24'
      }`"
    >
      <router-view></router-view>
    </div>
    <!-- End Main Content-->
    <footer-component></footer-component>
  </div>
</template>

<script setup>
import NavBar from './components/AppNavBar.vue'
import FooterComponent from './components/AppFooter.vue'
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { useApplyTheme } from '@/composables/theme'
import { useRoute } from 'vue-router'

const route = useRoute()

const theme = useThemeStore()
onMounted(() => {
  useApplyTheme(theme.selectedTheme, theme.availableThemes)
})
</script>
