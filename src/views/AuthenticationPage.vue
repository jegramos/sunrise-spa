<template>
  <div class="flex h-full items-center transition-all">
    <section
      class="mx-auto w-full max-w-screen-lg rounded-lg px-1 backdrop-blur-md sm:bg-theme-section sm:bg-opacity-75 sm:px-4 sm:py-8 sm:py-8 sm:shadow-sm"
    >
      <!-- Start Wrapper -->
      <div class="flex flex-col px-2 sm:grid sm:grid-cols-3">
        <!-- Start form -->
        <div class="flex flex-col px-2 sm:col-span-2 sm:items-start sm:justify-center sm:pr-8">
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
              Please enter your credentials to start making cool and caress your ego
            </p>
          </div>
          <div v-else>
            <p class="font-bold">Welcome to Campfire!</p>
            <p class="mt-1 text-sm text-theme-muted">
              Please fill-in this short form and be part of something... ugh... great?
            </p>
          </div>
          <!-- End lead text -->
          <div class="w-full rounded-lg">
            <!-- Start creds login -->
            <form
              v-if="route.name === 'login'"
              ref="login-form"
              autocomplete="off"
              class="flex w-full flex-col justify-between"
              @submit.prevent
            >
              <div class="flex flex-col lg:flex-row">
                <div class="w-full lg:mr-4">
                  <cf-text-input
                    id="login-email-or-username-input"
                    label="Email or username"
                    class="text-sm"
                  ></cf-text-input>
                </div>
                <div class="w-full">
                  <cf-text-input
                    id="login-password-input"
                    label="Password"
                    type="password"
                    class="text-sm"
                  ></cf-text-input>
                </div>
              </div>
              <!-- Start action buttons -->
              <div class="mb-1 mt-4 flex w-full justify-end justify-between">
                <cf-button class="bg-transparent text-sm italic hover:bg-theme-section-hover">
                  I forgot my password
                </cf-button>
                <cf-button class="w-[35%] bg-theme-primary text-sm text-theme-inverted sm:w-[28%] lg:w-[25%]">
                  <template #icon>
                    <font-awesome-icon icon="fa-solid fa-right-to-bracket" class="mr-1.5 h-3 w-3 font-light" />
                  </template>
                  Login
                </cf-button>
              </div>
              <!-- End action buttons -->
            </form>
            <!-- End creds login -->
            <!-- Start creds sign up -->
            <form
              v-else
              ref="register-form"
              autocomplete="off"
              class="flex w-full flex-col justify-between"
              @submit.prevent
            >
              <!-- Start email and username -->
              <div class="flex flex-col lg:flex-row">
                <div class="w-full lg:mr-4">
                  <cf-text-input id="register-email-input" label="Email" class="text-sm"></cf-text-input>
                </div>
                <div class="w-full">
                  <cf-text-input id="register-username-input" label="Username" class="text-sm"></cf-text-input>
                </div>
              </div>
              <!-- End email and username -->
              <!-- Start first name and last name -->
              <div class="flex flex-col lg:flex-row">
                <div class="mr-4 w-full">
                  <cf-text-input id="register-first-name-input" label="First name" class="text-sm"></cf-text-input>
                </div>
                <div class="w-full">
                  <cf-text-input id="register-last-name-input" label="Last name" class="text-sm"></cf-text-input>
                </div>
              </div>
              <!-- End first name and last name -->
              <!-- Start password and confirmation -->
              <div class="flex flex-col lg:flex-row">
                <div class="mr-4 w-full">
                  <cf-text-input
                    id="register-password"
                    label="Password"
                    type="password"
                    class="text-sm"
                  ></cf-text-input>
                </div>
                <div class="w-full">
                  <cf-text-input
                    id="register-password-confirmation"
                    label="Confirm Password"
                    type="password"
                    class="text-sm"
                  ></cf-text-input>
                </div>
              </div>
              <!-- End password and confirmation-->
              <!-- Start action buttons -->
              <div class="mb-1 mt-4 flex w-full justify-between">
                <cf-button
                  :class="`${
                    route.name === 'login' ? 'block' : 'invisible'
                  } bg-transparent text-sm italic hover:bg-theme-section-hover`"
                >
                  I forgot my password
                </cf-button>
                <cf-button class="w-[35%] bg-theme-primary text-sm text-theme-inverted sm:w-[28%] lg:w-[25%]">
                  <template #icon>
                    <font-awesome-icon icon="fa-solid fa-right-to-bracket" class="mr-1.5 h-3 w-3 font-light" />
                  </template>
                  {{ route.name === 'login' ? 'Sign in' : 'Register' }}
                </cf-button>
              </div>
              <!-- End action buttons -->
            </form>
            <!-- End creds sign up -->
          </div>
          <!-- Start creds sign-up -->

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
          <template class="flex flex-col sm:hidden">
            <cf-horizontal-separator class="my-6"> or</cf-horizontal-separator>
            <cf-button
              class="bg-theme-primary text-sm text-theme-inverted"
              @click="route.name === 'login' ? $router.push({ name: 'sign-up' }) : $router.push({ name: 'login' })"
            >
              {{ route.name === 'login' ? 'Create an account' : 'Sign in instead' }}
            </cf-button>
          </template>
          <!-- End Sign in / Sign up button (mobile) -->
        </div>
        <!-- End form -->
        <!-- Start graphic -->
        <div
          class="hidden w-full flex-col items-center justify-center rounded-xl bg-theme-tooling bg-opacity-10 py-6 backdrop-blur-md sm:flex"
        >
          <login-graphic class="h-[40%] w-full sm:h-[50%] sm:w-[90%]"></login-graphic>
          <div class="flex flex-col items-center justify-center">
            <div class="separator-h my-6 w-[80%]"></div>
            <p class="mb-4 text-sm">
              {{ route.name === 'login' ? 'Are you new to Campfire?' : 'Already have an account?' }}
            </p>
            <cf-button
              class="bg-theme-primary text-sm text-theme-inverted"
              @click="route.name === 'login' ? $router.push({ name: 'sign-up' }) : $router.push({ name: 'login' })"
            >
              {{ route.name === 'login' ? 'Create an account' : 'Sign in instead' }}
            </cf-button>
            <p class="mb-2 mt-3 text-xs italic text-theme-muted">
              {{ route.name === 'login' ? 'In under 3 minutes' : "and let's get back to it" }}
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
import CfTextInput from '@/components/campfire/inputs/CfTextInput.vue'
import LoginGraphic from '@/components/login-page/LoginGraphic.vue'
import { useRoute } from 'vue-router'
import CfHorizontalSeparator from '@/components/campfire/separators/CfHorizontalSeparator.vue'

const route = useRoute()
</script>
