<template>
  <div class="flex h-full items-center transition-all">
    <section
      class="mx-auto w-full max-w-screen-lg rounded-lg px-1 backdrop-blur-md sm:bg-theme-section sm:bg-opacity-75 sm:px-4 sm:py-8 sm:py-8 sm:shadow-sm"
    >
      <!-- Start Wrapper -->
      <div class="flex flex-col px-2 sm:grid sm:grid-cols-3">
        <!-- Start form -->
        <div class="flex flex-col px-2 sm:col-span-2 sm:items-start sm:pr-8">
          <div class="flex w-full justify-between">
            <app-logo
              class="text-2xl transition-transform duration-200 hover:scale-105 hover:cursor-pointer"
              @click="$router.push({ name: 'home' })"
            >
            </app-logo>
            <cf-button class="text-xs font-bold italic text-theme-base" @click="$router.push({ name: 'home' })">
              <template #icon>
                <font-awesome-icon icon="fa-solid fa-people-pulling" class="mr-1.5" />
              </template>
              get me outta here
            </cf-button>
          </div>
          <cf-horizontal-separator class="my-5"></cf-horizontal-separator>
          <!-- Start lead text -->
          <div v-if="route.name === 'login'">
            <p class="font-bold">Welcome back!</p>
            <p class="mt-1 text-sm text-theme-muted">
              Please enter your credentials to start making cool stuff and caress your ego
            </p>
          </div>
          <div v-else>
            <p class="font-bold">Welcome to Campfire!</p>
            <p class="mt-1 text-sm text-theme-muted">
              Please fill-in this short form and be part of something... ugh... great?
            </p>
          </div>
          <!-- End lead text -->
          <!-- Start creds sign-up -->
          <div class="w-full rounded-lg">
            <div v-if="route.name === 'login'">
              <login-form />
            </div>
            <div v-else>
              <register-form />
            </div>
          </div>
          <!-- End creds sign-up -->
          <!-- Start OAuth -->
          <cf-horizontal-separator class="mt-4 mb-6">
            {{ route.name === 'login' ? 'or login with' : 'or register with' }}
          </cf-horizontal-separator>
          <div class="flex w-full justify-center text-sm text-white">
            <cf-button class="mx-1 w-full bg-[#C71711] sm:mx-2">
              <template #icon>
                <font-awesome-icon icon="fa-brands fa-google" class="mr-1 h-3"></font-awesome-icon>
              </template>
              Google
            </cf-button>
            <cf-button class="mx-1 w-full bg-[#4267B2] sm:mx-2">
              <template #icon>
                <font-awesome-icon icon="fa-brands fa-facebook" class="mr-1.5 h-3"></font-awesome-icon>
              </template>
              Facebook
            </cf-button>
            <cf-button class="mx-1 w-full bg-[#172525] sm:mx-2">
              <template #icon>
                <font-awesome-icon icon="fa-brands fa-github" class="mr-1.5 h-3"></font-awesome-icon>
              </template>
              Github
            </cf-button>
          </div>
          <!-- End OAuth -->
          <!-- Start Sign in / Sign up button (mobile) -->
          <div class="flex flex-col sm:hidden">
            <cf-horizontal-separator class="my-6"> or</cf-horizontal-separator>
            <cf-button
              class="bg-theme-primary text-sm text-theme-inverted"
              @click="route.name === 'login' ? $router.push({ name: 'sign-up' }) : $router.push({ name: 'login' })"
            >
              {{ route.name === 'login' ? 'Create an account' : 'Sign in instead' }}
            </cf-button>
          </div>
          <!-- End Sign in / Sign up button (mobile) -->
        </div>
        <!-- End form -->
        <!-- Start graphic -->
        <div
          class="hidden w-full flex-col justify-center rounded-xl bg-theme-tooling bg-opacity-10 py-6 backdrop-blur-md sm:flex"
        >
          <div v-if="route.name === 'login'" key="auth-graphic-login" class="flex w-full items-center">
            <login-graphic class="mx-4 h-[80%] w-full"></login-graphic>
          </div>
          <div v-else key="auth-graphic-register" class="flex w-full items-start lg:items-center">
            <registration-graphic class="mx-4 h-[80%] w-full"></registration-graphic>
          </div>
          <div class="flex flex-col items-center justify-center">
            <cf-horizontal-separator class="mb-6" />
            <p class="mb-4 text-sm">
              {{ route.name === 'login' ? 'Are you new to Campfire?' : 'Already have an account?' }}
            </p>
            <cf-button
              class="bg-theme-primary text-sm text-theme-inverted"
              @click="route.name === 'login' ? $router.push({ name: 'sign-up' }) : $router.push({ name: 'login' })"
            >
              <span class="mx-2">{{ route.name === 'login' ? 'Create an account' : 'Sign in instead' }}</span>
            </cf-button>
            <p class="mb-2 mt-3 text-xs italic text-theme-muted">
              {{ route.name === 'login' ? 'It will only take a minute' : "and let's get back to it" }}
            </p>
          </div>
        </div>
        <!-- End graphic -->
      </div>
      <!-- End Wrapper -->
    </section>
  </div>
</template>

<script setup>
import AppLogo from '@/components/AppLogo.vue'
import CfButton from '@/components/campfire/buttons/CfButton.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import LoginGraphic from '@/components/authentication-page/LoginGraphic.vue'
import { useRoute } from 'vue-router'
import CfHorizontalSeparator from '@/components/campfire/separators/CfHorizontalSeparator.vue'
import LoginForm from '@/components/authentication-page/LoginForm.vue'
import RegisterForm from '@/components/authentication-page/RegisterForm.vue'
import RegistrationGraphic from '@/components/authentication-page/RegistrationGraphic.vue'

const route = useRoute()
</script>
