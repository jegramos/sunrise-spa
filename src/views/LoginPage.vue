<template>
  <section
    class="mx-auto w-full max-w-screen-lg rounded-lg bg-transparent px-1 backdrop-blur-md sm:bg-theme-section sm:bg-opacity-75 sm:px-4 sm:py-8 sm:shadow-sm lg:py-4"
  >
    <!-- Start Login form -->
    <div class="flex flex-col px-2 sm:grid sm:grid-cols-3">
      <!-- Start form -->
      <div class="flex flex-col px-2 sm:col-span-2 sm:items-start sm:justify-center sm:px-6">
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
          <form
            ref="login-form-page"
            autocomplete="off"
            class="flex w-full flex-col justify-between lg:w-[70%]"
            @submit.prevent
          >
            <div class="mb-5 w-full">
              <cf-text-input
                id="login-email-or-username-input"
                label="Email or username"
                class="text-sm"
              ></cf-text-input>
            </div>
            <div class="flex w-full flex-col">
              <cf-text-input id="login-password-input" label="Password" type="password" class="text-sm"></cf-text-input>
            </div>
            <!-- Start action buttons -->
            <div class="mb-1 mt-4 flex w-full justify-end justify-between">
              <cf-button class="bg-transparent text-sm italic hover:bg-theme-section-hover">
                I forgot my password
              </cf-button>
              <cf-button class="w-[35%] bg-theme-primary text-sm text-theme-inverted sm:w-[25%]">
                <template #icon>
                  <font-awesome-icon icon="fa-solid fa-right-to-bracket" class="mr-1.5 h-3 w-3 font-light" />
                </template>
                Sign In
              </cf-button>
            </div>
            <!-- End action buttons -->
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
      </div>
      <!-- End form -->
      <!-- Start graphic -->
      <div
        class="hidden w-full flex-col justify-center rounded-xl bg-theme-tooling bg-opacity-10 py-6 backdrop-blur-md sm:flex"
      >
        <login-graphic class="h-[40%] w-full lg:h-[50%]"></login-graphic>
        <div class="flex flex-col items-center justify-center">
          <div class="separator-h my-6 w-[80%]"></div>
          <p class="mb-4 text-sm">You're new to Campfire?</p>
          <cf-button class="bg-theme-primary text-sm text-theme-inverted">Create an account</cf-button>
          <p class="mb-2 mt-3 text-xs italic text-theme-muted">In under 3 minutes</p>
        </div>
      </div>
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
import LoginGraphic from '@/components/login-page/LoginGraphic.vue'
</script>
