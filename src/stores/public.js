import { defineStore } from 'pinia'
import { useApiCall } from '@/composables/network'
import { parseNumber } from 'libphonenumber-js'

export const usePublicStore = defineStore('public', () => {
  const checkAvailability = async (key, value) => {
    if (!['mobile_number', 'email'].includes(key)) throw new Error('Key can only be "email" or "mobile_number"')

    if (key === 'mobile_number') {
      value = encodeURIComponent('+63' + parseNumber(value, 'PH').phone)
    }

    const { data } = await useApiCall(`/availability/${key}?value=${value}`).get().json()
    return data.value
  }

  const fetchCities = async () => {
    const { data } = await useApiCall('/address/cities').get().json()
    return data.value
  }

  const fetchProvinces = async () => {
    const { data } = await useApiCall('/address/provinces').get().json()
    return data.value
  }

  const fetchRegions = async () => {
    const { data } = await useApiCall('/address/regions').get().json()
    return data.value
  }

  return { checkAvailability, fetchCities, fetchProvinces, fetchRegions }
})
