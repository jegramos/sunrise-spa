import { defineStore } from 'pinia'
import { useApiCall } from '@/composables/network.js'
import { StorageSerializers, useStorage } from '@vueuse/core'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // States. We use localStorage to hydrate state when the page reloads
  // @see https://github.com/vueuse/vueuse/pull/614#issuecomment-875450160 on why we need a serializer for `null` defaults
  const authenticationToken = useStorage('auth-token', null, localStorage, { serializer: StorageSerializers.string })
  const authenticatedUser = useStorage('auth-user', null, localStorage, {
    serializer: StorageSerializers.object,
    deep: true,
    mergeDefaults: true,
  })
  const authExpired = ref(false)

  // Computed
  const isAuthenticated = computed(() => {
    return !!authenticationToken.value
  })

  // Actions
  const login = async (payload) => {
    payload.with_user = true
    payload.client_name = `${navigator.platform} - Web`

    const { data } = await useApiCall('auth/tokens').post(payload).json()

    const response = data.value
    if (response.success) {
      authenticationToken.value = response.data.token
      authenticatedUser.value = response.data.user
    }

    return response
  }

  const register = async (payload) => {
    console.log(payload)
    const { data } = await useApiCall('auth/register')
      .post({ ...payload, client_name: `${navigator.platform} - Web` })
      .json()

    const response = data.value
    if (response.success) {
      authenticationToken.value = response.data.token
      authenticatedUser.value = response.data.user
    }

    return response
  }

  const logout = async () => {
    await useApiCall('auth/tokens', authenticationToken.value).delete()
    authenticationToken.value = null
    authenticatedUser.value = null
  }

  const resendEmailVerification = async () => {
    const { data } = await useApiCall('auth/email/send-verification', authenticationToken.value).get().json()
    const response = data.value
    return response.success
  }

  const verifyEmail = async ({ id, hash, signature, expires }) => {
    const url = `auth/email/verify/${id}/${hash}?expires=${expires}&signature=${signature}`
    const { data } = await useApiCall(url, authenticationToken.value).get().json()
    return data.value
  }

  const requestForgotPassword = async ({ email }) => {
    const { data } = await useApiCall('auth/forgot-password').post({ email }).json()
    return data.value
  }

  const resetPassword = async ({ email, token, password, password_confirmation }) => {
    const { data } = await useApiCall('auth/reset-password')
      .post({
        email,
        token,
        password,
        password_confirmation,
      })
      .json()

    return data.value
  }

  return {
    authenticationToken,
    authenticatedUser,
    authExpired,
    isAuthenticated,
    login,
    logout,
    register,
    resendEmailVerification,
    verifyEmail,
    requestForgotPassword,
    resetPassword,
  }
})
