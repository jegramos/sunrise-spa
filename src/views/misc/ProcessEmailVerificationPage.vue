<template>
  <div>
    <div v-if="isLoading" class="mt-8 flex flex-col justify-center sm:mt-28">
      <div class="flex justify-center text-theme-primary">
        <font-awesome-icon icon="fa-solid fa-scroll" class="mr-2 h-12 animate-bounce" />
        <font-awesome-icon icon="fa-solid fa-key" class="h-12 animate-bounce" />
      </div>
      <p class="mt-3 text-center">
        <font-awesome-icon icon="fa-solid fa-spinner" class="mr-1 animate-spin" />
        We're verifying your email, please don't close this page...
      </p>
    </div>
    <div v-if="showErrorAlert" class="mt-8 flex flex-col justify-center sm:mt-28">
      <div class="flex justify-center text-theme-primary">
        <font-awesome-icon icon="fa-solid fa-xmark-circle" class="h-12" />
      </div>
      <p class="mt-3 text-center">
        Sorry, the validation link is no longer valid.
        <br />
        Please check the <span class="text-theme-primary underline underline-offset-4">most recent</span>
        verification mail in your inbox.
      </p>
    </div>
    <div v-if="showUnAuthorizedAlert" class="mt-8 flex flex-col justify-center sm:mt-28">
      <div class="flex justify-center text-theme-primary">
        <font-awesome-icon icon="fa-solid fa-fingerprint" class="h-24" />
      </div>
      <!-- When a user tries to verify an account but they're already authenticated as a different user -->
      <div v-if="auth.isAuthenticated">
        <p class="mt-3 text-center">
          Hey, there! It looks like you're logged in as a different user. <br />
          Please logout and login as the user you are currently verifying then try again
        </p>
      </div>
      <!-- End different user authenticated -->
      <div v-else>
        <p class="mt-3 text-center">
          Hey, there! It looks you're trying to verify your email using a <span class="italic">different browser</span>
          or
          <span class="italic">device</span>.
          <br />
          We need you to login using this browser to ensure the best security for your account verification process.
        </p>
        <p class="mt-2 text-center">Click on the button below to login and we'll take it from there</p>
        <div class="flex justify-center">
          <cf-button class="mt-4 bg-theme-primary font-normal text-theme-inverted" @click="handleLoginRedirection">
            <template #icon>
              <font-awesome-icon icon="fa-solid fa-right-to-bracket" class="mr-2" />
            </template>
            Login to your account
          </cf-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useSleep } from '@/composables/helpers'
import { useProfileStore } from '@/stores/profile'
import CfButton from '@/components/campfire/buttons/CfButton.vue'

const route = useRoute()
const router = useRouter()
const profileStore = useProfileStore()
const isLoading = ref(true)
const showErrorAlert = ref(false)
const showUnAuthorizedAlert = ref(false)
const auth = useAuthStore()

// Start verification process
onMounted(async () => {
  isLoading.value = true

  const res = await auth.verifyEmail({
    id: route.params.id,
    hash: route.params.hash,
    signature: route.query.signature,
    expires: route.query.expires,
  })

  const sleep = useSleep()
  await sleep(3)

  isLoading.value = false

  // Handle UnAuthorized requests
  if (!res.success && res.error_code === 'UNAUTHORIZED_ERROR') {
    return (showUnAuthorizedAlert.value = true)
  }

  // Handle General Errors
  if (!res.success) {
    return (showErrorAlert.value = true)
  }

  // Fetch user profile again to refresh local storage and Pinia
  await profileStore.fetchProfile()

  // Finally go to the success page
  await router.replace({ name: 'email-verification-success' })
})

const handleLoginRedirection = async () => {
  await router.push({
    name: 'login',
    query: {
      from_email_verification: 1,
      id: route.params.id,
      hash: route.params.hash,
      signature: route.query.signature,
      expires: route.query.expires,
    },
  })
}
</script>
