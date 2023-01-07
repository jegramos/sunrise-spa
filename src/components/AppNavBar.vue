<template>
  <nav id="app-main-nav" class="px-4 py-3 lg:px-12 fixed w-full z-20 top-0 left-0 bg-theme-section">
    <div class="flex flex-wrap items-center justify-between">
      <!-- Start Logo and title -->
      <div
        class="flex items-center lg:w-[25%] hover:cursor-pointer hover:scale-105 transition-transform duration-200 ease-in"
      >
        <div class="rounded-3xl p-0.5 ring-2 ring-theme-primary mb-0.5 mr-2">
          <fire-icon class="text-theme-primary w-5 h-5" />
        </div>
        <h5 class="font-logo tracking-wide text-theme-base text-2xl font-extrabold">
          Camp<span class="font-extrabold text-theme-primary underline decoration-2 underline-offset-4">fire</span>
        </h5>
      </div>
      <!-- End logo and title -->
      <!-- Start Utils section -->
      <div class="flex lg:order-2 lg:w-[25%] items-center">
        <!-- Start Switcher and icons -->
        <div class="hidden lg:flex lg:items-center lg:justify-end w-full">
          <app-theme-switcher class="mr-4" />
          <div class="flex">
            <!-- Start Github link icon -->
            <app-tooltip>
              <template #tooltip-target>
                <button
                  class="rounded-3xl text-theme-base w-6 h-6 hover:scale-125 transition-transform duration-150 ease-in focus-visible:outline-none focus-visible:ring-theme-primary focus-visible:ring-1"
                  @click="handleOpenGithubPages"
                >
                  <font-awesome-icon icon="fa-brands fa-github-alt" />
                </button>
              </template>
              <template #tooltip-icon>
                <arrow-top-right-on-square-icon class="h-3 w-3 mr-1" />
              </template>
              <template #tooltip-text>Visit Github</template>
            </app-tooltip>
            <!-- End Github link icon -->
            <!-- Start FB link icon -->
            <app-tooltip>
              <template #tooltip-target>
                <button
                  class="rounded-3xl text-theme-base ml-1 w-6 h-6 hover:scale-125 transition-transform duration-150 ease-in focus-visible:outline-none focus-visible:ring-theme-primary focus-visible:ring-1"
                  @click="handleOpenFacebookPage"
                >
                  <font-awesome-icon icon="fa-brands fa-facebook" />
                </button>
              </template>
              <template #tooltip-icon>
                <arrow-top-right-on-square-icon class="h-3 w-3 mr-1" />
              </template>
              <template #tooltip-text>Visit Facebook</template>
            </app-tooltip>
            <!-- End FB link icon -->
          </div>
        </div>
        <!-- End Switcher and icons -->
        <!-- Start mobile hamburger -->
        <div
          id="app-navbar-hamburger-button"
          class="flex flex-col items-end p-0.5 w-6 lg:hidden"
          @click="toggleHamburgerContent"
        >
          <span class="sr-only">Open navigation menu</span>
          <div class="bg-theme-neutral h-0.5 w-full mb-1 rounded-lg"></div>
          <div class="bg-theme-neutral h-0.5 w-[75%] mb-1 rounded-lg"></div>
          <div class="bg-theme-neutral h-0.5 w-full rounded-lg"></div>
        </div>
        <!-- End mobile hamburger -->
      </div>
      <!-- End Utils section -->
      <!-- Start Nav links -->
      <div
        id="app-navbar-hamburger-content"
        class="items-center bg-theme-section justify-center w-full lg:bg-transparent lg:mt-0 lg:flex lg:w-auto lg:order-1 lg:static hover:cursor-pointer transition-all duration-200 ease-in top-[100%] z-50 absolute"
      >
        <ul
          class="flex mt-2 flex-col rounded-lg lg:bg-theme-section lg:flex-row lg:space-x-8 lg:mt-0 text-sm lg:font-medium"
        >
          <li v-for="link in navLinks" :key="link.name">
            <router-link
              :to="{ name: link.name }"
              active-class="bg-theme-primary mx-1 font-bold text-theme-inverted lg:bg-theme-section lg:mx-0 lg:font-normal lg:underline lg:decoration-2 lg:underline-offset-8 lg:decoration-theme-primary"
              class="text-left block py-2 pl-6 pr-4 text-theme-base rounded mb-2 lg:b-0 lg:rounded-xl lg:text-theme-base lg:hover:bg-theme-section-hover lg:hover:scale-105 transition-none hover:transition-all duration-200 ease-in lg:py-1 lg:px-2 focus-visible:outline-none focus-visible:ring-theme-primary focus-visible:ring-1 focus-visible:no-underline"
              @click="toggleHamburgerContent"
            >
              <font-awesome-icon :icon="link.icon" class="w-3 h-3 mr-2 lg:hidden"></font-awesome-icon>
              {{ link.label }}
            </router-link>
          </li>
        </ul>
      </div>
      <!-- End Nav links -->
    </div>
  </nav>
</template>

<script setup>
import AppThemeSwitcher from '@/components/AppThemeSwitcher.vue'
import AppTooltip from '@/components/AppTooltip.vue'
import { FireIcon } from '@heroicons/vue/20/solid'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/20/solid'
import { ref } from 'vue'

const handleOpenGithubPages = () => {
  const githubUser = import.meta.env.VITE_GITHUB_USER
  window.open(`https://github.com/${githubUser}/sunrise-spa#readme`, '_spa')
  window.open(`https://github.com/${githubUser}/sunrise-api#readme`, '_api')
}

const handleOpenFacebookPage = () => {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_got_em')
}

const navLinks = [
  { name: 'home', label: 'Home', icon: 'fa-solid fa-house-chimney' },
  { name: 'portfolio', label: 'Portfolio', icon: 'fa-solid fa-suitcase' },
  {
    name: 'blogs',
    label: 'Blogs',
    icon: 'fa-solid fa-feather',
  },
  { name: 'about', label: 'About', icon: 'fa-solid fa-circle-question' },
]

const hamburgerContentIsShown = ref(false)
const toggleHamburgerContent = () => {
  const hamburgerContent = document.getElementById('app-navbar-hamburger-content')
  hamburgerContentIsShown.value = !hamburgerContentIsShown.value
  if (hamburgerContentIsShown.value) {
    hamburgerContent.classList.add('right-[0%]')
    hamburgerContent.classList.remove('right-[-200%]')
    return
  }
  hamburgerContent.classList.remove('right-[0%]')
  hamburgerContent.classList.add('right-[-200%]')
}
</script>
