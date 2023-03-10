import { defineStore } from 'pinia'
import { useApiCall } from '@/composables/network.js'
import { useAuthStore } from '@/stores/auth.js'
import { StorageSerializers, useStorage } from '@vueuse/core'

export const useSettingsStore = defineStore('settings', () => {
  const auth = useAuthStore()

  const appSettings = useStorage('app-settings', null, localStorage, {
    serializer: StorageSerializers.object,
    deep: true,
    mergeDefaults: true,
  })

  const fetchSettings = async () => {
    const { data } = await useApiCall('/app-settings').get().json()
    const response = data.value

    if (response.success) {
      appSettings.value = response.data
    }

    return response
  }

  const storeSettings = async () => {
    const { data } = await useApiCall('/app-settings', auth.authenticationToken.value).post().json()
    const response = data.value

    if (response.success) {
      appSettings.value = response.data
    }

    return response
  }

  return {
    appSettings,
    fetchSettings,
    storeSettings,
  }
})
