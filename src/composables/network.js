import { useFetch } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth.js'

export const useApiCall = (uri, authToken = null) => {
  const baseUrl = import.meta.env.VITE_API_ROOT_URL

  // Remove the first char of the uri if it starts with a '/'
  if (uri.charAt(0) === '/') uri = uri.substring(1)

  return useFetch(`${baseUrl}/${uri}`, {
    async beforeFetch({ options }) {
      if (authToken) {
        options.headers.Authorization = `Bearer ${authToken}`

        return { options }
      }
      return { options }
    },
    // Intercept when the auth token expires
    onFetchError(ctx) {
      console.log('fired', ctx)
      const authToken = useAuthStore().authenticationToken
      if (authToken && ctx?.data?.error_code === 'UNAUTHORIZED_ERROR' && ctx?.response?.status === 401) {
        useAuthStore().authExpired = true
      }
      return ctx
    },
  })
}
