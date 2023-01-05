<template>
  <nav class="py-2.5 px-3 md:px-12 fixed w-full z-20 top-0 left-0 bg-theme-section">
    <div class="flex flex-wrap items-center justify-between">
      <!-- Start Logo and title -->
      <div class="flex items-center">
        <div class="border border-2 mr-1 rounded-3xl p-1 border-theme-primary">
          <briefcase-icon class="text-theme-primary w-5 h-5" />
        </div>
        <h5 class="font-medium leading-loose text-theme-primary text-2xl">
          Web<span class="font-extralight text-theme-base">folio</span>
        </h5>
      </div>
      <!-- End logo and title -->
      <!-- Start Utils section -->
      <div class="flex md:order-2 items-center">
        <!-- Start theme switcher -->
        <app-theme-switcher />
        <!-- End theme switcher -->
        <!-- Start Github icon -->
        <!-- Start Github icon -->
        <!-- Start mobile hamburger -->
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          class="inline-flex items-center p-2 text-sm text-theme-base rounded-lg md:hidden hover:text-theme-primary focus:outline-none focus:ring-2 focus:ring-theme-primary"
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
      <div id="navbar-sticky" class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
        <ul
          class="flex flex-col p-4 mt-4 rounded-lg bg-theme-tooling md:bg-theme-section md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium"
        >
          <li v-for="link in navLinks" :key="link.name">
            <a
              href="#"
              class="block py-2 pl-3 pr-4 text-white text-theme-base rounded md:rounded-xl md:text-theme-base md:hover:bg-theme-section-hover md:py-1 md:px-2 focus:outline-none focus:outline-theme-primary focus:outline-1"
            >
              {{ link.name }}
            </a>
          </li>
        </ul>
      </div>
      <!-- End Nav links -->
    </div>
  </nav>
</template>

<script setup>
import AppThemeSwitcher from '@/components/AppThemeSwitcher.vue'
import { BriefcaseIcon } from '@heroicons/vue/20/solid'

const navLinks = [{ name: 'Home' }, { name: 'Projects' }, { name: 'Contact Info' }, { name: 'Work Experience' }]
</script>
