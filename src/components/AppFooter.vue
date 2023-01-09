<template>
  <footer
    class="bg-theme-section p-3 text-theme-base py-8 px-2 items-center flex flex-col text-theme-muted text-xs uppercase"
  >
    <span class="font-light"
      >Made by
      <span class="font-bold ml-0.5">Jego Carlo Ramos</span>
    </span>
    <div class="socials flex items-center justify-center mt-2">
      <button
        v-for="social in socials"
        :key="social.name"
        class="mx-2.5 lg:mx-1.5 nav-base-icon-button rounded-3xl"
        @click="handleOpenSocial(social.url)"
      >
        <font-awesome-icon :icon="social.icon" class="w-4 h-4"></font-awesome-icon>
      </button>
    </div>
    <div class="separator-h w-[50%] my-4"></div>
    <div>
      <span class="tracking-widest font-light"
        >&copy; {{ new Date().getFullYear() }} | Campfire | All rights reserved</span
      >
    </div>
  </footer>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

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
