import { helpers } from '@vuelidate/validators'
import { useAuthStore } from '@/stores/auth'

// must only have letters, numbers, underscores, dashes, and dots
export const useAlphaDashDotRule = () => helpers.regex(/^[0-9A-Za-z_\-.]+$/u)

// must have one lowercase & uppercase letter, one number
export const usePasswordRule = () => helpers.regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)

export const useUniqueUserIdentifierRule = (key) => async (value) => {
  if (!['username', 'email'].includes(key)) {
    const errorMessage = 'Key must either be `username`, or `email`'
    console.error(errorMessage)
    throw new Error(errorMessage)
  }

  const res = await useAuthStore().checkAvailability(key, value)
  return res.data.is_available
}
