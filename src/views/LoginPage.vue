<template>
  <section
    class="w-[75%] mx-auto shadow-sm bg-theme-section py-8 px-4 backdrop-blur-md bg-opacity-75 rounded-lg max-w-screen-lg"
  >
    <!-- Start Login form -->
    <div class="grid grid-cols-3">
      <!-- Start form -->
      <div class="col-span-2 flex flex-col items-start justify-center px-6">
        <app-logo icon-size="5" text-size="2xl"></app-logo>
        <div class="separator-h w-full my-5"></div>
        <p class="font-bold">Welcome back!</p>
        <p class="text-theme-muted text-sm mt-1">Please enter your credentials below to start making cool stuff</p>
        <!-- Start creds login -->
        <div class="rounded-lg mt-4 w-full">
          <form ref="login-form" class="flex justify-between w-[70%]">
            <div class="w-full mr-3">
              <input
                id="login-email-or-username-input"
                type="text"
                placeholder="Email or Username"
                class="h-8 rounded-md w-full border-none text-sm px-3 hover:scale-105 transition-transform duration-200 bg-theme-input text-theme-input focus:ring-theme-primary focus:ring-1"
              />
            </div>
            <div class="flex flex-col w-full">
              <input
                id="login-password-input"
                type="password"
                placeholder="Password"
                class="h-8 rounded-md w-full border-none text-sm px-3 bg-theme-input hover:scale-105 hover:-translate-y-0.5 transition-transform duration-200 text-theme-input focus:ring-theme-primary focus:ring-1"
              />
              <small class="text-xs text-right font-bold text-opacity-90 text-theme-primary mt-1.5 mr-1"
                >Forgot password?</small
              >
            </div>
          </form>
        </div>
        <!-- End creds login -->
        <!-- Start OAuth -->
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

<script>
import AppLogo from '@/components/AppLogo.vue'

export default {
  name: 'LoginView',
  components: { AppLogo },
}
</script>

<style scoped></style>
