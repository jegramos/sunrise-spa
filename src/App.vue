<template>
  <div id="app-wrapper" class="flex flex-col h-screen font-content">
    <nav-bar v-if="!route.meta.hideNavBar"></nav-bar>
    <!-- Start Main Content -->
    <div :class="`bg-theme-base text-theme-base flex-grow pb-10 px-16 ${route.meta.hideNavBar ? 'pt-8' : 'pt-24'}`">
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
