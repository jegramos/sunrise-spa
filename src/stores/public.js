import { defineStore } from 'pinia'
import { useApiCall } from '@/composables/network'

export const usePublicStore = defineStore('public', () => {
  const checkAvailability = async (key, value) => {
    if (!['username', 'email'].includes(key)) throw new Error('Key can only be "username" or "email"')
    const { data } = await useApiCall(`/availability/${key}?value=${value}`).get().json()
    return data.value
  }

  return { checkAvailability }
})
