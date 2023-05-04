<template>
  <div class="mt-8 flex flex-col items-center justify-center">
    <div class="flex w-[90%] items-center justify-between sm:w-[65%] lg:w-[50%]">
      <app-logo
        class="text-2xl transition-transform duration-200 hover:scale-105 hover:cursor-pointer"
        @click="router.push({ name: 'home' })"
      >
      </app-logo>
      <cf-button @click="router.push({ name: 'login' })">
        <small class="font-sm italic">Back to Login</small>
      </cf-button>
    </div>
    <div class="align-center mt-6 flex w-[90%] flex-col rounded-2xl bg-theme-section p-12 sm:w-[65%] lg:w-[50%]">
      <!-- Start alert -->
      <transition
        enter-active-class="transition duration-200"
        enter-from-class="scale-50 opacity-0"
        leave-to-class="opacity-0"
      >
        <cf-alert-panel v-model="showErrorAlert" dismissible class="z-30 mb-4" panel-type="error">
          {{ errorAlertTitle }}
          <template #description>
            {{ errorAlertDescription }}
          </template>
        </cf-alert-panel>
      </transition>
      <!-- End alert -->
      <form id="forgot-password-form-page" autocomplete="off" @submit.prevent>
        <h1 class="text-lg tracking-wider sm:text-xl">FORGOT YOUR PASSWORD?</h1>
        <p class="text-muted mt-1 text-sm leading-relaxed sm:mt-3">
          Please enter the email you've used to sign-in to <span class="text-theme-primary">Campfire.</span> If you've
          entered a valid email address, you will receive the reset link in your inbox.
        </p>
        <cf-text-input
          v-model="payload.email"
          label="Email"
          name="email"
          class="mt-1"
          :invalid="validator.email.$invalid"
          :invalid-text="validator.email.$errors[0]?.$message"
          @blur="validator.email.$touch"
          @keydown.enter.prevent="handleFormSubmit"
        ></cf-text-input>
        <div class="flex justify-end">
          <div class="flex w-full flex-col sm:w-auto">
            <cf-button
              :is-loading="isLoading"
              :disabled="requestPasswordButtonIsLocked"
              class="mt-3 w-full bg-theme-primary text-theme-inverted sm:mt-6 sm:w-auto"
              @click="handleFormSubmit"
            >
              <template #icon>
                <font-awesome-icon icon="fa-solid fa-paper-plane" class="mr-2" />
              </template>
              Request Password Reset
            </cf-button>
            <small
              v-if="requestPasswordButtonIsLocked"
              class="mt-4 text-center text-xs italic text-theme-muted sm:text-right"
            >
              You can request again after <span class="font-bold">{{ requestPasswordButtonTimer }}</span> seconds
            </small>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import AppLogo from '@/components/AppLogo.vue'
import CfTextInput from '@/components/campfire/inputs/CfTextInput.vue'
import CfButton from '@/components/campfire/buttons/CfButton.vue'
import CfAlertPanel from '@/components/campfire/CfAlertPanel.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import { email, helpers, required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { useGlobalStore } from '@/stores/global'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const globalStore = useGlobalStore()
const authStore = useAuthStore()

const payload = reactive({
  email: '',
})

const formRules = {
  $lazy: true,
  email: {
    required: helpers.withMessage('Please enter your email address', required),
    email: helpers.withMessage('Please enter a valid email address', email),
  },
}

const isLoading = ref(false)
const validator = useVuelidate(formRules, payload)

// Handle form submission
const showErrorAlert = ref(false)
const errorAlertTitle = 'Unable to send email'
const errorAlertDescription =
  'We were unable to send you a password reset email, please try again in a few moments or contact our support team.'
const requestPasswordButtonIsLocked = ref(false)
const requestPasswordButtonTimer = ref(60)
let requestPasswordButtonTimerId = null

const resetRequestPasswordButtonLock = () => {
  clearInterval(requestPasswordButtonTimerId)
  requestPasswordButtonIsLocked.value = false
  requestPasswordButtonTimer.value = 60
}

const handleFormSubmit = async () => {
  const valid = await validator.value.$validate()
  if (!valid || requestPasswordButtonIsLocked.value) return

  isLoading.value = true
  const response = await authStore.requestForgotPassword(payload)
  isLoading.value = false

  // If it's a validation error, then the email is incorrect (or someone is trying to guess an email)
  if (!response.success && response.error_code !== 'VALIDATION_ERROR') {
    return (showErrorAlert.value = true)
  }

  globalStore.pushToastMessage({
    title: 'Email Sent',
    description: "We've sent a password reset link to your email address",
    timeout: 10000,
    type: 'success',
    iconClass: 'fa-solid fa-paper-plane',
  })

  showErrorAlert.value = false

  // Lock the button for 60 seconds
  requestPasswordButtonIsLocked.value = true
  requestPasswordButtonTimerId = setInterval(async () => {
    requestPasswordButtonTimer.value -= 1
    if (requestPasswordButtonTimer.value <= 0) {
      resetRequestPasswordButtonLock()
    }
  }, 1000)
}
</script>

<style scoped></style>
