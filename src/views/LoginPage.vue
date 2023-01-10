<template>
  <section
    class="mx-auto w-[75%] max-w-screen-lg rounded-lg bg-theme-section bg-opacity-75 py-8 px-4 shadow-sm backdrop-blur-md"
  >
    <!-- Start Login form -->
    <div class="grid grid-cols-3">
      <!-- Start form -->
      <div class="col-span-2 flex flex-col items-start justify-center px-6">
        <app-logo
          class="text-2xl transition-transform duration-200 hover:scale-105 hover:cursor-pointer"
          @click="$router.push({ name: 'home' })"
        >
        </app-logo>
        <div class="separator-h my-5 w-full"></div>
        <p class="font-bold">Welcome back!</p>
        <p class="mt-1 text-sm text-theme-muted">Please enter your credentials below to start making cool stuff</p>
        <!-- Start creds login -->
        <div class="mt-6 w-full rounded-lg">
          <form ref="login-form-page" class="flex w-[70%] flex-col justify-between" @submit.prevent>
            <div class="mb-5 w-full">
              <cf-text-input
                id="login-email-or-username-input"
                label="Email or username"
                class="text-sm"
              ></cf-text-input>
            </div>
            <div class="flex w-full flex-col">
              <cf-text-input id="login-password-input" label="Password" type="password" class="text-sm"></cf-text-input>
              <small
                class="my-1.5 ml-4 text-xs text-theme-base transition-transform duration-100 hover:scale-105 hover:cursor-pointer"
              >
                <router-link :to="{ name: 'forgot-password' }"> I forgot my password </router-link>
              </small>
            </div>
            <div class="mb-1 flex w-full justify-end">
              <cf-button class="mt-1 w-[25%] bg-theme-primary text-sm text-theme-inverted">
                <template #icon>
                  <font-awesome-icon icon="fa-solid fa-right-to-bracket" class="mr-1.5 h-3 w-3 font-light" />
                </template>
                Sign In
              </cf-button>
            </div>
          </form>
        </div>
        <!-- End creds login -->
        <!-- Start OAuth -->
        <div class="mt-6 mb-4 flex w-full items-center">
          <div class="separator-h w-[40%]"></div>
          <div class="w-[20%] text-center text-xs font-light text-theme-muted">or login with</div>
          <div class="separator-h w-[40%]"></div>
        </div>
        <div class="flex w-full justify-center text-sm text-white">
          <cf-button class="mr-4 w-full bg-[#C71711]">
            <template #icon>
              <font-awesome-icon icon="fa-brands fa-google" class="mr-1 h-3"></font-awesome-icon>
            </template>
            Google
          </cf-button>
          <cf-button class="mr-4 w-full bg-[#4267B2]">
            <template #icon>
              <font-awesome-icon icon="fa-brands fa-facebook" class="mr-1.5 h-3"></font-awesome-icon>
            </template>
            Facebook
          </cf-button>
          <cf-button class="mr-4 w-full bg-[#172525]">
            <template #icon>
              <font-awesome-icon icon="fa-brands fa-github" class="mr-1.5 h-3"></font-awesome-icon>
            </template>
            Github
          </cf-button>
        </div>
        <!-- End OAuth -->
      </div>
      <!-- End form -->
      <!-- Start graphic -->
      <div class="bg-theme-tooling">IMAGE</div>
      <!-- End graphic -->
    </div>
    <!-- End Login form -->
  </section>
</template>

<script setup>
import AppLogo from '@/components/AppLogo.vue'
import CfButton from '@/components/campfire/buttons/CfButton.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import CfTextInput from '@/components/campfire/inputs/CfTextInput.vue'
</script>
