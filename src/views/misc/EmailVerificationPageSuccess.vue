<template>
  <div class="text-center font-light leading-relaxed">
    <div class="mb-6 flex justify-center">
      <email-success-graphic class="h-40 sm:h-52 lg:h-60" />
    </div>

    <h1 class="text-2xl">Verification successful!</h1>
    <p class="mt-3">
      You will be redirected to the Home page in <span class="font-bold">{{ timer }}</span> seconds
    </p>
    <div class="mt-4 flex flex-col items-center justify-center">
      <cf-button class="mt-3 bg-theme-primary font-normal text-theme-inverted" @click="handleRedirectToHome">
        <template #icon>
          <font-awesome-icon icon="fa-solid fa-house-chimney" class="mr-2" />
        </template>
        Redirect now
      </cf-button>
    </div>
  </div>
</template>

<script setup>
import CfButton from '@/components/campfire/buttons/CfButton.vue'
import EmailSuccessGraphic from '@/views/misc/EmailSuccessGraphic.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'

const router = useRouter()
const timer = ref(5)
let timerId = null

const handleRedirectToHome = async () => {
  await router.replace({ name: 'home' })
}

onMounted(() => {
  timerId = setInterval(async () => {
    timer.value -= 1
    if (timer.value <= 0) {
      clearInterval(timerId)
      await handleRedirectToHome()
    }
  }, 1000)
})

onUnmounted(() => clearInterval(timerId))
</script>
