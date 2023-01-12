<template>
  <form ref="register-form" autocomplete="off" class="flex w-full flex-col justify-between" @submit.prevent>
    <!-- Start email and username -->
    <div class="flex flex-col sm:flex-row">
      <div class="w-full sm:mr-2">
        <cf-text-input id="register-email-input" label="Email" class="text-sm"></cf-text-input>
      </div>
      <div class="w-full sm:ml-2">
        <cf-text-input id="register-username-input" label="Username" class="text-sm"></cf-text-input>
      </div>
    </div>
    <!-- End email and username -->
    <!-- Start first name and last name -->
    <div class="flex flex-col sm:flex-row">
      <div class="w-full sm:mr-2">
        <cf-text-input id="register-first-name-input" label="First name" class="text-sm"></cf-text-input>
      </div>
      <div class="w-full sm:ml-2">
        <cf-text-input id="register-last-name-input" label="Last name" class="text-sm"></cf-text-input>
      </div>
    </div>
    <!-- End first name and last name -->
    <!-- Start password and confirmation -->
    <div class="flex flex-col sm:flex-row">
      <div class="w-full sm:mr-2">
        <cf-text-input id="register-password" label="Password" type="password" class="text-sm"></cf-text-input>
      </div>
      <div class="w-full sm:ml-2">
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
    <div class="mb-1 mt-4 flex w-full justify-end">
      <cf-button class="w-[35%] bg-theme-primary text-sm text-theme-inverted sm:w-[28%] lg:w-[25%]">
        <template #icon>
          <font-awesome-icon icon="fa-solid fa-right-to-bracket" class="mr-1.5 h-3 w-3 font-light" />
        </template>
        Register
      </cf-button>
    </div>
    <!-- End action buttons -->
  </form>
</template>

<script setup>
import CfButton from '@/components/campfire/buttons/CfButton.vue'
import CfTextInput from '@/components/campfire/inputs/CfTextInput.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>
