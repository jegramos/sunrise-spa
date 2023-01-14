import { createFetch } from '@vueuse/core'

export const useApiCall = (authToken = null) => {
  return createFetch({
    baseUrl: import.meta.env.VITE_API_ROOT_URL,
    options: {
      async beforeFetch({ options }) {
        if (authToken) {
          options.headers.Authorization = `Bearer ${authToken}`

          return { options }
        }
        return { options }
      },
    },
  })
}
