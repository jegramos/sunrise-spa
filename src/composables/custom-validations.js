import { helpers } from '@vuelidate/validators'
import { usePublicStore } from '@/stores/public'

// must only have letters, numbers, underscores, dashes, and dots
export const useAlphaDashDotRule = () => helpers.regex(/^[0-9A-Za-z_\-.]+$/u)

// must have one lowercase & uppercase letter, one number
export const usePasswordRule = () => helpers.regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)

const publicStore = usePublicStore()
export const useUniqueUserIdentifierRule = (key) => async (value) => {
  if (!['username', 'email'].includes(key)) {
    const errorMessage = 'Key must either be `username`, or `email`'
    console.error(errorMessage)
    throw new Error(errorMessage)
  }

  const res = await publicStore.checkAvailability(key, value)

  console.log('API called')
  console.log('data', res.data)
  console.log('validation_passed', res.data?.is_available)
  return res.data?.is_available
}
