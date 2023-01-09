<template>
  <nav
    id="app-main-nav"
    class="px-4 py-3 lg:px-12 fixed justify-center w-full mx-auto z-20 top-0 left-0 bg-theme-section"
  >
    <div class="flex flex-wrap items-center justify-between">
      <!-- Start Logo and title -->
      <app-logo
        class="lg:w-[30%] text-2xl font-extrabold hover:cursor-pointer hover:scale-105 transition-transform duration-200 ease-in hover:-translate-y-0.5"
      />
      <!-- End logo and title -->
      <!-- Start Utils section -->
      <div class="flex lg:order-2 lg:w-[30%] items-center">
        <!-- Start Switcher and icons -->
        <div class="hidden lg:flex lg:items-center lg:justify-end w-full">
          <app-theme-switcher class="mr-4" />
          <div class="flex">
            <!-- Start Github link icon -->
            <app-tooltip>
              <template #tooltip-target>
                <button
                  class="rounded-3xl xs:block md:hidden lg:block text-theme-base w-6 h-6 nav-base-icon-button"
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
                  class="rounded-3xl text-theme-base ml-1 w-6 h-6 nav-base-icon-button"
                  @click="handleOpenYoutubePage"
                >
                  <font-awesome-icon icon="fa-brands fa-youtube" />
                </button>
              </template>
              <template #tooltip-icon>
                <arrow-top-right-on-square-icon class="h-3 w-3 mr-1" />
              </template>
              <template #tooltip-text>Visit Youtube</template>
            </app-tooltip>
            <!-- End FB link icon -->
          </div>
        </div>
        <!-- End Switcher and icons -->
        <!-- Start Login and Profile section -->
        <button
          class="ml-6 hidden lg:flex items-center text-theme-primary border border-theme-primary text-sm py-2 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-theme-primary hover:scale-105 transition-all duration-200 hover:bg-theme-primary hover:text-theme-inverted hover:-translate-y-0.5"
          @click="navigateToLogin"
        >
          <font-awesome-icon icon="fa-solid fa-right-to-bracket" class="mr-1.5 font-light h-3 w-3" />
          <span class="text-xs">LOGIN</span>
        </button>
        <!-- End Login and Profile section -->
        <!-- Start mobile hamburger -->
        <button
          id="app-navbar-hamburger-button"
          class="flex flex-col group items-end p-0.5 w-6 lg:hidden hover:cursor-pointer focus:ring-theme-primary group"
          @click="toggleHamburgerContent"
        >
          <span class="sr-only">Open navigation menu</span>
          <span
            id="hamburger-button-line-top"
            :class="`h-0.5 w-full rounded-full my-0.5 bg-theme-neutral transition ease transform duration-300 ${
              hamburgerContentIsShown ? 'rotate-45 translate-y-1.5' : ''
            }`"
          ></span>
          <span
            id="hamburger-button-line-middle"
            :class="`h-0.5 w-[75%] rounded-full my-0.5 bg-theme-neutral transition ease transform duration-300 ${
              hamburgerContentIsShown ? '-translate-x-3 opacity-0' : 'opacity-100'
            }`"
          ></span>
          <span
            id="hamburger-button-line-bottom"
            :class="`h-0.5 w-full rounded-full my-0.5 bg-theme-neutral transition ease transform duration-300 ${
              hamburgerContentIsShown ? '-rotate-45 -translate-y-1.5' : ''
            }`"
          ></span>
        </button>
        <!-- End mobile hamburger -->
      </div>
      <!-- End Utils section -->
      <!-- Start Nav links -->
      <div
        id="app-navbar-hamburger-content"
        class="absolute items-center bg-theme-section justify-center w-full top-[100%] right-[-200%] hover:cursor-pointer transition-right duration-300 ease-in lg:bg-transparent lg:mt-0 lg:flex lg:w-auto lg:order-1 lg:static"
      >
        <ul
          class="flex flex-col mx-2 rounded-lg lg:bg-theme-section shadow-sm lg:shadow-none lg:flex-row lg:space-x-8 lg:mt-0 text-sm lg:font-medium"
        >
          <!-- Start Account Navlink Section -->
          <!-- End Account Navlink Section -->
          <li v-for="link in navLinks" :key="link.name">
            <router-link
              :to="{ name: link.name }"
              active-class="bg-theme-primary font-bold text-theme-inverted lg:text-theme-base lg:bg-theme-section lg:mx-0 lg:font-normal lg:underline lg:decoration-2 lg:underline-offset-8 lg:decoration-theme-primary"
              class="block text-left py-2 pl-6 pr-4 text-theme-base rounded mb-4 lg:mb-0 lg:rounded-xl lg:text-theme-base lg:hover:-translate-y-0.5 lg:hover:bg-theme-section-hover lg:hover:scale-105 transition-none hover:transition-all duration-200 ease-in lg:py-1 lg:px-2 focus-visible:outline-none focus-visible:ring-theme-primary focus-visible:ring-1 focus-visible:no-underline"
              @click="toggleHamburgerContent"
            >
              <font-awesome-icon :icon="link.icon" class="w-3 h-3 mr-2 lg:hidden"></font-awesome-icon>
              {{ link.label }}
            </router-link>
          </li>
          <li class="lg:hidden">
            <div class="separator-h mb-3 w-full"></div>
          </li>
          <li class="lg:hidden">
            <app-theme-switcher
              view-mode="modal"
              class="block w-full bg-theme-section mb-4"
              @theme-applied="toggleHamburgerContent"
            />
          </li>
          <!-- End Switch theme (mobile) -->
        </ul>
      </div>
      <!-- End Nav links -->
    </div>
  </nav>
</template>

<script setup>
import AppThemeSwitcher from '@/components/AppThemeSwitcher.vue'
import AppTooltip from '@/components/AppTooltip.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/20/solid'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppLogo from '@/components/AppLogo.vue'

const handleOpenGithubPages = () => {
  const githubUser = import.meta.env.VITE_GITHUB_USER
  window.open(`https://github.com/${githubUser}/sunrise-spa#readme`, '_spa')
  window.open(`https://github.com/${githubUser}/sunrise-api#readme`, '_api')
}

const handleOpenYoutubePage = () => {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_got_em')
}

const router = useRouter()

const navLinks = []

router.getRoutes().forEach((route) => {
  console.log(route)
  if (route.meta.isNavMenu) {
    const r = { name: route.name, label: route.meta.label }

    switch (route.name) {
      case 'home':
        r.icon = 'fa-solid fa-house-chimney'
        break
      case 'portfolio':
        r.icon = 'fa-solid fa-suitcase'
        break
      case 'blogs':
        r.icon = 'fa-solid fa-feather'
        break
      default:
        r.icon = 'fa-solid fa-circle-question'
        break
    }

    navLinks.push(r)
  }
})

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

const navigateToLogin = () => {
  router.push({ name: 'login' })
}
</script>
