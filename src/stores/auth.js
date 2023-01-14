import { defineStore } from 'pinia'
import { useApiCall } from '@/composables/network.js'
import { useStorage } from '@vueuse/core'

const authToken = useStorage('auth-token', null)

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: !!authToken.value,
  }),
  actions: {
    login: async ({ email, password }) => {
      const { data } = await useApiCall()('auth/tokens').post({
        email,
        password,
        with_user: true,
        client_name: `${navigator.platform} - Web`,
      })

      const response = JSON.parse(data.value)
      if (response.success) {
        authToken.value = response.data.token
      }

      return response
    },
    checkAvailability: async (key, value) => {
      if (!['username', 'email'].includes(key)) throw new Error('Key can only be "username" or "email"')

      const { data } = await useApiCall()(`/availability/${key}?value=${value}`).get()

      console.log(data)
    },
  },
})
