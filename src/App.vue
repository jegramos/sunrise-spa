<template>
  <div id="app-wrapper" class="flex flex-col h-screen font-content">
    <menu-bar></menu-bar>
    <!-- Start Main Content -->
    <div class="pt-24 bg-theme-base text-theme-base flex-grow pb-10">
      <router-view></router-view>
    </div>
    <!-- End Main Content-->
    <footer-component></footer-component>
  </div>
</template>

<script setup>
import MenuBar from './components/AppNavBar.vue'
import FooterComponent from './components/AppFooter.vue'
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { useApplyTheme } from '@/composables/theme'

const theme = useThemeStore()
onMounted(() => {
  useApplyTheme(theme.selectedTheme, theme.availableThemes)
})
</script>
