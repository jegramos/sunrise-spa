<template>
  <!-- Start alert -->
  <transition
    enter-active-class="transition duration-200"
    enter-from-class="scale-50 opacity-0"
    leave-to-class="opacity-0"
  >
    <cf-alert-panel v-model="showErrorAlert" dismissible class="z-30 mb-4 w-full" panel-type="error">
      {{ errorMessage }}
      <template #description>
        <div class="flex flex-col">
          <div v-for="error in errorDetails" :key="error" class="mt-0.5">{{ error }}</div>
        </div>
      </template>
    </cf-alert-panel>
  </transition>
  <!-- End alert -->
  <div v-if="!showErrorAlert">
    <p class="font-bold">Welcome to Campfire!</p>
    <p class="mt-1 text-sm text-theme-muted">Please fill-in this short form accurately to create your account</p>
  </div>
  <form id="register-page-form" autocomplete="off" class="flex w-full flex-col justify-between" @submit.prevent>
    <!-- Start Credentials -->
    <cf-horizontal-separator class="mt-5">
      <font-awesome-icon icon="fa-solid fa-key" class="mr-1 text-xs"></font-awesome-icon>
      <span class="font-bold tracking-wide">Credentials</span>
    </cf-horizontal-separator>
    <!-- Start email and mobile number -->
    <div class="flex flex-col sm:flex-row">
      <div class="w-full sm:mr-2">
        <!-- Note: We have @focusin for email and username to prevent too many API calls to check for uniqueness -->
        <cf-text-input
          :id="getId('email-input')"
          v-model="payload.email"
          name="register-email-input"
          label="Email"
          class="text-sm"
          :invalid="validator.email.$invalid"
          :invalid-text="validator.email.$errors[0]?.$message"
          :success="!validator.email.$invalid && validator.email.$dirty && !validator.email.$pending"
          success-text="Email address available"
          @blur="validator.email.$touch"
          @focusin="validator.email.$dirty = false"
        >
        </cf-text-input>
      </div>
      <div class="w-full sm:ml-2">
        <cf-text-input
          :id="getId('mobile-number-input')"
          v-model="payload.mobile_number"
          name="mobile-number"
          label="Mobile Number"
          mask="+63 ### ### ####"
          initial-value="+63"
          :invalid="validator.mobile_number.$invalid"
          :invalid-text="validator.mobile_number.$errors[0]?.$message"
          :success="
            !validator.mobile_number.$invalid && validator.mobile_number.$dirty && !validator.mobile_number.$pending
          "
          success-text="Mobile number available"
          @blur="validator.mobile_number.$touch"
          @focusin="validator.mobile_number.$dirty = false"
        >
        </cf-text-input>
      </div>
    </div>
    <!-- End email and mobile_number -->
    <!-- Start password and confirmation -->
    <div class="flex flex-col sm:flex-row">
      <div class="w-full sm:mr-2">
        <cf-text-input
          :id="getId('password-input')"
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
          :id="getId('password-confirmation-input')"
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
          @keydown.enter.prevent="handleFormSubmission"
        ></cf-text-input>
      </div>
    </div>
    <!-- End password and confirmation-->
    <!-- End credentials -->

    <!-- Start Basic info -->
    <cf-horizontal-separator class="mt-8">
      <font-awesome-icon icon="fa-solid fa-id-badge" class="mr-1 text-xs"></font-awesome-icon>
      <span class="font-bold tracking-wide">Basic Information</span>
    </cf-horizontal-separator>
    <!-- Start first name and last name -->
    <div class="flex flex-col sm:flex-row">
      <div class="w-full sm:mr-2">
        <cf-text-input
          :id="getId('first-name-input')"
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
          :id="getId('last-name-input')"
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
    <!-- Start middle name -->
    <div class="flex">
      <div class="w-full sm:mr-2 sm:w-[48%]">
        <cf-text-input
          :id="getId('middle-name-input')"
          v-model="payload.middle_name"
          name="middle-name"
          label="Middle name"
          class="text-sm"
          :invalid="validator.middle_name.$invalid"
          :invalid-text="validator.middle_name.$invalid ? validator.middle_name.$errors[0].$message : null"
          @blur="validator.middle_name.$touch"
        ></cf-text-input>
      </div>
    </div>
    <!-- End middle name -->
    <!-- Start birthday name and sex -->
    <div class="flex flex-col sm:flex-row">
      <div class="w-full sm:mr-2">
        <cf-text-input
          :id="getId('birthday-input')"
          v-model="payload.birthday"
          name="birthday"
          label="Birthday"
          class="text-sm"
          mask="####-##-##"
          eager-mask
          initial-value="yyyy-mm-dd"
          :invalid="validator.birthday.$invalid"
          :invalid-text="validator.birthday.$invalid ? validator.birthday.$errors[0].$message : null"
          @blur="validator.birthday.$touch"
        ></cf-text-input>
      </div>
      <div class="w-full sm:ml-2">
        <cf-select-box
          :id="getId('sex-input')"
          v-model="payload.sex"
          name="sex"
          class="text-sm"
          label="Sex"
          :options="genderOptions"
          :invalid="validator.sex.$invalid"
          :invalid-text="validator.sex.$invalid ? validator.sex.$errors[0].$message : null"
          @blur="validator.sex.$touch"
        />
      </div>
    </div>
    <!-- End birthday and sex -->
    <!-- End basic info -->
    <!-- Start action buttons -->
    <div class="mb-1 mt-8 flex w-full justify-end lg:mt-8">
      <cf-button
        :id="getId('register-button')"
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
import {
  useDateFormatRule,
  useMobilePhoneRule,
  usePasswordRule,
  useUniqueUserIdentifierRule,
} from '@/composables/custom-validations'
import { useGetGlobalStringMaxLength, usePrependOrAppendOnce } from '@/composables/helpers.js'
import { useParseApiResponseError } from '@/composables/error-handler.js'
import { useRouter } from 'vue-router'
import CfHorizontalSeparator from '@/components/campfire/separators/CfHorizontalSeparator.vue'
import CfSelectBox from '@/components/campfire/inputs/CfSelectBox.vue'

