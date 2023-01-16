import { defineStore } from 'pinia'
import { useApiCall } from '@/composables/network.js'
import { StorageSerializers, useStorage } from '@vueuse/core'
import { computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // States. We use localStorage to hydrate state when the page reloads
  // @see https://github.com/vueuse/vueuse/pull/614#issuecomment-875450160 on why we need a serializer for `null` defaults
  const authenticationToken = useStorage('auth-token', null, localStorage, { serializer: StorageSerializers.string })
  const authenticatedUser = useStorage('auth-user', null, localStorage, { serializer: StorageSerializers.object })

  // Computed
  const isAuthenticated = computed(() => {
    return !!authenticationToken.value
  })

  // Actions
  const login = async ({ email, password }) => {
    const { data } = await useApiCall()('auth/tokens').post({
      email,
      password,
      with_user: true,
      client_name: `${navigator.platform} - Web`,
    })

    const response = JSON.parse(data.value)
    if (response.success) {
      authenticationToken.value = response.data.token
      authenticatedUser.value = response.data.user
    }

    return response
  }

  const register = async ({ email, username, password, password_confirmation, first_name, last_name }) => {
    const { data } = await useApiCall()('auth/register').post({
      email,
      username,
      password,
      password_confirmation,
      first_name,
      last_name,
      client_name: `${navigator.platform} - Web`,
    })

    const response = JSON.parse(data.value)
    if (response.success) {
      authenticationToken.value = response.data.token
      authenticatedUser.value = response.data.user
    }

    return response
  }

  const checkAvailability = async (key, value) => {
    if (!['username', 'email'].includes(key)) throw new Error('Key can only be "username" or "email"')
    const { data } = await useApiCall()(`/availability/${key}?value=${value}`).get()
    return JSON.parse(data.value)
  }

  return { authenticationToken, authenticatedUser, isAuthenticated, login, register, checkAvailability }
})
