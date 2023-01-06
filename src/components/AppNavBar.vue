<template>
  <nav class="py-2.5 px-3 lg:px-12 fixed w-full z-20 top-0 left-0 bg-theme-section">
    <div class="flex flex-wrap items-center justify-between">
      <!-- Start Logo and title -->
      <div class="flex items-center lg:w-[25%]">
        <div class="mr-1 rounded-3xl p-0.5 border-2 border-theme-primary">
          <fire-icon class="text-theme-primary w-5 h-5" />
        </div>
        <h5 class="font-light tracking-wider text-theme-base text-2xl">
          Camp<span class="font-medium text-theme-primary underline underline-offset-4">fire</span>
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
            <button
              data-tooltip-target="tooltip-github-navlink"
              class="rounded-3xl text-theme-base w-6 h-6 hover:scale-125 transition-transform duration-150 ease-in focus-visible:outline-none focus-visible:ring-theme-primary focus-visible:ring-1"
              @click="handleOpenGithubPages"
            >
              <font-awesome-icon icon="fa-brands fa-github-alt" />
            </button>
            <app-tooltip id="tooltip-github-navlink">
              <template #icon>
                <arrow-top-right-on-square-icon class="h-3 w-3 mr-1" />
              </template>
              <template #text>Visit Github</template>
            </app-tooltip>
            <!-- End Github link icon -->
            <!-- Start FB link icon -->
            <button
              data-tooltip-target="tooltip-fb-navlink"
              class="rounded-3xl text-theme-base ml-1 w-6 h-6 hover:scale-125 transition-transform duration-150 ease-in focus-visible:outline-none focus-visible:ring-theme-primary focus-visible:ring-1"
              @click="handleOpenFacebookPage"
            >
              <font-awesome-icon icon="fa-brands fa-facebook" />
            </button>
            <app-tooltip id="tooltip-fb-navlink">
              <template #icon>
                <arrow-top-right-on-square-icon class="h-3 w-3 mr-1" />
              </template>
              <template #text>Visit Facebook</template>
            </app-tooltip>
            <!-- End FB link icon -->
          </div>
        </div>
        <!-- End Switcher and icons -->
        <!-- Start mobile hamburger -->
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          class="inline-flex items-center p-2 text-sm text-theme-base rounded-lg lg:hidden hover:text-theme-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-primary"
          aria-controls="navbar-sticky"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <!-- End mobile hamburger -->
      </div>
      <!-- End Utils section -->
      <!-- Start Nav links -->
      <div id="navbar-sticky" class="items-center justify-center hidden w-full lg:flex lg:w-auto lg:order-1">
        <ul
          class="flex flex-col p-4 mt-4 rounded-lg bg-theme-tooling lg:bg-theme-section lg:flex-row lg:space-x-8 lg:mt-0 lg:text-sm lg:font-medium"
        >
          <li v-for="link in navLinks" :key="link.name">
            <router-link
              :to="{ name: link.name }"
              active-class="bg-theme-primary lg:bg-theme-section lg:underline lg:decoration-2 lg:underline-offset-4 lg:decoration-theme-primary"
              class="block py-2 pl-3 pr-4 text-white text-theme-base rounded lg:rounded-xl lg:text-theme-base lg:hover:bg-theme-section-hover lg:py-1 lg:px-2 focus-visible:outline-none focus-visible:ring-theme-primary focus-visible:ring-1 focus-visible:no-underline"
            >
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
// import { useRoute } from 'vue-router'

const handleOpenGithubPages = () => {
  const githubUser = import.meta.env.VITE_GITHUB_USER
  window.open(`https://github.com/${githubUser}/sunrise-spa#readme`, '_spa')
  window.open(`https://github.com/${githubUser}/sunrise-api#readme`, '_api')
}

const handleOpenFacebookPage = () => {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_got_em')
}

const navLinks = [
  { name: 'home', label: 'Home' },
  { name: 'portfolio', label: 'Portfolio' },
  {
    name: 'blogs',
    label: 'Blogs',
  },
  { name: 'about', label: 'About' },
]

// const route = useRoute()
</script>
