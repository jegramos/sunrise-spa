<template>
  <footer
    class="flex flex-col items-center bg-theme-section p-3 py-8 px-2 text-xs uppercase text-theme-base text-theme-muted"
  >
    <span class="font-light"
      >Made by
      <span class="ml-0.5 font-bold">Jego Carlo Ramos</span>
    </span>
    <div class="mt-2 flex items-center justify-center">
      <cf-button
        v-for="social in socials"
        :key="social.name"
        icon
        class="mx-2.5 lg:mx-1.5"
        :height="5"
        :width="5"
        @click="handleOpenSocial(social.url)"
      >
        <template #icon>
          <font-awesome-icon :icon="social.icon" class="h-4 w-4"></font-awesome-icon>
        </template>
      </cf-button>
    </div>
    <div class="separator-h my-4 w-[50%]"></div>
    <div>
      <span class="font-light tracking-widest"
        >&copy; {{ new Date().getFullYear() }} | Campfire | All rights reserved</span
      >
    </div>
  </footer>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import CfButton from '@/components/campfire/buttons/CfButton.vue'

const socials = [
  { name: 'Linkedin', icon: 'fa-brands fa-linkedin', url: import.meta.env.VITE_LINKEDIN_PROFILE },
  { name: 'Github', icon: 'fa-brands fa-github', url: `https://github.com/${import.meta.env.VITE_GITHUB_USER}` },
  { name: 'Whatsapp', icon: 'fa-brands fa-whatsapp', url: import.meta.env.VITE_WHATSAPP },
  { name: 'Gmail', icon: 'fa-brands fa-google', url: import.meta.env.VITE_GMAIL_URL },
  { name: 'Viber', icon: 'fa-brands fa-viber', url: import.meta.env.VITE_VIBER },
]

const handleOpenSocial = (url) => {
  window.open(url, '_blank')
}
</script>
