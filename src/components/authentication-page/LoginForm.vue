<template>
  <form ref="login-form" autocomplete="off" class="flex w-full flex-col justify-between" @submit.prevent>
    <div class="flex flex-col lg:flex-row">
      <div class="w-full lg:mr-4">
        <cf-text-input id="login-email-or-username-input" label="Email or username" class="text-sm"></cf-text-input>
      </div>
      <div class="w-full">
        <cf-text-input id="login-password-input" label="Password" type="password" class="text-sm"></cf-text-input>
      </div>
    </div>
    <!-- Start action buttons -->
    <div class="mb-1 mt-4 flex w-full justify-end justify-between">
      <cf-button class="bg-transparent text-sm italic hover:bg-theme-section-hover"> I forgot my password</cf-button>
      <cf-button class="w-[35%] bg-theme-primary text-sm text-theme-inverted sm:w-[28%] lg:w-[25%]">
        <template #icon>
          <font-awesome-icon icon="fa-solid fa-right-to-bracket" class="mr-1.5 h-3 w-3 font-light" />
        </template>
        Login
      </cf-button>
    </div>
    <!-- End action buttons -->
  </form>
</template>

<script setup>
import CfTextInput from '@/components/campfire/inputs/CfTextInput.vue'
import CfButton from '@/components/campfire/buttons/CfButton.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>
