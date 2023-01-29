<template>
  <nav
    id="app-main-nav"
    class="fixed top-0 left-0 z-20 mx-auto w-full justify-center bg-theme-section px-4 py-3 lg:px-12"
  >
    <div class="flex flex-wrap items-center justify-between">
      <!-- Start Logo and title -->
      <app-logo
        class="text-2xl transition-transform duration-200 ease-in hover:-translate-y-0.5 hover:scale-105 hover:cursor-pointer lg:w-[30%]"
      />
      <!-- End logo and title -->
      <!-- Start Utils section -->
      <div class="flex items-center lg:order-2 lg:w-[30%]">
        <!-- Start Switcher and icons -->
        <div class="hidden w-full lg:flex lg:items-center lg:justify-end">
          <app-theme-switcher class="mr-4" />
          <div class="flex">
            <!-- Start Notification icon -->
            <app-tooltip>
              <template #tooltip-target>
                <button class="xs:block nav-base-icon-button h-6 w-6 rounded-3xl text-theme-base md:hidden lg:block">
                  <font-awesome-icon icon="fa-solid fa-bell" />
                </button>
              </template>
              <template #tooltip-text>View Notifications</template>
            </app-tooltip>
            <!-- End Notification icon -->
          </div>
        </div>
        <!-- End Switcher and icons -->
        <!-- Start Login and Profile section -->
        <div v-if="!auth.isAuthenticated">
          <cf-button
            class="ml-6 hidden items-center border border-theme-primary text-theme-primary hover:bg-theme-primary hover:text-theme-inverted lg:flex"
            @click="navigateToLogin"
          >
            <template #icon>
              <font-awesome-icon icon="fa-solid fa-right-to-bracket" class="mr-1.5 h-3 w-3 font-light" />
            </template>
            <span class="text-xs">LOGIN</span>
          </cf-button>
        </div>
        <div v-else class="ml-4 hidden items-center lg:flex">
          <cf-profile-menu :avatar-height="8" :avatar-width="8" />
        </div>
        <!-- End Login and Profile section -->
        <!-- Start mobile hamburger -->
        <button
          id="app-navbar-hamburger-button"
          class="group group flex w-6 flex-col items-end p-0.5 hover:cursor-pointer focus:ring-theme-primary lg:hidden"
          @click="toggleHamburgerContent"
        >
          <span class="sr-only">Open navigation menu</span>
          <span
            id="hamburger-button-line-top"
            :class="`ease my-0.5 h-0.5 w-full transform rounded-full bg-theme-neutral transition duration-300 ${
              hamburgerContentIsShown ? 'translate-y-1.5 rotate-45' : ''
            }`"
          ></span>
          <span
            id="hamburger-button-line-middle"
            :class="`ease my-0.5 h-0.5 w-[75%] transform rounded-full bg-theme-neutral transition duration-300 ${
              hamburgerContentIsShown ? '-translate-x-3 opacity-0' : 'opacity-100'
            }`"
          ></span>
          <span
            id="hamburger-button-line-bottom"
            :class="`ease my-0.5 h-0.5 w-full transform rounded-full bg-theme-neutral transition duration-300 ${
              hamburgerContentIsShown ? '-translate-y-1.5 -rotate-45' : ''
            }`"
          ></span>
        </button>
        <!-- End mobile hamburger -->
      </div>
      <!-- End Utils section -->
      <!-- Start Nav links -->
      <div
        id="app-navbar-hamburger-content"
        class="absolute top-[100%] right-[-200%] w-full items-center justify-center bg-theme-section transition-right duration-300 ease-in hover:cursor-pointer lg:static lg:order-1 lg:mt-0 lg:flex lg:w-auto lg:bg-transparent"
      >
        <ul
          class="mx-2 flex h-screen flex-col rounded-lg text-sm lg:mt-0 lg:h-auto lg:flex-row lg:space-x-8 lg:bg-theme-section lg:font-medium lg:shadow-none"
        >
          <!-- Start Profile Section -->
          <li v-if="auth.isAuthenticated">
            <cf-profile-menu
              view-mode="accordion"
              class="mb-2 rounded py-2 px-4 text-theme-base lg:hidden"
              :avatar-width="12"
              :avatar-height="12"
              @selected="toggleHamburgerContent"
            />
            <cf-horizontal-separator class="mb-4 mt-2 w-full lg:hidden" />
          </li>
          <!-- End Profile Section -->

          <!-- Start nav links -->
          <li v-for="link in navLinks" :key="link.name">
            <router-link
              :to="{ name: link.name }"
              active-class="bg-theme-primary font-bold text-theme-inverted lg:text-theme-base lg:bg-theme-section lg:mx-0 lg:font-normal lg:underline lg:decoration-2 lg:underline-offset-8 lg:decoration-theme-primary"
              class="mb-4 block rounded py-2 pl-6 pr-4 text-left text-theme-base transition-none duration-200 ease-in hover:transition-transform focus-visible:no-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-theme-primary lg:mb-0 lg:rounded-xl lg:py-1 lg:px-2 lg:text-theme-base lg:hover:-translate-y-0.5 lg:hover:scale-105 lg:hover:bg-theme-section-hover"
              @click="toggleHamburgerContent"
            >
              <font-awesome-icon :icon="link.icon" class="mr-2 h-3 w-3 lg:hidden"></font-awesome-icon>
              {{ link.label }}
            </router-link>
          </li>
          <!-- End nav links -->
          <!-- Start theme switcher -->
          <li class="lg:hidden">
            <cf-horizontal-separator class="mb-3"></cf-horizontal-separator>
          </li>
          <li class="lg:hidden">
            <app-theme-switcher
              view-mode="modal"
              class="mb-4 block w-full bg-theme-section"
              @theme-applied="toggleHamburgerContent"
            />
          </li>
          <li class="lg:hidden">
            <router-link
              v-if="!auth.isAuthenticated"
              :to="{ name: 'login' }"
              class="mb-4 block w-full rounded py-2 pl-6 pr-4 text-left font-bold text-theme-base transition-none duration-200 ease-in hover:transition-all focus-visible:no-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-theme-primary lg:mb-0 lg:rounded-xl lg:py-1 lg:px-2 lg:text-theme-base lg:hover:-translate-y-0.5 lg:hover:scale-105 lg:hover:bg-theme-section-hover"
              @click="toggleHamburgerContent"
            >
              <font-awesome-icon icon="fa-solid fa-right-to-bracket" class="mr-2 h-3 w-3 lg:hidden"></font-awesome-icon>
              Login
            </router-link>
          </li>
          <!-- End Switch theme (mobile) -->
        </ul>
      </div>
      <!-- End Nav links -->
    </div>
  </nav>
</template>

<script setup>
import AppThemeSwitcher from '@/components/campfire/theme-switcher/CfThemeSwitcher.vue'
import AppTooltip from '@/components/AppTooltip.vue'
import AppLogo from '@/components/AppLogo.vue'
import CfButton from '@/components/campfire/buttons/CfButton.vue'
import CfHorizontalSeparator from '@/components/campfire/separators/CfHorizontalSeparator.vue'
import CfProfileMenu from '@/components/campfire/CfProfileMenu.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const router = useRouter()

const navLinks = []

router.getRoutes().forEach((route) => {
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

const navigateToLogin = async (fromMobileView = false) => {
  if (fromMobileView) {
    toggleHamburgerContent()
  }

  await router.push({ name: 'login' })
}
</script>