const getId = usePrependOrAppendOnce('components-authentication-page-register-form')
const auth = useAuthStore()
const router = useRouter()

const payload = reactive({
  email: '',
  mobile_number: '',
  first_name: '',
  last_name: '',
  middle_name: '',
  birthday: '',
  sex: '',
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
  mobile_number: {
    required: helpers.withMessage('Please enter your mobile number', required),
    unique: helpers.withAsync(
      helpers.withMessage('This mobile number is already taken', useUniqueUserIdentifierRule('mobile_number'))
    ),
    mobile_number: helpers.withMessage('Must be formatted as +63 ### #### ###', useMobilePhoneRule),
  },
  first_name: {
    required: helpers.withMessage('Please enter your first name', required),
    maxLength: globalStringMaxLengthRule,
  },
  last_name: {
    required: helpers.withMessage('Please enter your last name', required),
    maxLength: globalStringMaxLengthRule,
  },
  middle_name: {
    maxLength: globalStringMaxLengthRule,
  },
  birthday: {
    required: helpers.withMessage('Please enter your birthday', required),
    date_format: helpers.withMessage('Please enter your birthday as yyyy-mm-dd', useDateFormatRule),
  },
  sex: {
    required: helpers.withMessage('Please select an option', required),
  },
  password: {
    required: helpers.withMessage('Please enter your password', required),
    minLength: helpers.withMessage('Must be at least 8 characters long', minLength(8)),
    maxLength: helpers.withMessage('Must be a maximum of 50 characters', maxLength(50)),
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
const errorMessage = ref(null)
const errorDetails = ref(null)

// handle form submission
const isLoading = ref(false)

const handleFormSubmission = async () => {
  const valid = await validator.value.$validate()
  if (!valid) return

  isLoading.value = true
  const response = await auth.register(payload)
  isLoading.value = false

  if (response.success) {
    return await router.replace({ name: 'verify-email-guard' })
  }

  const { message, errors } = useParseApiResponseError(response)
  showErrorAlert.value = true
  errorMessage.value = message
  errorDetails.value = errors
}

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
]
</script>
