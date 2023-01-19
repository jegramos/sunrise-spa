import { defineStore } from 'pinia'
import { useApiCall } from '@/composables/network.js'

export const usePublicStore = defineStore('public', () => {
  const checkAvailability = async (key, value) => {
    if (!['username', 'email'].includes(key)) throw new Error('Key can only be "username" or "email"')
    const { data } = await useApiCall()(`/availability/${key}?value=${value}`).get()
    return JSON.parse(data.value)
  }

  return { checkAvailability }
})
