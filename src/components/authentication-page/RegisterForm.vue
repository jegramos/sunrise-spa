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
    <p class="font-bold">Welcome, my dude!</p>
    <p class="mt-1 text-sm text-theme-muted">
      Please fill-in this short form and be part of something... ugh... great?
    </p>
  </div>
  <form id="register-page-form" autocomplete="off" class="flex w-full flex-col justify-between" @submit.prevent>
    <!-- Start email and username -->
    <div class="flex flex-col sm:flex-row">
      <div class="w-full sm:mr-2">
        <cf-text-input
          v-model="payload.email"
          name="register-email-input"
          label="Email"
          class="text-sm"
          :invalid="validator.email.$invalid"
          :invalid-text="validator.email.$invalid ? validator.email.$errors[0].$message : null"
          @blur="validator.email.$touch"
        ></cf-text-input>
      </div>
      <div class="w-full sm:ml-2">
        <cf-text-input
          v-model="payload.username"
          name="username"
          label="Username"
          class="text-sm"
          :invalid="validator.username.$invalid"
          :invalid-text="validator.username.$invalid ? validator.username.$errors[0].$message : null"
          @blur="validator.username.$touch"
        ></cf-text-input>
      </div>
    </div>
    <!-- End email and username -->
    <!-- Start first name and last name -->
    <div class="flex flex-col sm:flex-row">
      <div class="w-full sm:mr-2">
        <cf-text-input
          v-model="payload.first_name"
          name="first-name"
          label="First name"
          class="text-sm"
          :invalid="validator.first_name.$invalid"
          :invalid-text="validator.first_name.$invalid ? validator.first_name.$errors[0].$message : null"
          @blur="validator.first_name.$touch"
        ></cf-text-input>
      </div>
      <div class="w-full sm:ml-2">
        <cf-text-input
          v-model="payload.last_name"
          name="last-name"
          label="Last name"
          class="text-sm"
          :invalid="validator.last_name.$invalid"
          :invalid-text="validator.last_name.$invalid ? validator.last_name.$errors[0].$message : null"
          @blur="validator.last_name.$touch"
        ></cf-text-input>
      </div>
    </div>
    <!-- End first name and last name -->
    <!-- Start password and confirmation -->
    <div class="flex flex-col sm:flex-row">
      <div class="w-full sm:mr-2">
        <cf-text-input
          v-model="payload.password"
          name="password"
          label="Password"
          type="password"
          class="text-sm"
          :invalid="validator.password.$invalid"
          :invalid-text="validator.password.$invalid ? validator.password.$errors[0].$message : null"
          @blur="validator.password.$touch"
        ></cf-text-input>
      </div>
      <div class="w-full sm:ml-2">
        <cf-text-input
          v-model="payload.password_confirmation"
          name="password-confirmation"
          label="Confirm Password"
          type="password"
          class="text-sm"
          :invalid="validator.password_confirmation.$invalid"
          :invalid-text="
            validator.password_confirmation.$invalid ? validator.password_confirmation.$errors[0].$message : null
          "
          @blur="validator.password_confirmation.$touch"
          @keyup.enter="handleFormSubmission"
        ></cf-text-input>
      </div>
    </div>
    <!-- End password and confirmation-->
    <!-- Start action buttons -->
    <div class="mb-1 mt-4 flex w-full justify-end">
      <cf-button
        id="register-page-button"
        class="w-[35%] bg-theme-primary text-sm text-theme-inverted sm:w-[28%] lg:w-[25%]"
        :is-loading="isLoading"
        @click="handleFormSubmission"
      >
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
import { useAuthStore } from '@/stores/auth'
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers, minLength, maxLength, sameAs } from '@vuelidate/validators'
import { computed, reactive, ref } from 'vue'
import CfAlertPanel from '@/components/campfire/CfAlertPanel.vue'
import { useAlphaDashDotRule, usePasswordRule, useUniqueUserIdentifierRule } from '@/composables/custom-validations'
import { useGetGlobalStringMaxLength } from '@/composables/helpers.js'

const auth = useAuthStore()

const payload = reactive({
  email: '',
  username: '',
  first_name: '',
  last_name: '',
  password: '',
  password_confirmation: '',
})

// Handle validation
const globalStringMaxLengthRule = helpers.withMessage(
  `Must not exceed ${useGetGlobalStringMaxLength()} characters`,
  maxLength(useGetGlobalStringMaxLength())
)
const formRules = {
  $lazy: true,
  email: {
    required: helpers.withMessage('Please enter your email address', required),
    email: helpers.withMessage('Email format is invalid', email),
    unique: helpers.withAsync(helpers.withMessage('This email is already taken', useUniqueUserIdentifierRule('email'))),
  },
  username: {
    required: helpers.withMessage('Please enter your username', required),
    maxLength: helpers.withMessage('Must not be more than 30 characters long', maxLength(30)),
    alphaDashDot: helpers.withMessage(
      'Your username must only contain letters, numbers, dashes, underscores, and dots',
      useAlphaDashDotRule()
    ),
    unique: helpers.withAsync(
      helpers.withMessage('This username already taken', useUniqueUserIdentifierRule('username'))
    ),
  },
  first_name: {
    required: helpers.withMessage('Please enter your first name', required),
    maxLength: globalStringMaxLengthRule,
  },
  last_name: {
    required: helpers.withMessage('Please enter your last name', required),
    maxLength: globalStringMaxLengthRule,
  },
  password: {
    required: helpers.withMessage('Please enter your password', required),
    minLength: helpers.withMessage('Must be at least 8 characters long', minLength(8)),
    maxLength: helpers.withMessage('Must be a maximum of 15 characters', maxLength(15)),
    password: helpers.withMessage(
      'Must include at least one number, and one uppercase and lowercase letter',
      usePasswordRule()
    ),
  },
  password_confirmation: {
    required: helpers.withMessage('Please confirm your password', required),
    sameAsPassword: helpers.withMessage('Must match the password field', sameAs(computed(() => payload.password))),
  },
}

const validator = useVuelidate(formRules, payload)
const showErrorAlert = ref(false)

// handle form submission
const isLoading = ref(false)

const handleFormSubmission = async () => {
  console.log(payload.password)
  console.log(payload.password_confirmation)
  const valid = await validator.value.$validate()
  if (!valid) return

  isLoading.value = true
  await auth.checkAvailability('username', 'jegramos.pa@gmail.com')
  isLoading.value = false
}
</script>
