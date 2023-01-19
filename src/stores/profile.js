import { defineStore, storeToRefs } from 'pinia'
import { useApiCall } from '@/composables/network'
import { useAuthStore } from '@/stores/auth'

export const useProfileStore = defineStore('profile', () => {
  // VueUse's useStorage() loses reactivity after serialization,
  // we make it reactive again by wrapping storeToRefs()
  const auth = storeToRefs(useAuthStore())
  const fetchProfile = async () => {
    const { data } = await useApiCall(auth.authenticationToken.value)('/profile').get()

    const response = JSON.parse(data.value)
    if (response.success) {
      auth.authenticatedUser.value = response.data
    }

    return response
  }

  return { fetchProfile }
})
