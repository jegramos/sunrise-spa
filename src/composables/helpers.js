import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js'

export const useGetGlobalStringMaxLength = () => import.meta.env.VITE_GLOBAL_STRING_MAX_LENGTH

/** Hard delay for X seconds */
export const useSleep = () => {
  return (seconds) => {
    return new Promise((res) => {
      setTimeout(() => {
        res(true)
      }, seconds * 1000)
    })
  }
}

export const useIsValidMobileNumber = () => (value) => {
  const phone = parsePhoneNumber(value, 'PH')
  if (!phone) return false

  return isValidPhoneNumber(value, 'PH')
}
