import { helpers } from '@vuelidate/validators'
import { usePublicStore } from '@/stores/public'
import { parsePhoneNumber } from 'libphonenumber-js/max'

// must have one lowercase & uppercase letter, one number
export const usePasswordRule = () => helpers.regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)

// validate a certain count of digits
export const useDigitCountRule = (numOfDigits) => (value) => {
  const pattern = '^\\d{' + numOfDigits + '}$'
  const regex = new RegExp(pattern)
  return regex.test(value)
}

export const useMobilePhoneRule = (value, country = 'PH') => {
  let phone

  try {
    phone = parsePhoneNumber(value, country)
  } catch (err) {
    return false
  }

  if (!phone) return false

  return phone.isValid()
}

export const useDateFormatRule = (value) => {
  // Validates yyyy-mm-dd format
  const regEx = /^\d{4}-\d{2}-\d{2}$/
  if (!value.match(regEx)) return false // Invalid format

  const d = new Date(value)
  const dNum = d.getTime()
  if (!dNum && dNum !== 0) return false // NaN value, Invalid date

  return d.toISOString().slice(0, 10) === value
}

const publicStore = usePublicStore()
export const useUniqueUserIdentifierRule = (key) => async (value) => {
  if (!['email', 'mobile_number'].includes(key)) {
    const errorMessage = 'Key must either be `mobile_number`, or `email`'
    throw new Error(errorMessage)
  }

  if (value === null || value === '') return false

  const res = await publicStore.checkAvailability(key, value)
  return res.data?.is_available
}
