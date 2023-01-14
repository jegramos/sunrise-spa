<template>
  <!-- Start alert -->
  <transition
    enter-active-class="transition duration-200"
    enter-from-class="scale-50 opacity-0"
    leave-to-class="opacity-0"
  >
    <cf-alert-panel v-model="showErrorAlert" dismissible class="z-30 mb-4 w-full" panel-type="error">
      Incorrect email or password
      <template #description> Please double check your credentials and try again</template>
    </cf-alert-panel>
  </transition>
  <!-- End alert -->
  <div v-if="!showErrorAlert">
    <p class="font-bold">Welcome back!</p>
    <p class="mt-1 text-sm text-theme-muted">
      Please enter your credentials to start making cool stuff and caress your ego
    </p>
  </div>
  <form id="login-page-form" autocomplete="off" class="flex w-full flex-col justify-between" @submit.prevent>
    <div class="flex flex-col lg:flex-row">
      <div class="w-full lg:mr-4">
        <cf-text-input
          v-model="payload.email"
          :invalid="validator.email.$invalid"
          :invalid-text="validator.email.$invalid ? validator.email.$errors[0].$message : null"
          name="email"
          label="Email"
          class="text-sm"
          @blur="validator.email.$touch"
        ></cf-text-input>
      </div>
      <div class="w-full">
        <cf-text-input
          v-model="payload.password"
          name="password"
          label="Password"
          type="password"
          class="text-sm"
          :invalid="validator.password.$invalid"
          :invalid-text="validator.password.$invalid ? validator.password.$errors[0].$message : null"
          @keyup.enter="handleFormSubmit"
          @blur="validator.password.$touch"
        ></cf-text-input>
      </div>
    </div>
    <!-- Start action buttons -->
    <div class="mb-1 mt-4 flex w-full justify-end justify-between">
      <cf-button class="bg-transparent text-sm italic hover:bg-theme-section-hover"> I forgot my password</cf-button>
      <cf-button
        id="login-page-button"
        class="w-[35%] bg-theme-primary text-sm text-theme-inverted sm:w-[28%] lg:w-[25%]"
        :is-loading="isLoading"
        loading-text="Submitting..."
        @click="handleFormSubmit"
      >
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
import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import CfAlertPanel from '@/components/campfire/CfAlertPanel.vue'

const payload = reactive({
  email: '',
  password: '',
})

// Handle form validation
const formRules = {
  $lazy: true,
  email: {
    required: helpers.withMessage('Please enter your email address', required),
    email: helpers.withMessage('Please enter a valid email address', email),
  },
  password: {
    required: helpers.withMessage('Please enter your password', required),
  },
}

const isLoading = ref(false)
const validator = useVuelidate(formRules, payload)

// Handle form submission
const showErrorAlert = ref(false)
const router = useRouter()
const handleFormSubmit = async () => {
  const valid = await validator.value.$validate()
  if (!valid) return

  isLoading.value = true
  const auth = useAuthStore()
  const response = await auth.login(payload)
  isLoading.value = false

  if (response.success) {
    return await router.replace({ name: 'home' })
  }

  showErrorAlert.value = true
}
</script>
