import { helpers } from '@vuelidate/validators'
import { usePublicStore } from '@/stores/public'
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'

// must only have letters, numbers, underscores, dashes, and dots
export const useAlphaDashDotRule = () => helpers.regex(/^[0-9A-Za-z_\-.]+$/u)

// must have one lowercase & uppercase letter, one number
export const usePasswordRule = () => helpers.regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)

export const useMobilePhoneRule = (value) => {
  const phone = parsePhoneNumber(value, 'PH')
  if (!phone) return false

  return isValidPhoneNumber(value, 'PH')
}

const publicStore = usePublicStore()
export const useUniqueUserIdentifierRule = (key) => async (value) => {
  if (!['username', 'email'].includes(key)) {
    const errorMessage = 'Key must either be `username`, or `email`'
    throw new Error(errorMessage)
  }

  const res = await publicStore.checkAvailability(key, value)
  return res.data?.is_available
}
